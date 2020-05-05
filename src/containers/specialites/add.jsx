import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup'
import RenderForm from './renderForm'
import ButtonComponent from '../../components/ui/button'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import setPageTitleActions from '../../redux/pageTitle'
import addSpecialiteActions from '../../redux/specialite/addSpecialite'
import alertActions from '../../redux/alert'

/**
 * add new speciality
 *
 * @class AddSpecialite
 * @extends {React.Component}
 */
class AddSpecialite extends React.Component {
    static propTypes = {
        language: PropTypes.string.isRequired,
        addSpecialite: PropTypes.func.isRequired,
        setPageTitle: PropTypes.func.isRequired,
        allReferenciels: PropTypes.object,
        response: PropTypes.object,
        error: PropTypes.bool,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        intl: PropTypes.object.isRequired,
    }

    static defaultProps = {
        allReferenciels: {},
        response: null,
        error: false,
    }

    /**
     * Creates an instance of Add
     * @param {*} props
     * @memberof Add
     */
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorsList: {},
            data: {
                intitule_ar: '',
                intitule_fr: '',
                code_specialite: '',
                frais_specialite_exam: '',
                niveau_etude: '',
                niveau_diplome: '',
                secteur_activite: '',
                sous_secteur_activite: '',
            },
        }
        props.setPageTitle('addspeciality')
    }

    componentWillReceiveProps(nextProps) {
        const { language } = this.props
        const { match } = this.props

        if (match.params.type !== nextProps.match.params.type) {
            this.setState({
                isError: false,
                errorsList: {},
                data: {},
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
        }
    }

    /**
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

    update = key => {
        const { data } = this.state
        if (['secteur_activite'].indexOf(key) > -1) this.forceUpdate()
        if (key === 'secteur_activite') data.sous_secteur_activite = ''
    }

    /**

         *
         * @memberof Add
         */

    addSpec = () => {
        const { addSpecialite, intl } = this.props
        const { data } = this.state

        const newPayload = {
            ...data,
            niveau_etude: { id: data.niveau_etude },
            niveau_diplome: { id: data.niveau_diplome },
            secteur_activite: { id: data.secteur_activite },
            sous_secteur_activite: {
                id: data.sous_secteur_activite,
            },
            intl,
        }
        addSpecialite(newPayload)
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
                            clicked={this.addSpec}
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
        response: state.specialite.addSpecialite.response,
        error: state.specialite.addSpecialite.error,
        success: state.specialite.addSpecialite.success,
        allSpecialites: state.specialite.allSpecialites.response,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    addSpecialite: payload =>
        dispatch(addSpecialiteActions.addSpecialiteRequest(payload)),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
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
)(injectIntl(AddSpecialite))
