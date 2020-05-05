import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup'
import RenderForm from './renderForm'
import ButtonComponent from '../../components/ui/button'
import addCenterActions from '../../redux/centreFormation/addCenter'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import setPageTitleActions from '../../redux/pageTitle'

/**
 * Add Component
 *
 * @class Add
 * @extends {React.Component}
 */
class Add extends React.Component {
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
                adresse: '',
                tel: '',
                fax: '',
                email: '',
                nom_directeur_ar: '',
                nom_directeur_fr: '',
                annee_creation: '',
                capacite_acceuil: '',
                secteur_activite: '',
                organisme: '',
                gouvernorat: '',
                delegation: '',
                numero_enregistrement: '',
                specialites: '',
                nombre_formateur: '',
                nbre_cadre_administratif: '',
                capacite_hybergement: '',
                capacite_resto: '',
            },
        }
        props.setPageTitle('centerCard')
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
        if (['gouvernorat', 'secteur_activite'].indexOf(key) > -1)
            this.forceUpdate()
        if (key === 'gouvernorat') data.delegation = ''
        if (key === 'secteur_activite') {
            data.organisme = ''
            data.gouvernorat = ''
            data.delegation = ''
            data.numero_enregistrement = ''
        }
    }

    /**
     
     *
     * @memberof Add
     */
    addCenter = () => {
        const { addCenter, intl } = this.props
        const { data } = this.state
        const newPayload = {
            ...data,
            gouvernorat: { id: data.gouvernorat },
            delegation: { id: data.delegation },
            secteur_activite: { id: data.secteur_activite },
            tel: data.tel,
            fax: data.fax,
            specialites: (data.specialites || []).map(e => ({ id: e })),
            intl,
        }
        addCenter(newPayload)
    }

    render() {
        const {
            history,
            allReferenciels,
            language,
            allSpecialities,
        } = this.props

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
                            allSpecialities={allSpecialities}
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
                            clicked={this.addCenter}
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
        response: state.centreFormation.addCenter.response,
        error: state.centreFormation.addCenter.error,
        success: state.centreFormation.addCenter.success,
        allReferenciels: state.referencial.allReferencials.response,
        allSpecialities: state.specialite.allSpecialites.response,
    }
}
const mapDispatchToProps = dispatch => ({
    addCenter: payload => dispatch(addCenterActions.addCenterRequest(payload)),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})

Add.propTypes = {
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    addCenter: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    allReferenciels: PropTypes.object,
    allSpecialities: PropTypes.array,
    response: PropTypes.object,
    error: PropTypes.bool,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

Add.defaultProps = {
    allReferenciels: {},
    allSpecialities: [],
    response: null,
    error: false,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Add))
