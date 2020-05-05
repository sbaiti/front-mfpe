/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../assets/sass/style.scss'
import instance from '../serveur/axios'
import wrapApiActions from '../redux/wrapApi'
import alertActions from '../redux/alert'
import SpinnerDot from '../components/ui/spinnerDot'
import Header from '../containers/header'
import Footer from '../containers/footer'
import getAllReferenceActions from '../redux/referencial/getAllReferencial'
import Alert from '../components/ui/alert'
import { concatMessages } from '../shared/utility'
import Dashboard from '../containers/dashboard'

class Routes extends Component {
    static propTypes = {
        history: PropTypes.shape({ push: PropTypes.func.isRequired })
            .isRequired,
        wrapApiCall: PropTypes.func.isRequired,
        wrapApiPut: PropTypes.func.isRequired,
        wrapApiCallFailure: PropTypes.func.isRequired,
        generalLoader: PropTypes.bool.isRequired,
        language: PropTypes.string.isRequired,
        allReferenciels: PropTypes.object,
        getAllReferenciels: PropTypes.func.isRequired,
        connected: PropTypes.bool.isRequired,
        firstTimetoConnect: PropTypes.bool,
        loggedUser: PropTypes.object,
    }

    static defaultProps = {
        allReferenciels: {},
        loggedUser: null,
        firstTimetoConnect: false,
    }

    constructor(props) {
        super(props)
        this.state = {}
        if (props.firstTimetoConnect) {
            props.history.push('/change-password')
        }
    }

    componentDidMount() {
        const {
            wrapApiCall,
            wrapApiCallFailure,
            wrapApiPut,
            allReferenciels,
            getAllReferenciels,
            language,
        } = this.props
        try {
            const self = this

            instance.interceptors.request.use(
                config => {
                    if (!config.url.includes('notification/')) wrapApiCall()
                    return config
                },
                error => {
                    wrapApiCallFailure(error)
                    return Promise.reject(error)
                }
            )

            instance.interceptors.response.use(
                response => {
                    wrapApiPut(response)
                    return response
                },
                error => {
                    const err = Promise.resolve(error)

                    err.then(e => {
                        if (!e.config.url.includes('notification/'))
                            self.props.alertShow(true, {
                                title: language === 'ar' ? 'خطأ' : 'Erreur',
                                warning: false,
                                info: false,
                                error: true,
                                success: false,
                                message: concatMessages(
                                    error.response
                                        ? error.response.data
                                        : {
                                              message: {
                                                  ar: 'حدث خطأ ما',
                                                  fr: 'Une erreur est survenue',
                                              },
                                          },
                                    language
                                ),
                            })
                        self.props.wrapApiPutFailure(e.toString())
                    })
                    return Promise.reject(error)
                }
            )
        } catch (err) {
            console.log(err, 'instance')
        }
        if (!allReferenciels) {
            getAllReferenciels()
        }
    }

    render() {
        const {
            generalLoader,
            language,
            connected,
            loggedUser,
            firstTimetoConnect,
        } = this.props
        const role = loggedUser
            ? (loggedUser.User.details.userRoles[0] || {}).role
            : ''
        return (
            <div className={language === 'ar' ? 'containerAr' : 'containerFr'}>
                <Header />
                <div className="App">
                    <SpinnerDot show={generalLoader} />
                    <Dashboard
                        userRole={role}
                        isLogged={connected && !firstTimetoConnect}
                    />
                </div>
                <Footer />
                <Alert />
            </div>
        )
    }
}
const mapStateToProps = ({ login, wrapApi, info, referencial }) => {
    return {
        connected: login.connected,
        firstTimetoConnect:
            login.firstTimetoConnect &&
            login.response.User.details.userRoles.find(
                i => i.role === 'ROLE_CITOYEN'
            ) !== undefined,
        loggedUser: login.response,
        allReferenciels: referencial.allReferencials.response,
        generalLoader: wrapApi.generalLoader,
        language: info.language,
    }
}

const mapDispatchToProps = dispatch => ({
    wrapApiCall: () => dispatch(wrapApiActions.wrapApiCall({})),
    wrapApiCallFailure: payload =>
        dispatch(wrapApiActions.wrapApiCallFailure(payload)),
    wrapApiPut: payload => dispatch(wrapApiActions.wrapApiPut(payload)),
    wrapApiPutFailure: payload =>
        dispatch(wrapApiActions.wrapApiPutFailure(payload)),

    getAllReferenciels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    alertShow: (show, info) => dispatch(alertActions.alertShow(show, info)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routes)
