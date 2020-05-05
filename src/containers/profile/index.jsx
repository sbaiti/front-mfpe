/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'date-fns'
import { includes, isNil } from 'lodash'
import editUserActions from '../../redux/user/editUser'
import ContactInfo from './contactInfo'
import CitizenshipInfo from './citizenshipInfo'
import CardInfo from './cardInfo'
import SpecialNeedsInfo from './speciallNeedsInfo'
import RoleInfo from './roleInfo'
import { displayDate, getTranslatedAttribute } from '../../shared/utility'
import setPageTitleActions from '../../redux/pageTitle'

/**
 *
 * @class Index
 * @extends {React.Component}
 *
 */

class Index extends React.Component {
    /**
     * Creates an instance of Index.
     * @param {*} props
     * @memberof Index
     */
    constructor(props) {
        super(props)
        if (!props.user) props.setPageTitle('informations')
        else props.setPageTitle('agentDetails')
    }

    /**
     * Get translated name
     *
     * @param{object} name
     * @memberof Index
     *
     *  @return {string}
     */
    getTranslatedName = name => {
        const { language } = this.props
        if (name === undefined || name === null) {
            return ''
        }
        return language === 'fr' ? name.intituleFr : name.intituleAr
    }

    /**
     * Edit User
     *
     * @param{object} newData
     * @memberof Index
     */
    editUser = newData => {
        const { edit } = this.props
        if (newData.name !== 'tel' && newData.value.length === 0) return
        const fields = [
            'email',
            'dateNaissance',
            'dateDelivranceCin',
            'dateDelivrancePassport',
            'tel',
        ]
        if (includes(fields, newData.name)) {
            switch (newData.name) {
                case 'email':
                    edit({ email: newData.value })
                    break
                case 'dateNaissance':
                    edit({ date_naissance: newData.value })
                    break
                case 'dateDelivranceCin':
                    edit({ date_delivrance_cin: newData.value })
                    break
                case 'dateDelivrancePassport':
                    edit({ date_delivrance_passport: newData.value })
                    break
                case 'tel':
                    if (!isNil(newData.value)) {
                        edit({ tel: newData.value })
                    }
                    break
                default:
                    console.error('something went wrong')
                    this.showAlert('editFailed', true)
            }
        }
    }

    /**
     * Get Msg response
     *
     * @param {string} language
     * @param {object} response
     * @memberof Index
     */
    getMsgResponse = (language, response) => {
        let result = ''
        if (!response.data.data) {
            return
        }
        const selectedField = response.data.data.date_naissance
            ? 'date_naissance'
            : 'email'
        if (selectedField === 'email') {
            result =
                language === 'fr'
                    ? response.data.data.email.fr
                    : response.data.data.email.ar
        } else {
            result =
                language === 'fr'
                    ? response.data.data.date_naissance.fr
                    : response.data.data.date_naissance.ar
        }
        // eslint-disable-next-line consistent-return
        return result
    }

    isCitizen = userRoles => {
        let result = false
        // eslint-disable-next-line array-callback-return
        userRoles.find(f => {
            if (f.role === 'ROLE_CITOYEN') {
                result = true
            }
        })
        return result
    }

    render() {
        // const { showAlert, err, msgErr } = this.state
        const {
            userDetails,
            editLoading,
            userLoding,
            user,
            language,
        } = this.props
        const userToShow = user || userDetails
        const nationalite = this.getTranslatedName(userToShow.nationalite)
        const dateNaissance = displayDate(userToShow.dateNaissance, language)
        const niveauEtude = this.getTranslatedName(userToShow.niveauEtude)
        const gouvernorat = this.getTranslatedName(userToShow.gouvernorat)
        const delegation = this.getTranslatedName(userToShow.delegation)
        const dateDelivranceCin = userToShow.dateDelivranceCin
            ? displayDate(userToShow.dateDelivranceCin, language)
            : null
        const dateDelivrancePassport = userToShow.dateDelivrancePassport
            ? displayDate(userToShow.dateDelivrancePassport, language)
            : null
        const dateValiditeSejour = userToShow.dateValiditeSejour
            ? displayDate(userToShow.dateValiditeSejour, language)
            : null
        const fonction = this.getTranslatedName(userToShow.fonction)

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="my-3">
                            <CardInfo
                                nom={userToShow.nomFr}
                                prenom={userToShow.prenomFr}
                                sexe={userToShow.sexe}
                                dateNaissance={dateNaissance}
                                niveauEtude={niveauEtude}
                                loading={editLoading || userLoding}
                                gouvernorat={gouvernorat}
                                delegation={delegation}
                                isCitizen={this.isCitizen(userToShow.userRoles)}
                            />
                        </div>
                        {!this.isCitizen(userToShow.userRoles) && (
                            <div className="my-3">
                                <RoleInfo
                                    roleTitle={userToShow.userRoles[0].role}
                                    identifiant={userToShow.identifiant}
                                    grade={userToShow.grade}
                                    fonction={fonction}
                                    loading={userLoding}
                                />
                            </div>
                        )}
                        {userToShow.natureBesoinSpecifique && (
                            <div className="my-3">
                                <SpecialNeedsInfo
                                    natureBesoinSpecifique={
                                        userToShow.natureBesoinSpecifique[
                                            getTranslatedAttribute(language)
                                        ]
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-md-8 col-sm-12">
                        <div className="my-3">
                            <ContactInfo
                                identifiant={userToShow.identifiant}
                                email={userToShow.email}
                                tel={userToShow.tel}
                                role={userToShow.userRoles[0].role}
                                loading={editLoading || userLoding}
                                editInfo={user ? false : this.editUser}
                            />
                        </div>
                        <div className="my-3">
                            <CitizenshipInfo
                                nationalite={nationalite}
                                numCin={userToShow.numCin}
                                dateDelivranceCin={dateDelivranceCin}
                                numPassport={userToShow.numPassport}
                                dateDelivrancePassport={dateDelivrancePassport}
                                numCarteSejour={userToShow.numCarteSejour}
                                dateValiditeSejour={dateValiditeSejour}
                                role={userToShow.userRoles[0].role}
                                loading={editLoading || userLoding}
                                editInfo={user ? false : this.editUser}
                                isCitizen={this.isCitizen(userToShow.userRoles)}
                            />
                        </div>
                    </div>

                    {/* TODO: add alert */}
                    {/* {showAlert && err && (
                        <div className="alert alert-danger" role="alert">
                            {msgErr}
                        </div>
                    )}
                    {showAlert && !err && (
                        <div className="alert alert-success" role="alert">
                            {msgErr}
                        </div>
                    )} */}
                </div>
            </div>
        )
    }
}
Index.defaultProps = {
    language: '',
    userDetails: {},
    editLoading: false,
    userLoding: false,
    user: null,
}
Index.propTypes = {
    language: PropTypes.string,
    edit: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    userDetails: PropTypes.object,
    user: PropTypes.object,
    editLoading: PropTypes.bool,
    userLoding: PropTypes.bool,
}

const mapStateToProps = ({ info, user, login }) => ({
    language: info.language,
    response: user.editUser.response,
    error: user.editUser.error,
    success: user.editUser.success,
    editLoading: user.editUser.loading,
    userDetails: login.response.User.details,
    userLoding: login.response.User.loading,
})

const mapDispatchToProps = dispatch => ({
    edit: payload => dispatch(editUserActions.editUserRequest(payload)),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
