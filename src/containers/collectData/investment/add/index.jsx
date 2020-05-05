import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import ButtonComponent from '../../../../components/ui/button'
import addInvestmentProjectActions from '../../../../redux/investmentProjects/addInvestmentProject'
import Common from './common'
import CompaniesInDifficulty from './companiesInDifficulty'
import setPageTitleActions from '../../../../redux/pageTitle'
import Api from './api'
import Apia from './apia'

/**
 * add
 *
 * @class Add
 * @extends {React.Component}
 */
class Add extends React.Component {
    /**
     * Creates an instance of Add.
     * @param {*} props
     * @memberof Add
     */
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorsList: {},
            data: {
                governorat: '',
                delegation: '',
                sector: '',
                object: '',
                regime: '',
                job_estimed: '',
                investment_cost: '',
                activiry_cessation: '',
                duration: '',
                number_job_lost: '',
            },
        }
        props.setPageTitle(props.match.params.type)
    }

    componentWillReceiveProps(nextProps) {
        const { language, match, setPageTitle } = this.props
        if (match.params.type !== nextProps.match.params.type) {
            setPageTitle(nextProps.match.params.type)
            this.setState({
                isError: false,
                errorsList: {},
                data: {
                    governorat: '',
                    delegation: '',
                    sector: '',
                    object: '',
                    regime: '',
                    job_estimed: '',
                    investment_cost: '',
                    activiry_cessation: '',
                    duration: '',
                    number_job_lost: '',
                },
            })
            return
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
        } else if (nextProps.success) {
            this.setState({
                isError: false,
                errorsList: {},
                data: {
                    governorat: '',
                    delegation: '',
                    sector: '',
                    object: '',
                    regime: '',
                    job_estimed: '',
                    investment_cost: '',
                    activiry_cessation: '',
                    duration: '',
                    number_job_lost: '',
                },
            })
        }
    }

    /**
     * handle form element changes
     *
     * @memberof Add
     * @param{object} e: event
     * @param{string} name: field name
     */
    fieldChangedHandler = (e, name) => {
        const { data } = this.state
        const { value } = e.target
        this.setState({ data: { ...data, [name]: value } })
    }

    /**
     * subbmits the form
     *
     * @memberof Add
     */
    addHandler = () => {
        const { addInvestmentForm, intl, match } = this.props
        const { data } = this.state
        let newPayload = {
            governorat: { id: data.governorat },
            delegation: { id: data.delegation },
            sector: { id: data.sector },
            intl,
        }

        switch (match.params.type) {
            case 'api':
                newPayload = {
                    ...newPayload,
                    type: '1',
                    object: data.object,
                    regime: data.regime,
                    job_estimed: parseInt(data.job_estimed, 10),
                    investment_cost: parseInt(data.investment_cost, 10),
                }
                break
            case 'apia':
                newPayload = {
                    ...newPayload,
                    type: '2',
                    object: data.object,
                    job_estimed: parseInt(data.job_estimed, 10),
                    investment_cost: parseInt(data.investment_cost, 10),
                }
                break
            case 'entreprise-en-difficulté':
                newPayload = {
                    ...newPayload,
                    activiry_cessation: data.activiry_cessation,
                    duration: parseInt(data.duration, 10),
                    number_job_lost: parseInt(data.number_job_lost, 10),
                    type: '3',
                }
                break
            default:
        }

        addInvestmentForm(newPayload)
    }

    renderOtherFields = () => {
        const { match } = this.props
        const { isError, errorsList, data } = this.state

        switch (match.params.type) {
            case 'api':
                return (
                    <Api
                        handleChange={this.fieldChangedHandler}
                        isError={isError}
                        errorsList={errorsList}
                        data={data}
                    />
                )
            case 'apia':
                return (
                    <Apia
                        handleChange={this.fieldChangedHandler}
                        isError={isError}
                        errorsList={errorsList}
                        data={data}
                    />
                )
            case 'entreprise-en-difficulté':
                return (
                    <CompaniesInDifficulty
                        handleChange={this.fieldChangedHandler}
                        isError={isError}
                        errorsList={errorsList}
                        data={data}
                    />
                )

            default:
                return null
        }
    }

    render() {
        const { history, allReferenciels, language } = this.props
        const { isError, errorsList, data } = this.state
        return (
            <FormGroup>
                <div className="centerDiv">
                    <div className="d-block d-lg-flex flex-wrap">
                        <Common
                            handleChange={this.fieldChangedHandler}
                            isError={isError}
                            errorsList={errorsList}
                            data={data}
                            allReferenciels={allReferenciels}
                            language={language}
                        />
                        {this.renderOtherFields()}
                    </div>

                    <div className="p-4 text-center">
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
                            clicked={this.addHandler}
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
        allUsers: state.user.allUsers.response,
        loggedUser: state.login.response.User.details,
        response: state.InvestmentProject.addInvestmentProject.response,
        error: state.InvestmentProject.addInvestmentProject.error,
        success: state.InvestmentProject.addInvestmentProject.success,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    addInvestmentForm: payload =>
        dispatch(
            addInvestmentProjectActions.addInvestmentProjectRequest(payload)
        ),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})

Add.propTypes = {
    language: PropTypes.string.isRequired,
    addInvestmentForm: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    allReferenciels: PropTypes.object,
    response: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
}

Add.defaultProps = {
    allReferenciels: {},
    response: null,
    error: false,
    success: false,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Add))
