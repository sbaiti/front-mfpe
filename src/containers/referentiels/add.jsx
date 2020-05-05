/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ButtonComponent from '../../components/ui/button'
import addNewReferenceActions from '../../redux/referencial/addNewReferencial'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import setPageTitleActions from '../../redux/pageTitle'
import RenderForm from './renderForm'

/**
 * add new referentiel
 *
 * @class AddReferentiel
 * @extends {React.Component}
 */
class AddReferentiel extends React.Component {
    /**
     * Creates an instance of AddReferentiel.
     * @param {*} props
     * @memberof AddReferentiel
     */
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorsList: {},

            data: {
                intituleAr: '',
                intituleFr: '',
                intituleAn: '',
                categorie: '',
                parent: '',
                longitude: '',
                latitude: '',
                code: '',
            },
        }
        props.setPageTitle('addReference')
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
        } else if (nextProps.success) {
            history.push('/referentiels/liste')
        }
    }

    /**
     * handle form element changes
     *
     * @memberof AddReferentiel
     * @param{object} e: event
     * @param{string} name: field name
     */
    fieldChangedHandler = (e, name) => {
        const { data } = this.state
        const { value } = e.target
        this.setState({ data: { ...data, [name]: value } })
    }

    /**
     * update component (rerender)
     *
     * @memberof AddReferentiel
     * @param{string} key: field name
     */
    update = key => {
        const { data } = this.state
        if (key === 'categorie') {
            this.forceUpdate()
            data.parent = ''
        }
    }

    /**
     * subbmits the form
     *
     * @memberof AddReferentiel
     */
    addReferentiel = () => {
        const { addReferentiel, intl } = this.props
        const { data } = this.state
        addReferentiel({ ...data, intl })
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
                            update={this.update}
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
                            clicked={this.addReferentiel}
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
        response: state.referencial.addNewReferencial.response,
        error: state.referencial.addNewReferencial.error,
        success: state.referencial.addNewReferencial.success,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    addReferentiel: payload =>
        dispatch(addNewReferenceActions.addNewReferenceRequest(payload)),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})

AddReferentiel.propTypes = {
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    addReferentiel: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    allReferenciels: PropTypes.object,
    response: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    history: PropTypes.object.isRequired,
}

AddReferentiel.defaultProps = {
    allReferenciels: {},
    response: null,
    error: false,
    success: false,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(AddReferentiel))
