import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup'
import ButtonComponent from '../../../../components/ui/button'
import addNombreCentreActions from '../../../../redux/nombreCentreFormationsPrivees/addNombreCentrePrivee'
import getAllReferenceActions from '../../../../redux/referencial/getAllReferencial'
import setPageTitleActions from '../../../../redux/pageTitle'
import RenderForm from './renderForm'

/**
 * Add Component
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
                gouvernorat: '',
                year: '',
                month: '',
                initial_number: '',
                continus_number: '',
                initial_continus_number: '',
                change_number: '',
                closed_training_center_number: '',
                language: props.language,
            },
        }
        props.setPageTitle('privateCenterNumber')
    }

    componentWillReceiveProps(nextProps) {
        const { language } = this.props
        const { match } = this.props

        if (match.params.type !== nextProps.match.params.type) {
            this.setState({
                isError: false,
                errorsList: {},
                data: {
                    gouvernorat: '',
                    year: '',
                    month: '',
                    initial_number: '',
                    continus_number: '',
                    initial_continus_number: '',
                    change_number: '',
                    closed_training_center_number: '',
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
                    data: {
                        gouvernorat: '',
                        year: '',
                        month: '',
                        initial_number: '',
                        continus_number: '',
                        initial_continus_number: '',
                        change_number: '',
                        closed_training_center_number: '',
                    },
                },
            })
        }
    }

    /**
     * Render Form
     *
     */

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
        const year = new Date(value).getFullYear()
        const month = new Date(value).getMonth()

        switch (name) {
            case 'year':
                this.setState({
                    data: { ...data, year },
                })
                break
            case 'month':
                this.setState({
                    data: { ...data, month },
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
    addNumberprivateCenter = () => {
        const { addNombreCentrePrivee, intl } = this.props
        const { data } = this.state

        const newPayload = {
            ...data,
            gouvernorat: { id: data.gouvernorat },
            change_number: parseInt(data.change_number, 10),
            initial_number: parseInt(data.initial_number, 10),
            continus_number: parseInt(data.continus_number, 10),
            initial_continus_number: parseInt(data.initial_continus_number, 10),
            closed_training_center_number: parseInt(
                data.closed_training_center_number,
                10
            ),
            intl,
        }
        addNombreCentrePrivee(newPayload)
    }

    render() {
        const { history, allReferenciels, language } = this.props
        const { isError, errorsList, data } = this.state
        return (
            <FormGroup>
                <div className="centerDiv">
                    <div className="d-block d-lg-flex flex-wrap">
                        <RenderForm
                            handleChange={this.fieldChangedHandler}
                            isError={isError}
                            errorsList={errorsList}
                            data={data}
                            allReferenciels={allReferenciels}
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
                            clicked={this.addNumberprivateCenter}
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
        loggedUser: state.login.response.User.details,
        response: state.nombreCentreFormationsPrivees.addNombreCentre.response,
        error: state.nombreCentreFormationsPrivees.addNombreCentre.error,
        success: state.nombreCentreFormationsPrivees.addNombreCentre.success,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    addNombreCentrePrivee: payload =>
        dispatch(addNombreCentreActions.addNombreCentreRequest(payload)),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})

Add.propTypes = {
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    addNombreCentrePrivee: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    allReferenciels: PropTypes.object,
    response: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
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
