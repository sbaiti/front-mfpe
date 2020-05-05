import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup'
import ButtonComponent from '../../components/ui/button'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import setPageTitleActions from '../../redux/pageTitle'
import RenderForm from './renderForm'
import editSpecialiteActions from '../../redux/specialite/editSpecialite'
import alertActions from '../../redux/alert'

/**
 * Edit Specialite
 *
 * @class EditSpecialite
 * @extends {React.Component}
 */
class EditSpecialite extends React.Component {
    static propTypes = {
        language: PropTypes.string.isRequired,
        editSpecialite: PropTypes.func.isRequired,
        allSpecialities: PropTypes.object,
        setPageTitle: PropTypes.func.isRequired,
        allReferenciels: PropTypes.object,
        response: PropTypes.object,
        error: PropTypes.bool,
        success: PropTypes.bool,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        intl: PropTypes.object.isRequired,
    }

    static defaultProps = {
        allSpecialities: {},
        allReferenciels: {},
        response: null,
        error: false,
        success: false,
    }

    /**
     * Creates an instance of EditSpecialite.
     * @param {*} props
     * @memberof EditSpecialite
     */

    constructor(props) {
        super(props)
        const { specialite } = props.history.location.state
        this.state = {
            isError: false,
            errorsList: {},
            data: {
                id: specialite.id,
                intitule_ar: specialite.intituleAr,
                intitule_fr: specialite.intituleFr,
                code_specialite: specialite.codeSpecialite,
                frais_specialite_exam: specialite.fraisSpecialiteExam,
                niveau_etude: specialite.natureFormation.id,
                niveau_diplome: specialite.niveauDiplome.id,
                secteur_activite: specialite.secteur.id,
                sous_secteur_activite: specialite.sousSecteur.id,
            },
        }
        props.setPageTitle('editspeciality')
    }

    componentWillReceiveProps(nextProps) {
        const { language, history } = this.props
        if (nextProps.error && nextProps.response) {
            const errorsList = {}
            try {
                Object.keys(nextProps.response.data.data).forEach(key => {
                    const item = nextProps.response.data.data[key]
                    const errorText = item[language]
                    errorsList[key] = errorText
                })
            } catch (e) {
                console.error(e)
            }
            this.setState({
                isError: true,
                errorsList,
            })
        } else if (nextProps.success) {
            history.push('/specialites/liste')
        }
    }

    /**
     * handle form element changes
     *
     * @memberof EditSpecialite
     * @param{object} e: event
     * @param{string} name: field name
     */

    fieldChangedHandler = (e, name) => {
        const { data } = this.state
        const { value } = e.target
        this.setState({ data: { ...data, [name]: value } })
    }

    update = key => {
        const { data } = this.state
        if (['secteur_activite'].indexOf(key) > -1) this.forceUpdate()
        if (key === 'secteur_activite') data.sous_secteur_activite = ''
    }

    /**
     * subbmits the form
     *
     * @memberof EditSpecialite
     */
    editSpecialite = () => {
        const { editSpecialite, intl } = this.props
        const { data } = this.state

        const newPayload = {
            ...data,
            niveau_etude: { id: data.niveau_etude },
            niveau_diplome: { id: data.niveau_diplome },
            secteur_activite: { id: data.secteur_activite },
            sous_secteur_activite: {
                id: data.sous_secteur_activite,
            },
            intl,
        }
        editSpecialite(newPayload)
    }

    render() {
        const {
            history,
            language,
            allSpecialities,
            allReferenciels,
        } = this.props

        const { isError, errorsList, data } = this.state
        return (
            allSpecialities && (
                <FormGroup>
                    <div className="centerDiv">
                        <div className="d-block d-lg-flex flex-wrap">
                            <RenderForm
                                handleChange={this.fieldChangedHandler}
                                update={this.update}
                                isError={isError}
                                errorsList={errorsList}
                                data={data}
                                allSpecialities={allSpecialities}
                                allReferenciels={allReferenciels}
                                language={language}
                            />
                        </div>

                        <div style={{ textAlign: 'center', pediting: 20 }}>
                            <ButtonComponent
                                color="secondary"
                                type="contained"
                                label={<FormattedMessage id="cancel" />}
                                size="large"
                                clicked={() => history.goBack()}
                            />
                            <ButtonComponent
                                color="secondary"
                                type="contained"
                                size="large"
                                label={<FormattedMessage id="save" />}
                                clicked={this.editSpecialite}
                            />
                        </div>
                    </div>
                </FormGroup>
            )
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.info.language,
        allUsers: state.user.allUsers.response,
        loggedUser: state.login.response.User.details,
        response: state.specialite.editSpecialite.response,
        error: state.specialite.editSpecialite.error,
        success: state.specialite.editSpecialite.success,
        allSpecialities: state.specialite.allSpecialites.response,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    editSpecialite: payload =>
        dispatch(editSpecialiteActions.editSpecialiteRequest(payload)),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
    alertShow: (show, info) =>
        dispatch(
            alertActions.alertShow(show, {
                onConfirm: info.onConfirm,
                warning: info.warning,
                info: info.info,
                error: info.error,
                success: info.success,
                message: info.message,
                title: info.title,
            })
        ),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(EditSpecialite))
