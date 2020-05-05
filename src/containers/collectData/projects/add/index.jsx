import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ButtonComponent from '../../../../components/ui/button'
import addProjectsActions from '../../../../redux/projects/addProjects'
import setPageTitleActions from '../../../../redux/pageTitle'
import PublicProjects from './publicProjects'
import InternationalCoops from './internationalCoops'
import Common from './common'

/**
 * add form
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
                type: 'true',
                sector: '',
                governorat: '',
                delegation: '',
                title_project: '',
                type_project: '',
                project_manager: '',
                finance: '',
                type_finance: '',
                registration_project_year: '',
                project_duration: '',
                project_component: '',
                project_progress_percent: '',
                project_progress: '',
                observation: '',
                expense_extimed: '',
                expense_real: '',
                project_cost: '',
                project_cost_updated: '',
                target_population: '',
                number_beneficiarie: '',
            },
        }
        props.setPageTitle(props.match.params.type)
    }

    componentWillReceiveProps(nextProps) {
        const { language, setPageTitle } = this.props
        const { match } = this.props

        if (match.params.type !== nextProps.match.params.type) {
            setPageTitle(nextProps.match.params.type)
            this.setState({
                isError: false,
                errorsList: {},
                data: {
                    type: 'true',
                    sector: '',
                    governorat: '',
                    delegation: '',
                    title_project: '',
                    type_project: '',
                    project_manager: '',
                    finance: '',
                    type_finance: '',
                    registration_project_year: '',
                    project_duration: '',
                    project_component: '',
                    project_progress_percent: '',
                    project_progress: '',
                    observation: '',
                    expense_extimed: '',
                    expense_real: '',
                    project_cost: '',
                    project_cost_updated: '',
                    target_population: '',
                    number_beneficiarie: '',
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
                    type: 'true',
                    sector: '',
                    governorat: '',
                    delegation: '',
                    title_project: '',
                    type_project: '',
                    project_manager: '',
                    finance: '',
                    type_finance: '',
                    registration_project_year: '',
                    project_duration: '',
                    project_component: '',
                    project_progress_percent: '',
                    project_progress: '',
                    observation: '',
                    expense_extimed: '',
                    expense_real: '',
                    project_cost: '',
                    project_cost_updated: '',
                    target_population: '',
                    number_beneficiarie: '',
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
        if (name === 'registration_project_year') {
            const year = new Date(value).getFullYear()
            this.setState({
                data: { ...data, registration_project_year: year },
            })
        } else this.setState({ data: { ...data, [name]: value } })
    }

    /**
     * subbmits the form
     *
     * @memberof Add
     */
    addHandler = () => {
        const { addProjectsForm, intl } = this.props
        const { data } = this.state
        let newPayload = {
            governorat: { id: data.governorat },
            delegation: { id: data.delegation },
            title_project: data.title_project,
            type_project: data.type_project,
            sector: { id: data.sector },
            type: this.type,
            project_manager: data.project_manager,
            finance: data.finance,
            type_finance: data.type_finance,
            registration_project_year: data.registration_project_year,
            project_duration: data.project_duration,
            project_component: data.project_component,
            project_progress_percent: data.project_progress_percent,
            project_progress: data.project_progress,
            observation: data.observation,
            project_cost: data.project_cost,
            project_cost_updated: data.project_cost_updated,
            intl,
        }
        if (this.type === 'true')
            newPayload = {
                ...newPayload,
                expense_extimed: data.expense_extimed,
                expense_real: data.expense_real,
            }
        else {
            newPayload = {
                ...newPayload,
                target_population: data.target_population,
                number_beneficiarie: data.number_beneficiarie,
            }
        }

        addProjectsForm(newPayload)
    }

    renderOtherFields = () => {
        const { match } = this.props
        const { isError, errorsList, data } = this.state

        switch (match.params.type) {
            case 'projets_publics':
                this.type = 'true'
                return (
                    <PublicProjects
                        handleChange={this.fieldChangedHandler}
                        isError={isError}
                        errorsList={errorsList}
                        data={data}
                    />
                )
            case 'projets_coopération_internationale':
                this.type = 'false'
                return (
                    <InternationalCoops
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
        response: state.projects.addProjects.response,
        error: state.projects.addProjects.error,
        success: state.projects.addProjects.success,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    addProjectsForm: payload =>
        dispatch(addProjectsActions.addProjectsRequest(payload)),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})

Add.propTypes = {
    language: PropTypes.string.isRequired,
    addProjectsForm: PropTypes.func.isRequired,
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
