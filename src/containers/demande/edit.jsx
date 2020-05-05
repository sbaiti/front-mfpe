/* eslint-disable react/forbid-prop-types */

import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { Grid, Paper, Typography, Divider } from '@material-ui/core'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import addDays from 'date-fns/addDays'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import SaveIcon from '@material-ui/icons/Save'
import { isEmpty } from 'lodash'
import LinearProgress from '@material-ui/core/LinearProgress'
import { formatDate } from '../../shared/utility'
import Details from '../../components/demande/details'
import editDemandeActions from '../../redux/demande/editDemande'
import getAllCentersActions from '../../redux/centreFormation/getAllCenters'
import EditDemandFactory from '../../components/demande/EditDemandFactory'
import getAllSpecialitesActions from '../../redux/specialite/getAllSpecialites'
import setPageTitleActions from '../../redux/pageTitle'
import getDemandeActions from '../../redux/demande/getDemande'
import AlertSnackbar from '../../components/alertSnackbar'
import { getPayload } from './editDemande/payload'

/**
 * traiter la demande du citoyen selon le statut
 *
 * @class EditDemande
 * @extends {React.Component}
 */
class EditDemande extends React.Component {
    /**
     *Creates an instance of EditDemande.
     * @param {*} props
     * @memberof EditDemande
     */
    constructor(props) {
        super(props)
        this.status = '1'
        this.motif = ''
        this.observation = ''
        this.demande = {}
        const url = window.location.href
        const id = url.substring(url.lastIndexOf('/') + 1)

        this.demandeId =
            (((props.history || {}).location || {}).state || {}).demandeId || id
        this.state = {
            isError: false,
            errorsList: {},
            show: false,
        }
        props.getDemande(this.demandeId)
        props.getAllCenters()
        props.getAllSpecialites()
        props.setPageTitle('editApplication')
    }

    /**
     * componentWillReceiveProps
     *
     * @param {*} nextProps
     * @memberof EditDemande
     */
    componentWillReceiveProps(nextProps) {
        const { language, history, response, demande } = this.props
        if (nextProps.demande && demande !== nextProps.demande) {
            this.setDemande(nextProps.demande)
            this.init()
            if (
                ((nextProps.demande || {}).currentStatut || {}).code !==
                    'DATE_EXAM_OK' &&
                ((nextProps.demande || {}).currentStatut || {}).code !==
                    'RE_DATE_EXAM_OK' &&
                ((nextProps.demande || {}).currentStatut || {}).code !==
                    'ATTESTATION_KO'
            ) {
                this.setState({ show: true })
            }
        }
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
        if (nextProps.error === false && nextProps.response !== response) {
            history.goBack(true)
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.demande !== this.demande
    }

    init = () => {
        this.motif = this.demande.motif || ''
        this.setState({
            isError: false,
            errorsList: {},
            show: ![
                'DATE_EXAM_OK',
                'RE_DATE_EXAM_OK',
                'ATTESTATION_KO',
            ].includes(((this.demande || {}).currentStatut || {}).code),
        })
    }

    setDemande = demande => {
        this.demande = {
            ...demande,
            specialite: demande.specialite || {
                id: '',
            },
            centre_formation: demande.centreFormation || { id: '' },
            date_exam: ([...demande.dateExams].pop() || {}).dateExam || '',
            material: ([...demande.dateExams].pop() || {}).material || '',
        }
    }

    /**
     * fieldChangedHandler
     *
     * @param{*} e - event
     * @param{string} name
     * @memberof EditDemande
     */
    fieldChangedHandler = (e, name) => {
        this.demande[name] = e.target.value
    }

    /**
     * Update
     * @param{string} key
     * @memberof EditDemande
     */
    update = key => {
        if (
            [
                'domaine',
                'secteur',
                'centre_formation',
                'specialite',
                'motif',
            ].indexOf(key) > -1
        )
            this.forceUpdate()
        switch (key) {
            case 'domaine':
                this.demande.secteur = ''
                this.demande.specialite = ''
                break
            case 'secteur':
                this.demande.specialite = ''
                break
            default:
                break
        }
    }

    /**
     * Edit Demande - payload update
     *
     * @memberof EditDemande
     */
    editDemande = () => {
        const { intl, editDemande } = this.props

        const currentStatut = ((this.demande || {}).currentStatut || {}).code
        const options = {
            demande: this.demande,
            status: this.status,
            motif: this.motif,
            observation: this.observation,
        }
        const payload = getPayload(currentStatut, options) || {}

        editDemande({ ...payload, intl })
    }

    /**
     * Go Back
     *
     * @memberof EditDemande
     */
    goBack = (success = false) => {
        if (success) {
            const { resetProps } = this.props
            resetProps()
        } else {
            const { history } = this.props
            history.push({
                pathname: `/demande/liste`,
            })
        }
    }

    /**
     * Render Details
     *
     * @memberof EditDemande
     */
    renderDetails = () => {
        const { language, demande, intl } = this.props
        const lang = language === 'ar' ? 'intituleAr' : 'intituleFr'
        if (demande || !isEmpty(this.demande)) {
            return (
                <Details
                    intl={intl}
                    demande={demande || this.demande}
                    lang={lang}
                    language={language}
                />
            )
        }
        return null
    }

    renderEditDemandFactory = (
        currentStatutCode,
        props,
        update = () => {},
        showButtons = () => {}
    ) => {
        const action =
            currentStatutCode !== 'REFUS_CENTRE'
                ? currentStatutCode
                : 'SPECIALITE_CHOISIE'
        return (
            <EditDemandFactory
                data={{
                    action,
                    props,
                }}
                update={update}
                showButtons={showButtons}
            />
        )
    }

    /**
     * Display Action
     *
     * @memberof EditDemande
     */
    displayAction = () => {
        const { errorsList, show, isError } = this.state
        const {
            language,
            intl,
            loggedUser,
            allReferentiels,
            allSpecialites,
            allCenters,
        } = this.props
        const factoryProps = {
            demande: this.demande,
            language,
            fieldChangedHandler: this.fieldChangedHandler,
            errorsList,
            isError,
            intl,
            loggedUser,
            allReferentiels,
            status: this.status,
            motif: this.motif,
            update: this.update,
            allSpecialites: this.allSpecialites,
            forceUpdate: () => this.forceUpdate(),
            show,
        }

        const currentStatutCode = ((this.demande || {}).currentStatut || {})
            .code
        if (currentStatutCode) {
            switch (currentStatutCode) {
                case 'ATTENTE_DR':
                    return this.renderEditDemandFactory(
                        currentStatutCode,
                        {
                            ...factoryProps,
                            allSpecialites,
                            fieldChangedHandler: (e, name) => {
                                if (name === 'status' || name === 'motif') {
                                    this[name] = e.target.value
                                    if (name === 'motif') this.update('motif')
                                } else this.fieldChangedHandler(e, name)
                            },
                        },
                        this.handleUpdate
                    )
                case 'REFUS_CENTRE':
                case 'SPECIALITE_CHOISIE':
                    return this.renderEditDemandFactory(
                        currentStatutCode,
                        { ...factoryProps, allCenters },
                        this.handleUpdate
                    )
                case 'CENTRE_OK':
                    return this.renderEditDemandFactory(
                        currentStatutCode,
                        { ...factoryProps, allCenters },
                        this.handleUpdate
                    )
                case 'SCAN_OK':
                    return this.renderEditDemandFactory(currentStatutCode, {
                        ...factoryProps,
                        fieldChangedHandler: (e, name) => {
                            this[name] = e.target.value
                        },
                    })
                case 'ATTENTE_PAIEMENT':
                    return this.renderEditDemandFactory(currentStatutCode, {
                        ...factoryProps,
                        fieldChangedHandler: (e, name) => {
                            this[name] = e.target.value
                        },
                    })
                case 'PAIEMENT_OK':
                    this.demande.date_exam = formatDate(
                        Date(this.demande.date_exam) >= addDays(new Date(), 10)
                            ? Date(this.demande.date_exam)
                            : addDays(new Date(), 10)
                    )
                    return this.renderEditDemandFactory(
                        currentStatutCode,
                        factoryProps
                    )
                case 'DATE_EXAM_OK':
                    return this.renderEditDemandFactory(
                        currentStatutCode,
                        {
                            isError,
                            errorsList,
                            factoryProps,
                        },
                        this.handleUpdate,
                        e => {
                            this.setState({ show: e !== '' })
                        }
                    )
                case 'PV_REFUSE':
                case 'RE_DATE_EXAM_OK':
                    return this.renderEditDemandFactory(
                        currentStatutCode,
                        {
                            isError,
                            errorsList,
                            factoryProps,
                        },
                        this.handleUpdate,
                        e => {
                            this.setState({ show: e !== '' })
                        }
                    )
                case 'PV_UPLOAD':
                    return this.renderEditDemandFactory(currentStatutCode, {
                        ...factoryProps,
                        fieldChangedHandler: (e, name) => {
                            this[name] = e.target.value
                        },
                        files: this.demande.documents || [],
                        resultat: this.resultat,
                    })
                case 'PV_ACCEPTE':
                    return this.renderEditDemandFactory(currentStatutCode, {
                        ...factoryProps,
                        observation: this.observation,
                        fieldChangedHandler: (e, name) => {
                            this[name] = e.target.value
                        },
                    })
                case 'ATTESTATION_KO':
                    return this.renderEditDemandFactory(currentStatutCode, {
                        ...factoryProps,
                    })
                default:
                    return (
                        <AlertSnackbar
                            body={intl.formatMessage({
                                id: 'demandIntrouvable',
                            })}
                            autoBack
                        />
                    )
            }
        }
        return false
    }

    /**
     * Handle Update State
     *
     * @param {string} action - Action Name
     * @param {object} data - data to be update in the state
     * @memberof EditDemande
     */
    handleUpdate = (action, data, file) => {
        switch (action) {
            case 'DATE_EXAM_OK':
                this.demande.status = 'DATE_EXAM_OK'
                this.demande.file = file
                break
            case 'PV_REFUSE':
            case 'RE_DATE_EXAM_OK':
                this.demande.status = 'RE_DATE_EXAM_OK'
                this.demande.file = file
                break
            case 'REFUS_CENTRE':
            case 'SPECIALITE_CHOISIE':
                this.demande.status = 'SPECIALITE_CHOISIE'
                this.demande['file[]'] = data
                this.demande.file = file
                break
            case 'CENTRE_OK':
                this.demande.status = 'CENTRE_OK'
                this.demande['file[]'] = data
                this.demande.file = file
                break
            default:
                break
        }
    }

    render() {
        const { show } = this.state
        const { isLoading } = this.props
        if (!this.demande) {
            this.goBack()
        }
        let divider
        if (isLoading) {
            divider = <LinearProgress />
        } else {
            divider = <Divider />
        }

        return (
            <FormGroup style={{ width: '100%' }}>
                <div className="centerDiv" style={{ width: '90%' }}>
                    <Grid container>
                        <Grid item xs={12} sm={8} style={{ padding: 20 }}>
                            <Paper className="p-4">
                                {((this.demande || {}).currentStatut || {})
                                    .code === 'ATTESTATION_KO' && (
                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        className="pb-3"
                                    >
                                        <FormattedMessage id="ATTESTATION_KO" />
                                    </Typography>
                                )}
                                {divider}
                                {this.displayAction()}
                                {show && (
                                    <div className="d-flex justify-content-around my-5">
                                        <Button
                                            variant="outlined"
                                            size="medium"
                                            color="secondary"
                                            onClick={() => {
                                                if (
                                                    this.demande.currentStatut
                                                        .code ===
                                                        'DATE_EXAM_OK' ||
                                                    this.demande.currentStatut
                                                        .code ===
                                                        'RE_DATE_EXAM_OK'
                                                )
                                                    this.setState({
                                                        show: false,
                                                    })
                                                else this.goBack(true)
                                            }}
                                            style={{ direction: 'ltr' }}
                                        >
                                            <ArrowBackIosIcon className="mx-2" />
                                            <FormattedMessage id="cancel" />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            color="secondary"
                                            onClick={this.editDemande}
                                            style={{ direction: 'ltr' }}
                                            disabled={isLoading}
                                        >
                                            <SaveIcon className="mx-2" />
                                            <FormattedMessage id="save" />
                                        </Button>
                                    </div>
                                )}

                                {((this.demande || {}).currentStatut || {})
                                    .code === 'ATTESTATION_KO' && (
                                    <div className="d-flex justify-content-around my-5">
                                        <Button
                                            variant="outlined"
                                            size="medium"
                                            color="secondary"
                                            onClick={() => {
                                                this.goBack(true)
                                            }}
                                            style={{ direction: 'ltr' }}
                                        >
                                            <ArrowBackIosIcon className="mx-2" />
                                            <FormattedMessage id="back" />
                                        </Button>
                                    </div>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{ padding: 20 }}>
                            {this.renderDetails()}
                        </Grid>
                    </Grid>
                </div>
            </FormGroup>
        )
    }
}

/**
 * PropTypes
 * @type {{getAllUsers: *, getAllCenters: *, editDemande: *, allSpecialites: *, allUsers: *, getDemande: *, match: *, loggedUser: *, language: *, getAllSpecialites: *, history: *, intl: *, demande: *, error: *, allReferentiels: *, allCenters: *, isLoading: *, response: *, resetProps: *}}
 */
EditDemande.propTypes = {
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    editDemande: PropTypes.func.isRequired,
    response: PropTypes.object,
    demande: PropTypes.object,
    error: PropTypes.bool,
    history: PropTypes.object.isRequired,
    allReferentiels: PropTypes.object,
    getAllCenters: PropTypes.func.isRequired,
    loggedUser: PropTypes.object.isRequired,
    getAllSpecialites: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    allSpecialites: PropTypes.array,
    allCenters: PropTypes.array,
    resetProps: PropTypes.func.isRequired,
    getDemande: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
}

/**
 * Default Pros
 * @type {{isLoading: boolean, allSpecialites: [], allUsers: [], response: null, allReferentiels: {}, error: boolean, demande: {}, allCenters: []}}
 */
EditDemande.defaultProps = {
    allReferentiels: {},
    allCenters: [],
    response: null,
    error: false,
    allSpecialites: [],
    demande: {},
    isLoading: false,
}
const mapStateToProps = ({
    login,
    info,
    demande,
    referencial,
    centreFormation,
    specialite,
}) => {
    return {
        loggedUser: login.response,
        language: info.language,
        response: demande.editDemande.response,
        error: demande.editDemande.error,
        allReferentiels: referencial.allReferencials.response,
        allCenters: centreFormation.allCenters.response,
        allSpecialites: specialite.allSpecialites.response,
        demande: demande.demande.response,
        isLoading:
            demande.demande.loading ||
            demande.editDemande.loading ||
            referencial.allReferencials.loading ||
            centreFormation.allCenters.loading ||
            specialite.allSpecialites.loading,
    }
}
const mapDispatchToProps = dispatch => ({
    resetProps: () =>
        dispatch(editDemandeActions.editDemandeSuccess({ data: {} })),
    editDemande: payload =>
        dispatch(editDemandeActions.editDemandeRequest(payload)),
    getAllSpecialites: () =>
        dispatch(getAllSpecialitesActions.getAllSpecialitesRequest()),
    getAllCenters: () => dispatch(getAllCentersActions.getAllCentersRequest()),
    getDemande: id => dispatch(getDemandeActions.getDemandeRequest(id)),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(EditDemande))
