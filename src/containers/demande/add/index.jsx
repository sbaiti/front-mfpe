/* eslint-disable radix */
import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { Grid } from '@material-ui/core'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import generateKey, {
    calcAge,
    formatDate,
    getTranslatedAttribute,
} from '../../../shared/utility'
import ButtonComponent from '../../../components/ui/button'
import addDemandeActions from '../../../redux/demande/addDemande'
import getAllUniteRegionalesActions from '../../../redux/uniteRegionale/getAllUniteRegionales'
import alertActions from '../../../redux/alert'
import setPageTitleActions from '../../../redux/pageTitle'
import getPdfLinkActions from '../../../redux/pdf/getPdfLink'
import renderForm from './renderForm'
import formSummary from './formSummary'

class AddDemande extends React.Component {
    constructor(props) {
        super(props)
        const {
            loggedUser,
            alertShow,
            language,
            getAllUniteRegionales,
            allUniteRegionales,
            setPageTitle,
        } = props
        if (calcAge(loggedUser.dateNaissance) < 20) {
            alertShow(true, {
                onConfirm: false,
                warning: false,
                info: true,
                error: true,
                success: false,
                message:
                    language === 'ar'
                        ? 'لا يمكنك التقديم بطلب, سنك أصغر من 20 سنة'
                        : 'Vous ne pouvez pas ajouter une demande, votre âge est inférieur à 20 ans',
                title: language === 'ar' ? 'إشعار' : 'Information',
            })
            this.notAllowed = true
            return
        }

        this.state = {
            called: false,
            isError: false,
            errorsList: {},
            showPrintButton: false,
            submittedWithoutErrors: false,
            showRedirectToHome: false,
            disable: false,
            payload: {
                date: formatDate(new Date()),
                domaine: '',
                secteur: '',
                specialite_citoyen: '',
                justificatif_experience: '',
                attestation_formation: 0,
                nom_employeur: '',
                adresse_entreprise: '',
                adresse_residence_actuelle: '',
                gouvernorat:
                    loggedUser.gouvernorat[getTranslatedAttribute(language)],
                delegation:
                    loggedUser.delegation[getTranslatedAttribute(language)],
                projet: 0,
                adresse_projet: '',
                gouvernorat_projet: '',
                delegation_projet: '',
                direction_regionale: '',
                preview: 'false',
                current_statut: 'ATTENTE_DR',
            },
        }
        setPageTitle('addDemand')
        if (!allUniteRegionales) getAllUniteRegionales()
    }

    static getDerivedStateFromProps(props, state) {
        const { language, response, error, loading } = props
        const { payload, called } = state
        if (!called) {
            return {}
        }

        if (error) {
            const errorsList = {}
            try {
                Object.keys(response.data.data).forEach(key => {
                    const item = response.data.data[key]
                    const errorText = item[language]
                    errorsList[key] = errorText
                })
            } catch (e) {
                console.error(e)
            }
            return {
                disable: loading === true,
                isError: true,
                errorsList,
            }
        }
        if (response && response.message === 'success') {
            if (response.data.id) {
                return {
                    disable: loading === true,
                    showPrintButton: true,
                    payload: { ...payload, id: response.data.id },
                }
            }
            return {
                disable: loading === true,
                submittedWithoutErrors: payload.domaine && true,
                payload: { ...payload, preview: 'true' },
            }
        }

        return { disable: loading === true }
    }

    fieldChangedHandler = (e, name) => {
        const { allUniteRegionales, loggedUser } = this.props
        const { payload } = this.state
        let newPayload = {}
        const { value } = e.target
        const listDirection = (allUniteRegionales || []).filter(
            u =>
                u.gouvernorat.id === payload.gouvernorat_projet ||
                u.gouvernorat.id === loggedUser.gouvernorat.id
        )
        switch (name) {
            case 'domaine':
                newPayload = { secteur: '' }
                break
            case 'attestation_formation':
                newPayload = { nom_employeur: '', adresse_entreprise: '' }
                break
            case 'gouvernorat_projet':
                if (listDirection.length === 1)
                    newPayload = { direction_regionale: listDirection[0].id }
                break
            case 'projet':
                newPayload = {
                    gouvernorat_projet: '',
                    delegation_projet: '',
                    adresse_projet: '',
                }

                break

            default:
                break
        }
        this.setState(state => ({
            payload: {
                ...state.payload,
                ...newPayload,
                [name]: value,
            },
        }))
    }

    getLoggedUserDR = () => {
        const { allUniteRegionales, loggedUser } = this.props
        return (
            (allUniteRegionales || []).find(
                u => u.gouvernorat.id === loggedUser.gouvernorat.id
            ) || {}
        ).id
    }

    addDemande = () => {
        const { addDemande, loggedUser, intl } = this.props
        const { payload } = this.state

        const newPayload = {
            ...payload,
            projet: parseInt(payload.projet),
            attestation_formation: parseInt(payload.attestation_formation),
            secteur: { id: payload.secteur },
            domaine: { id: payload.domaine },
            gouvernorat: { id: loggedUser.gouvernorat.id },
            delegation: { id: loggedUser.delegation.id },
            gouvernorat_projet: { id: payload.gouvernorat_projet },
            delegation_projet: { id: payload.delegation_projet },
            direction_regionale: {
                id: payload.direction_regionale || this.getLoggedUserDR(),
            },
            justificatif_experience:
                payload.justificatif_experience.length < 2
                    ? payload.justificatif_experience[0] || ''
                    : 'ATTESTATION_TEMOINS',
            intl,
        }
        this.setState({ disable: true, called: true })
        addDemande(newPayload)
    }

    print = () => {
        const { getPdfLink, language } = this.props
        const { payload } = this.state
        getPdfLink({
            url: 'demande/export_pdf',
            payload: { id: payload.id, lang: language },
        })
        this.setState({ showRedirectToHome: true })
    }

    renderButtons = () => {
        const { history } = this.props
        const {
            showPrintButton,
            submittedWithoutErrors,
            showRedirectToHome,
            disable,
            payload,
        } = this.state

        return (
            <div className="p-4 text-center">
                {showPrintButton ? (
                    <ButtonComponent
                        disabled={disable}
                        color="secondary"
                        type="contained"
                        size="large"
                        label={<FormattedMessage id="print" />}
                        clicked={this.print}
                    />
                ) : (
                    [
                        <ButtonComponent
                            key={generateKey()}
                            disabled={disable}
                            color="secondary"
                            type="contained"
                            label={
                                <FormattedMessage
                                    id={
                                        submittedWithoutErrors
                                            ? 'back'
                                            : 'cancel'
                                    }
                                />
                            }
                            size="large"
                            clicked={() => {
                                if (submittedWithoutErrors) {
                                    this.setState({
                                        called: false,
                                        submittedWithoutErrors: false,
                                        showPrintButton: false,
                                        payload: {
                                            ...payload,
                                            preview: 'false',
                                        },
                                    })
                                } else history.goBack()
                            }}
                        />,
                        <ButtonComponent
                            key={generateKey()}
                            disabled={disable}
                            color="secondary"
                            type="contained"
                            size="large"
                            label={
                                <FormattedMessage
                                    id={
                                        submittedWithoutErrors
                                            ? 'save'
                                            : 'validate'
                                    }
                                />
                            }
                            clicked={this.addDemande}
                        />,
                    ]
                )}

                {showRedirectToHome && (
                    <ButtonComponent
                        disabled={disable}
                        color="secondary"
                        type="contained"
                        size="large"
                        label={<FormattedMessage id="goHomePage" />}
                        clicked={() => {
                            history.push('/demande/liste/en-cours')
                        }}
                    />
                )}
            </div>
        )
    }

    render() {
        if (this.notAllowed) return null
        const {
            allReferenciels,
            allUniteRegionales,
            intl,
            language,
            loggedUser,
        } = this.props
        const {
            submittedWithoutErrors,
            payload,
            isError,
            errorsList,
        } = this.state
        return (
            <FormGroup style={{ background: '#e6e6e670' }}>
                <div className="centerDiv">
                    <Grid container>
                        {submittedWithoutErrors
                            ? formSummary({
                                  language,
                                  allReferenciels,
                                  allUniteRegionales,
                                  intl,
                                  loggedUser,
                                  payload,
                              })
                            : renderForm({
                                  allReferenciels,
                                  allUniteRegionales,
                                  intl,
                                  language,
                                  loggedUser,
                                  payload,
                                  isError,
                                  errorsList,
                                  fieldChangedHandler: this.fieldChangedHandler,
                                  getLoggedUserDR: this.getLoggedUserDR,
                              })}
                    </Grid>
                    <div className="p-4 text-center">
                        {this.renderButtons()}
                    </div>
                </div>
            </FormGroup>
        )
    }
}

const mapStateToProps = ({
    info,
    login,
    demande,
    referencial,
    pdf,
    uniteRegionale,
}) => {
    return {
        language: info.language,
        loggedUser: login.response.User.details,
        response: demande.addDemande.response,
        loading: demande.addDemande.loading || pdf.pdfLink.loading,
        error: demande.addDemande.error,
        allReferenciels: referencial.allReferencials.response,
        pdfData: pdf.pdfLink.response,
        allUniteRegionales: uniteRegionale.allUniteRegionales.response,
    }
}
const mapDispatchToProps = dispatch => ({
    addDemande: payload =>
        dispatch(addDemandeActions.addDemandeRequest(payload)),
    getAllUniteRegionales: () =>
        dispatch(getAllUniteRegionalesActions.getAllUniteRegionalesRequest()),
    getPdfLink: payload =>
        dispatch(getPdfLinkActions.getPdfLinkRequest(payload)),
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
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})
AddDemande.propTypes = {
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    addDemande: PropTypes.func.isRequired,
    allReferenciels: PropTypes.object,
    allUniteRegionales: PropTypes.array,
    alertShow: PropTypes.func.isRequired,
    getPdfLink: PropTypes.func.isRequired,
    loggedUser: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    getAllUniteRegionales: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
}

AddDemande.defaultProps = {
    allReferenciels: {},
    allUniteRegionales: null,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(AddDemande))
