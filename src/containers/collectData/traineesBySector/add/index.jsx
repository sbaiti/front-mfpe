/* eslint-disable no-case-declarations */
/* eslint-disable radix */
import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import ButtonComponent from '../../../../components/ui/button'
import collectDataActions from '../../../../redux/collectData/add'
import getAllCentersActions from '../../../../redux/centreFormation/getAllCenters'
import Diplomed from './diplomed'
import Registred from './registred'
import Common from './common'
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
        this.state = {
            isError: false,
            errorsList: {},
            data: {
                sector_type: 'true',
                training_center: '',
                sector: '',
                subsector: '',
                speciality: '',
                niveau_diplome: '',
                approved: '0',
                administrative_year: '',
                month: '',
                level_studychoice: false,
                level: '',
                nbr_trained_f_1: '',
                nbr_trained_h_1: '',
                nbr_foreigner_1: '',
                nbr_abundant_1: '',
                nbr_total_1: '',
                nbr_trained_f_2: '',
                nbr_trained_h_2: '',
                nbr_foreigner_2: '',
                nbr_abundant_2: '',
                nbr_total_2: '',
                nbr_trained_f_0: '',
                nbr_trained_h_0: '',
                nbr_foreigner_0: '',
                nbr_total_0: '',
            },
        }
        const { allCenters, getAllCenters } = this.props

        props.setPageTitle(props.match.params.type)
        if (!allCenters) getAllCenters()
    }

    componentWillReceiveProps(nextProps) {
        const { language, match, setPageTitle } = this.props

        if (match.params.type !== nextProps.match.params.type) {
            setPageTitle(nextProps.match.params.type)
            this.setState({
                isError: false,
                errorsList: {},
                data: {
                    sector_type: 'true',
                    training_center: '',
                    sector: '',
                    subsector: '',
                    speciality: '',
                    niveau_diplome: '',
                    approved: '0',
                    administrative_year: '',
                    month: '',
                    level_studychoice: false,
                    level: '',
                    nbr_trained_f_1: '',
                    nbr_trained_h_1: '',
                    nbr_foreigner_1: '',
                    nbr_abundant_1: '',
                    nbr_total_1: '',
                    nbr_trained_f_2: '',
                    nbr_trained_h_2: '',
                    nbr_foreigner_2: '',
                    nbr_abundant_2: '',
                    nbr_total_2: '',
                    nbr_trained_f_0: '',
                    nbr_trained_h_0: '',
                    nbr_foreigner_0: '',
                    nbr_total_0: '',
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
                    sector_type: 'true',
                    training_center: '',
                    sector: '',
                    subsector: '',
                    speciality: '',
                    niveau_diplome: '',
                    approved: '0',
                    administrative_year: '',
                    month: '',
                    level_studychoice: false,
                    level: '',
                    nbr_trained_f_1: '',
                    nbr_trained_h_1: '',
                    nbr_foreigner_1: '',
                    nbr_abundant_1: '',
                    nbr_total_1: '',
                    nbr_trained_f_2: '',
                    nbr_trained_h_2: '',
                    nbr_foreigner_2: '',
                    nbr_abundant_2: '',
                    nbr_total_2: '',
                    nbr_trained_f_0: '',
                    nbr_trained_h_0: '',
                    nbr_foreigner_0: '',
                    nbr_total_0: '',
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
        const { allCenters, language } = this.props
        const { value } = e.target
        const intitule = `intitule${language[0].toUpperCase()}r`

        switch (name) {
            case 'administrative_year':
                const year = new Date(value).getFullYear()
                this.setState({ data: { ...data, administrative_year: year } })
                break
            case 'month':
                const month = parseInt(new Date(value).getMonth())
                this.setState({ data: { ...data, month } })
                break
            case 'nbr_trained_f_0':
            case 'nbr_trained_h_0':
                this.setState(() => {
                    const newData = {
                        ...data,
                        [name]: parseInt(value) || 0,
                    }
                    return {
                        data: {
                            ...newData,
                            nbr_total_0:
                                newData.nbr_trained_h_0 +
                                newData.nbr_trained_f_0,
                        },
                    }
                })
                break
            case 'nbr_trained_f_1':
            case 'nbr_trained_h_1':
            case 'nbr_abundant_1':
                this.setState(() => {
                    const newData = {
                        ...data,
                        [name]: parseInt(value) || 0,
                    }

                    return {
                        data: {
                            ...newData,
                            nbr_total_1:
                                newData.nbr_trained_h_1 +
                                newData.nbr_trained_f_1 -
                                newData.nbr_abundant_1,
                        },
                    }
                })
                break
            case 'nbr_trained_f_2':
            case 'nbr_abundant_2':
            case 'nbr_trained_h_2':
                this.setState(() => {
                    const newData = {
                        ...data,
                        [name]: parseInt(value) || 0,
                    }
                    return {
                        data: {
                            ...newData,
                            nbr_total_2:
                                newData.nbr_trained_h_2 +
                                newData.nbr_trained_f_2 -
                                newData.nbr_abundant_2,
                        },
                    }
                })
                break
            case 'speciality':
                const center = allCenters.find(
                    i => i.id === data.training_center
                )
                const spec = center.specialiteCenters.find(i => i.id === value)
                this.setState({
                    data: {
                        ...data,
                        speciality: value,
                        niveau_diplome: spec && spec.niveauDiplome[intitule],
                    },
                })
                break
            case 'sector':
                this.setState({
                    data: { ...data, sector: value, subsector: '' },
                })
                break
            case 'training_center':
                this.setState({
                    data: {
                        ...data,
                        training_center: value,
                        speciality: '',
                        niveau_diplome: '',
                    },
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
        const { addSectorForm, intl } = this.props
        const { data } = this.state
        let newPayload = {
            training_center: { id: data.training_center },
            sector: { id: data.sector },
            subsector: {
                id: data.subsector,
            },
            speciality: {
                id: data.speciality,
            },
            approved: data.approved !== '0',
            administrative_year: data.administrative_year,
            month: data.month,
            sector_type: this.sector_type,
            intl,
        }

        if (this.level === 0)
            newPayload = {
                ...newPayload,
                level_study: [
                    {
                        nbr_trained_f: parseInt(data.nbr_trained_f_0),
                        nbr_trained_h: parseInt(data.nbr_trained_h_0),
                        nbr_foreigner: parseInt(data.nbr_foreigner_0),
                        nbr_total: parseInt(data.nbr_total_0),
                        level: 0,
                    },
                ],
            }
        else {
            newPayload = {
                ...newPayload,
                level_study: [
                    {
                        nbr_trained_f: data.nbr_trained_f_1,
                        nbr_trained_h: data.nbr_trained_h_1,
                        nbr_foreigner: data.nbr_foreigner_1,
                        nbr_abundant: data.nbr_abundant_1,
                        nbr_total: data.nbr_total_1,
                        level: 1,
                    },
                    {
                        nbr_trained_f: data.nbr_trained_f_2,
                        nbr_trained_h: data.nbr_trained_h_2,
                        nbr_foreigner: data.nbr_foreigner_2,
                        nbr_abundant: data.nbr_abundant_2,
                        nbr_total: data.nbr_total_2,
                        level: 2,
                    },
                ],
            }
        }
        addSectorForm(newPayload)
    }

    renderOtherFields = () => {
        const { match } = this.props
        const { isError, errorsList, data } = this.state

        switch (match.params.type) {
            case 'diplomé-secteur-privé':
                this.level = 0
                this.sector_type = 'false'
                return (
                    <Diplomed
                        handleChange={this.fieldChangedHandler}
                        isError={isError}
                        errorsList={errorsList}
                        data={data}
                    />
                )
            case 'diplomé-secteur-public':
                this.level = 0
                this.sector_type = 'true'
                return (
                    <Diplomed
                        handleChange={this.fieldChangedHandler}
                        isError={isError}
                        errorsList={errorsList}
                        data={data}
                    />
                )
            case 'inscrit-secteur-privé':
                this.level = 1
                this.sector_type = 'false'
                return (
                    <Registred
                        handleChange={this.fieldChangedHandler}
                        isError={isError}
                        errorsList={errorsList}
                        data={data}
                    />
                )

            case 'inscrit-secteur-public':
                this.level = 1
                this.sector_type = 'true'
                return (
                    <Registred
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
        const { history, allReferenciels, allCenters, language } = this.props
        const { isError, errorsList, data } = this.state
        if (!allCenters) return null
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
                            allCenters={allCenters}
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
        response: state.collectData.add.response,
        error: state.collectData.add.error,
        success: state.collectData.add.success,
        allCenters: state.centreFormation.allCenters.response,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    addSectorForm: payload => dispatch(collectDataActions.addRequest(payload)),
    getAllCenters: () => dispatch(getAllCentersActions.getAllCentersRequest()),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})

Add.propTypes = {
    language: PropTypes.string.isRequired,
    addSectorForm: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    getAllCenters: PropTypes.func.isRequired,
    allCenters: PropTypes.array,
    allReferenciels: PropTypes.object,
    response: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
}

Add.defaultProps = {
    allCenters: [],
    allReferenciels: {},
    response: null,
    error: false,
    success: false,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Add))
