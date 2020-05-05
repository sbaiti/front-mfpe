/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable no-case-declarations */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ButtonComponent from '../../../../components/ui/button'
import addSocioEcoDataActions from '../../../../redux/donneesSocioEconomique/addSocioEcoData'
import getAllUniteRegionalesActions from '../../../../redux/uniteRegionale/getAllUniteRegionales'
import RenderForm from './renderForm'
import setPageTitleActions from '../../../../redux/pageTitle'

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
        const {
            getAllUniteRegionales,
            allUniteRegionales,
            setPageTitle,
        } = props
        this.state = {
            isError: false,
            callApi: false,
            errorsList: {},
            data: {
                direction_regionale: '',
                health_institution_number: '',
                health_institution_year: '',
                school_institution_number: '',
                school_institution_year: '',
                university_institution_number: '',
                institution_university_year: '',
                dropout_school_number: '',
                dropout_school_year: '',
                needy_family_number: '',
                needy_family_year: '',
                association_number: '',
                association_year: '',
                description: '',
                current_project: '',
            },
        }
        setPageTitle('donnéesSocioéconomiques')
        if (!allUniteRegionales) getAllUniteRegionales()
    }

    componentWillReceiveProps(nextProps) {
        const { language } = this.props
        const { callApi } = this.state
        if (callApi) {
            this.setState({
                isError: false,
                errorsList: {},
            })
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
                    direction_regionale: '',
                    health_institution_number: '',
                    health_institution_year: '',
                    school_institution_number: '',
                    school_institution_year: '',
                    university_institution_number: '',
                    institution_university_year: '',
                    dropout_school_number: '',
                    dropout_school_year: '',
                    needy_family_number: '',
                    needy_family_year: '',
                    association_number: '',
                    association_year: '',
                    description: '',
                    current_project: '',
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
        switch (name) {
            case 'school_institution_year':
                const year = new Date(value).getFullYear()
                this.setState({
                    data: { ...data, school_institution_year: year },
                })
                break
            case 'health_institution_year':
                const year0 = new Date(value).getFullYear()
                this.setState({
                    data: { ...data, health_institution_year: year0 },
                })
                break
            case 'institution_university_year':
                const year1 = new Date(value).getFullYear()
                this.setState({
                    data: { ...data, institution_university_year: year1 },
                })
                break
            case 'dropout_school_year':
                const year2 = new Date(value).getFullYear()
                this.setState({
                    data: { ...data, dropout_school_year: year2 },
                })
                break
            case 'needy_family_year':
                const year3 = new Date(value).getFullYear()
                this.setState({
                    data: { ...data, needy_family_year: year3 },
                })
                break
            case 'association_year':
                const year4 = new Date(value).getFullYear()
                this.setState({
                    data: { ...data, association_year: year4 },
                })
                break

            default:
                this.setState({ data: { ...data, [name]: value } })
                break
        }
    }

    /**
     * subbmits the form
     *
     * @memberof Add
     */
    addHandler = () => {
        const { addSocioEcoDataForm, intl } = this.props
        const { data } = this.state
        const newPayload = {
            direction_regionale: { id: data.direction_regionale },
            health_institution_number: parseInt(data.health_institution_number),
            health_institution_year: data.health_institution_year,
            school_institution_number: parseInt(data.school_institution_number),
            school_institution_year: data.school_institution_year,
            university_institution_number: parseInt(
                data.university_institution_number
            ),
            institution_university_year: data.institution_university_year,
            dropout_school_number: parseInt(data.dropout_school_number),
            dropout_school_year: data.dropout_school_year,
            needy_family_number: parseInt(data.needy_family_number),
            needy_family_year: data.needy_family_year,
            association_number: parseInt(data.association_number),
            association_year: data.association_year,
            description: data.description,
            current_project: data.current_project,
            intl,
        }
        addSocioEcoDataForm(newPayload)
        this.setState({ callApi: true })
    }

    render() {
        const { history, allUniteRegionales, language } = this.props
        const { isError, errorsList, data } = this.state
        if (!allUniteRegionales) return null
        return (
            <FormGroup>
                <div className="centerDiv">
                    <div className="d-block d-lg-flex flex-wrap">
                        <RenderForm
                            handleChange={this.fieldChangedHandler}
                            isError={isError}
                            errorsList={errorsList}
                            data={data}
                            allUniteRegionales={allUniteRegionales}
                            language={language}
                        />
                    </div>
                    <div style={{ textAlign: 'center', padding: 20 }}>
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
        response: state.SocioData.addSocioEcoData.response,
        error: state.SocioData.addSocioEcoData.error,
        success: state.SocioData.addSocioEcoData.success,
        allUniteRegionales: state.uniteRegionale.allUniteRegionales.response,
    }
}
const mapDispatchToProps = dispatch => ({
    addSocioEcoDataForm: payload =>
        dispatch(addSocioEcoDataActions.addSocioEcoDataRequest(payload)),
    getAllUniteRegionales: () =>
        dispatch(getAllUniteRegionalesActions.getAllUniteRegionalesRequest()),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})

Add.propTypes = {
    language: PropTypes.string.isRequired,
    addSocioEcoDataForm: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    response: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    history: PropTypes.object.isRequired,
    getAllUniteRegionales: PropTypes.func.isRequired,
    allUniteRegionales: PropTypes.array,
    intl: PropTypes.object.isRequired,
}

Add.defaultProps = {
    response: null,
    allUniteRegionales: [],
    error: false,
    success: false,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Add))
