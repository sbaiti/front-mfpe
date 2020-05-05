import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup'
import ButtonComponent from '../../components/ui/button'
import editCenterActions from '../../redux/centreFormation/editCenter'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import setPageTitleActions from '../../redux/pageTitle'
import RenderForm from './renderForm'

/**
 * Edit Component
 *
 * @class Edit
 * @extends {React.Component}
 */
class Edit extends React.Component {
    /**
     * Creates an instance of Edit
     * @param {*} props
     * @memberof Edit
     */
    constructor(props) {
        super(props)
        const { center } = props.history.location.state
        this.center = {}
        if (center) {
            this.changedFields = { id: center.id }
            this.state = {
                isError: false,
                errorsList: {},
                data: {
                    id: center.id,
                    intitule_ar: center.intituleAr,
                    intitule_fr: center.intituleFr,
                    nom: center.intituleFr,
                    adresse: center.adresse,
                    tel: center.tel
                        ? {
                              dialCode: center.tel.split(' ')[0],
                              number: center.tel.split(' ')[1],
                          }
                        : { dialCode: '', number: '' },
                    fax: center.fax
                        ? {
                              dialCode: center.tel.split(' ')[0],
                              number: center.tel.split(' ')[1],
                          }
                        : { dialCode: '', number: '' },
                    email: center.email,
                    nom_directeur_ar: center.nomDirecteurAr,
                    nom_directeur_fr: center.nomDirecteurFr,
                    nom_directeur: center.nomDirecteurFr,
                    annee_creation: center.anneeCreation,
                    capacite_acceuil: center.capaciteAccueil,
                    secteur_activite: center.secteur ? center.secteur.id : null,
                    organisme: center.organisme ? center.organisme : null,
                    gouvernorat: center.gouvernorat
                        ? center.gouvernorat.id
                        : null,
                    delegation: center.delegation ? center.delegation.id : null,
                    numero_enregistrement: center.numeroEnregistrement
                        ? center.numeroEnregistrement
                        : null,
                    specialites: center.specialiteCenters.map(e => e.id),
                    nombre_formateur: center.nombreFormateur,
                    nbre_cadre_administratif: center.nombreCadreAdministratif,
                    capacite_hybergement: center.capaciteHebergement,
                    capacite_resto: center.capaciteRestaurant,
                },
            }
            props.setPageTitle('centerCard')
        }
    }

    componentWillReceiveProps(nextProps) {
        const { language } = this.props

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
        }
    }

    /**
     *
     * @memberof Edit
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
        if (['gouvernorat', 'secteur_activite'].indexOf(key) > -1)
            this.forceUpdate()
        if (key === 'gouvernorat') data.delegation = ''
        if (key === 'secteur_activite') {
            data.organisme = ''
            data.gouvernorat = ''
            data.delegation = ''
            data.numero_enregistrement = ''
        }
    }

    /**
     
     *
     * @memberof Edit
     */
    editCenter = () => {
        const { editCenter, intl } = this.props
        const { data } = this.state
        const newPayload = {
            ...data,
            gouvernorat: { id: data.gouvernorat },
            delegation: { id: data.delegation },
            secteur_activite: { id: data.secteur_activite },
            tel: data.tel,
            fax: data.fax,
            specialites: data.specialites.map(e => ({ id: e })),
            intl,
        }
        editCenter(newPayload)
    }

    render() {
        const {
            history,
            allReferenciels,
            language,
            allSpecialities,
        } = this.props

        const { isError, errorsList, data } = this.state
        return (
            <FormGroup>
                <div className="centerDiv">
                    <div className="d-block d-lg-flex flex-wrap">
                        <RenderForm
                            handleChange={this.fieldChangedHandler}
                            update={this.update}
                            isError={isError}
                            errorsList={errorsList}
                            data={data}
                            allReferenciels={allReferenciels}
                            allSpecialities={allSpecialities}
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
                            clicked={this.editCenter}
                        />
                    </div>
                </div>
            </FormGroup>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.info.language,
        response: state.centreFormation.editCenter.response,
        error: state.centreFormation.editCenter.error,
        success: state.centreFormation.editCenter.success,
        allSpecialities: state.specialite.allSpecialites.response,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    editCenter: payload =>
        dispatch(editCenterActions.editCenterRequest(payload)),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})

Edit.propTypes = {
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    editCenter: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    allReferenciels: PropTypes.object,
    allSpecialities: PropTypes.array,
    response: PropTypes.object,
    error: PropTypes.bool,
    history: PropTypes.object.isRequired,
}

Edit.defaultProps = {
    allReferenciels: {},
    allSpecialities: [],
    response: null,
    error: false,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Edit))
