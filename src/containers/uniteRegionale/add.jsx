/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { Grid } from '@material-ui/core'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import InputText from '../../components/ui/input'
import SelectList from '../../components/ui/select'
import generateKey from '../../shared/utility'
import ButtonComponent from '../../components/ui/button'
import addUniteRegionaleActions from '../../redux/uniteRegionale/addUniteRegionale'
import inscription from '../../assets/images/inscription.svg'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import getAllUsersActions from '../../redux/user/getAllUsers'
import alertActions from '../../redux/alert'
import setPageTitleActions from '../../redux/pageTitle'

const WrapBgImage = styled.div`
    padding: 30px;
    display: inline-block;
    background-image: url(${props => props.bg});
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 150%;
    width: 100%;
`
const WrapBgColor = styled.div`
    background-image: radial-gradient(circle, white, #e8e8e8, #e6e6e6);
    width: 100%;
`
/**
 * add new unite regionale
 *
 * @class AddUniteRegionale
 * @extends {React.Component}
 */
class AddUniteRegionale extends React.Component {
    static propTypes = {
        intl: PropTypes.object.isRequired,
        language: PropTypes.string.isRequired,
        addUnit: PropTypes.func.isRequired,
        allReferenciels: PropTypes.object,
        allUsers: PropTypes.array,
        response: PropTypes.object,
        error: PropTypes.bool,
        getAllUsers: PropTypes.func.isRequired,
        getAllReferentiels: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        setPageTitle: PropTypes.func.isRequired,
    }

    static defaultProps = {
        allReferenciels: {},
        allUsers: {},
        response: null,
        error: false,
    }

    /**
     * Creates an instance of AddUniteRegionale.
     * @param {*} props
     * @memberof AddUniteRegionale
     */
    constructor(props) {
        super(props)
        const { getAllUsers, allUsers, setPageTitle } = props
        this.state = {
            isError: false,
            errorsList: {},
        }
        if (!allUsers) getAllUsers()
        this.payload = {
            code_unite: '',
            titre: '',
            gouvernorat: '',
            premier_responsable: '',
            tel: '',
            fax: '',
            email: '',
            fonction: '',
        }
        setPageTitle('addRegionalUnit')
    }

    componentWillReceiveProps(nextProps) {
        const { language, history } = this.props
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
        } else if (!nextProps.response) {
            history.push('/unite-regionale/liste')
        }
    }

    /**
     * renders a form
     *
     * @memberof AddUniteRegionale
     */
    renderForm = () => {
        const {
            allReferenciels,
            intl,
            language,
            getAllReferentiels,
        } = this.props
        let listGovs = []
        const listUsers = []
        let listFunctions = []

        try {
            listGovs = allReferenciels.referenciels.RefGouvernorat.map(i => ({
                label: language === 'ar' ? i.intituleAr : i.intituleFr,
                value: i.id,
            }))
            listFunctions = allReferenciels.referenciels.RefGouvernorat.map(
                i => ({
                    label: language === 'ar' ? i.intituleAr : i.intituleFr,
                    value: i.id,
                })
            )
        } catch (error) {
            getAllReferentiels()
            return
        }

        const formElments = [
            {
                name: 'code_unite',
                label: <FormattedMessage id="code" />,
                placeholder: intl.formatMessage({ id: 'code' }),
            },
            {
                name: 'titre',
                label: <FormattedMessage id="title" />,
                placeholder: intl.formatMessage({ id: 'title' }),
            },
            {
                name: 'gouvernorat',
                label: <FormattedMessage id="governorate" />,
                list: listGovs,
                isSelect: true,
            },
            {
                name: 'premier_responsable',
                label: <FormattedMessage id="firstResponsible" />,
                list: listUsers,
                isSelect: true,
            },
            {
                name: 'tel',
                label: <FormattedMessage id="phone" />,
                placeholder: intl.formatMessage({ id: 'phone' }),
                type: 'tel  ',
            },
            {
                name: 'fax',
                label: <FormattedMessage id="fax" />,
                placeholder: intl.formatMessage({ id: 'fax' }),
            },
            {
                name: 'email',
                label: <FormattedMessage id="email" />,
                placeholder: intl.formatMessage({ id: 'email' }),
                type: 'email',
            },
            {
                name: 'fonction',
                label: <FormattedMessage id="function" />,
                list: listFunctions,
                isSelect: true,
            },
        ]
        const { isError, errorsList } = this.state
        return formElments
            .filter(el => el)
            .map((el, index) =>
                el.isSelect ? (
                    <SelectList
                        key={`${el.name}${index}`}
                        onchange={e => {
                            this.fieldChangedHandler(e, el.name)
                        }}
                        name={el.name}
                        label={el.label}
                        list={el.list}
                        selectedItem={this.payload[el.name]}
                        errorText={errorsList[el.name]}
                        isError={
                            isError && Object.keys(errorsList).includes(el.name)
                        }
                        attributes={el.props}
                    />
                ) : (
                    <InputText
                        key={`${el.name}${index}`}
                        onchange={e => this.fieldChangedHandler(e, el.name)}
                        name={el.name}
                        label={el.label}
                        placeholder={el.placeholder}
                        type={el.type}
                        value={this.payload[el.name]}
                        errorText={errorsList[el.name]}
                        isError={
                            isError && Object.keys(errorsList).includes(el.name)
                        }
                    />
                )
            )
    }

    /**
     * handle form element changes
     *
     * @memberof AddUniteRegionale
     * @param{object} e: event
     * @param{string} name: field name
     */
    fieldChangedHandler = (e, name) => {
        this.payload[name] = e.target.value
    }

    /**
     * subbmits the form
     *
     * @memberof AddUniteRegionale
     */
    addUnit = () => {
        const { addUnit } = this.props
        addUnit(this.payload)
    }

    render() {
        if (this.notAllowed) return null
        const { allReferenciels, history } = this.props
        return (
            <WrapBgColor key={generateKey()} bg={inscription}>
                <WrapBgImage key={generateKey()} bg={inscription}>
                    {allReferenciels && (
                        <FormGroup style={{ background: '#e6e6e670' }}>
                            <div className="centerDiv">
                                <Grid container>{this.renderForm()}</Grid>
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
                                        clicked={this.addUnit}
                                    />
                                </div>
                            </div>
                        </FormGroup>
                    )}
                </WrapBgImage>
            </WrapBgColor>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.info.language,
        allUsers: state.user.allUsers.response,
        loggedUser: state.login.response.User.details,
        response: state.referencial.addNewReferencial.response,
        error: state.referencial.addNewReferencial.error,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    addUnit: payload =>
        dispatch(addUniteRegionaleActions.addUniteRegionaleRequest(payload)),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    getAllUsers: () => dispatch(getAllUsersActions.getAllUsersRequest()),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
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
)(injectIntl(AddUniteRegionale))
