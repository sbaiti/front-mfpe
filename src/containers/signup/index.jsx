/* eslint-disable radix */
import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { Grid } from '@material-ui/core'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReCAPTCHA from 'react-google-recaptcha'
import ButtonComponent from '../../components/ui/button'
import addUserActions from '../../redux/user/addUser'
import getPdfLinkActions from '../../redux/pdf/getPdfLink'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import alertActions from '../../redux/alert'
import SITE_KEY from '../../shared/constants'
import FormSummary from './formSummary'
import Form from './form'
/**
 * Signup Component
 *
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component {
    static propTypes = {
        intl: PropTypes.object.isRequired,
        language: PropTypes.string.isRequired,
        signup: PropTypes.func.isRequired,
        allReferenciels: PropTypes.object,
        response: PropTypes.object,
        pdfData: PropTypes.object,
        error: PropTypes.bool,
        getPdfLink: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
    }

    static defaultProps = {
        allReferenciels: {},
        response: null,
        pdfData: null,
        error: false,
    }

    /**
     * Creates an instance of Signup.
     * @param {*} props
     * @memberof Signup
     */
    constructor(props) {
        super(props)
        this.state = {
            captchaError: null,
            disable: false,
            disablePrint: false,
            isError: false,
            errorsList: {},
            submitted: false,
            show: false,
            showRedirectToHome: false,
            payload: {
                date_delivrance_cin: '',
                date_delivrance_passport: '',
                date_validite_sejour: '',
                date_naissance: '',
                nationalite: '',
                num_cin: '',
                num_passport: '',
                num_carte_sejour: '',
                nom: '',
                prenom: '',
                gouvernorat: '',
                delegation: '',
                lieu_naissance: '',
                tel: '',
                email: '',
                sexe: '',
                personne_besoin_specifique: '0',
                nature_besoin_specifique: '',
                niveau_etude: '',
                preview: 'false',
                language: props.language,
            },
        }
    }

    /**
     * Component will receive props
     *
     * @param {*} nextProps
     * @memberof Signup
     */
    componentWillReceiveProps(nextProps) {
        const { language, response } = this.props
        const { payload } = this.state
        if (nextProps.error && nextProps.response) {
            const errorsList = {}
            try {
                Object.keys(nextProps.response.data.data).forEach(key => {
                    const item = nextProps.response.data.data[key]
                    if (item) {
                        const errorText = item[language]
                        errorsList[key] = errorText
                    }
                })
            } catch (e) {
                console.log(e)
            }
            this.setState({ isError: true, errorsList })
        }
        if (
            !nextProps.error &&
            (nextProps.response || {}).data !== (response || {}).data
        ) {
            if (payload.preview === 'true') {
                this.setState({ show: true })
            }
            if (nextProps.response && payload.preview === 'false') {
                this.setState({ submitted: true })
                payload.preview = 'true'
            }
        }
        if (
            (nextProps.error && nextProps.response) ||
            (!nextProps.error && nextProps.response)
        ) {
            this.setState({ disable: false })
        }
        if (nextProps.pdfData) {
            this.setState({ disablePrint: false })
        }
    }

    /**
     * Field chnaged handler
     *
     * @param {object} e
     * @param {string} name
     * @memberof Signup
     */
    fieldChangedHandler = (e, name) => {
        if (name === 'num_cin') {
            e.target.value = e.target.value.toString().slice(0, 8)
        }
        const { payload } = this.state
        const newPayload = { ...payload }
        switch (name) {
            case 'personne_besoin_specifique':
                newPayload.nature_besoin_specifique = ''
                break
            case 'gouvernorat':
                newPayload.delegation = ''
                break
            case 'nationalite':
                newPayload.num_cin = ''
                newPayload.num_passport = ''
                newPayload.num_carte_sejour = ''
                newPayload.date_delivrance_cin = ''
                newPayload.date_delivrance_passport = ''
                newPayload.date_validite_sejour = ''
                break

            default:
                break
        }
        this.setState({
            payload: { ...newPayload, [name]: e.target.value },
        })
    }

    /**
     * Add User
     *
     * @memberof Signup
     */
    addUser = () => {
        const { signup } = this.props
        const { payload } = this.state
        if (!this.captchaValue && payload.preview === 'true') {
            this.setState({ captchaError: true })
            return
        }
        const newPayload = {
            ...payload,
            nationalite: { id: payload.nationalite },
            gouvernorat: { id: payload.gouvernorat },
            delegation: { id: payload.delegation },
            niveau_etude: { id: payload.niveau_etude },
            nature_besoin_specifique: {
                id: payload.nature_besoin_specifique,
            },
            personne_besoin_specifique:
                parseInt(payload.personne_besoin_specifique) || 0,
            tel: payload.tel,
        }
        this.setState({ disable: true })

        signup(newPayload)
    }

    /**
     * Print
     *
     * @memberof Signup
     */
    print = () => {
        const { getPdfLink, language } = this.props
        const { payload } = this.state
        this.setState({ showRedirectToHome: true, disablePrint: true }, () =>
            getPdfLink({
                url: 'users/export_pdf',
                payload: { email: payload.email, lang: language },
            })
        )
    }

    /**
     * on change captcha
     *
     * @memberof Signup
     */
    onChange = value => {
        this.captchaValue = value
    }

    /**
     * Render
     *
     * @returns
     * @memberof Signup
     */
    render() {
        const { allReferenciels, history, language, intl } = this.props
        const {
            submitted,
            show,
            showRedirectToHome,
            disable,
            disablePrint,
            captchaError,
            payload,
            isError,
            errorsList,
        } = this.state
        return (
            allReferenciels && (
                <FormGroup className="signupImage">
                    <div className="centerDiv gradiant">
                        <Grid container>
                            {submitted ? (
                                <FormSummary
                                    language={language}
                                    allReferenciels={allReferenciels}
                                    payload={payload}
                                />
                            ) : (
                                <Form
                                    language={language}
                                    intl={intl}
                                    allReferenciels={allReferenciels}
                                    payload={payload}
                                    isError={isError}
                                    errorsList={errorsList}
                                    fieldChangedHandler={
                                        this.fieldChangedHandler
                                    }
                                />
                            )}
                        </Grid>
                        {submitted && !show && (
                            <div style={{ padding: '20px 33% 0px' }}>
                                <ReCAPTCHA
                                    sitekey={SITE_KEY}
                                    onChange={this.onChange}
                                    hl={language}
                                    onExpired={() => {
                                        this.captchaValue = null
                                    }}
                                    onErrored={() => {
                                        this.captchaValue = null
                                    }}
                                />
                                {captchaError && !this.captchaValue && (
                                    <small className="text-danger">
                                        {intl.formatMessage({
                                            id: 'captchaError',
                                        })}
                                    </small>
                                )}
                            </div>
                        )}
                        <div className="p-4 text-center">
                            {!show && (
                                <ButtonComponent
                                    disabled={disable}
                                    color="secondary"
                                    type="contained"
                                    label={<FormattedMessage id="cancel" />}
                                    size="large"
                                    clicked={() => {
                                        if (submitted) {
                                            payload.preview = 'false'
                                            this.setState({
                                                submitted: false,
                                                show: false,
                                            })
                                            this.captchaValue = null
                                        } else history.goBack()
                                    }}
                                />
                            )}
                            {!submitted && (
                                <ButtonComponent
                                    disabled={disable}
                                    color="secondary"
                                    type="contained"
                                    size="large"
                                    label={<FormattedMessage id="save" />}
                                    clicked={this.addUser}
                                />
                            )}
                            {submitted && !show && (
                                <ButtonComponent
                                    disabled={disable}
                                    color="secondary"
                                    type="contained"
                                    size="large"
                                    label={<FormattedMessage id="register" />}
                                    clicked={this.addUser}
                                />
                            )}
                            {show && (
                                <ButtonComponent
                                    disabled={disablePrint || disable}
                                    color="secondary"
                                    type="contained"
                                    size="large"
                                    label={<FormattedMessage id="print" />}
                                    clicked={this.print}
                                />
                            )}
                            {showRedirectToHome && (
                                <ButtonComponent
                                    disabled={disablePrint}
                                    color="secondary"
                                    type="contained"
                                    size="large"
                                    label={<FormattedMessage id="goHomePage" />}
                                    clicked={() => {
                                        history.push('/')
                                    }}
                                />
                            )}
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
        response: state.user.addUser.response,
        error: state.user.addUser.error,
        pdfData: state.pdf.pdfLink.response,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    signup: payload => dispatch(addUserActions.addUserRequest(payload)),
    getPdfLink: payload =>
        dispatch(getPdfLinkActions.getPdfLinkRequest(payload)),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
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
)(injectIntl(Signup))
