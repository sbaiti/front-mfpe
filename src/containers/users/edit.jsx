import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import PropType from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
import ButtonComponent from '../../components/ui/button'
import Form from '../../components/ui/form'
import getAllUniteRegionalesActions from '../../redux/uniteRegionale/getAllUniteRegionales'
import editAgentActions from '../../redux/user/editAgent'
import getUserActions from '../../redux/user/getUser'
import alertActions from '../../redux/alert'
import getAllRolesActions from '../../redux/roles/getAllRoles'
import { getTranslatedAttribute } from '../../shared/utility'
import setPageTitleActions from '../../redux/pageTitle'

const EditAgent = ({
    getAllDrs,
    allDrs,
    allStructures,
    allFunctions,
    intl,
    language,
    history,
    editAgent,
    response,
    selectedAgent,
    match,
    getAgentById,
    setPageTitle,
    getAllRoles,
    allRoles,
}) => {
    useEffect(() => {
        setPageTitle('editAgent')
        getAllRoles()
        getAllDrs()
        getAgentById({ id: match.params.id })
    }, [])
    /**
     * generate list to populate select
     *
     * @param {*} data data to map
     * @param {string} [attribute='intitule'] attribute to show
     * @returns array of objects
     */
    const getList = (data, attribute = 'intitule') => {
        return (data || []).map(dr => ({
            label: dr[getTranslatedAttribute(language, attribute)],
            value: dr.id,
        }))
    }
    const [rolesList, setRolesList] = useState(null)

    const [drList, setDrList] = useState(null)
    const [errorsList, setErrorsList] = useState(null)
    const [disable, setDisable] = useState(false)
    const structures = getList(allStructures)
    const functions = getList(allFunctions)
    const [payload, setPayload] = useState({
        nom: '',
        prenom: '',
        identifiant: '',
        grade: '',
        premier_responsable: '',
        structure: {},
        fonction: {},
        tel: '',
        email: '',
        direction_regionale: {},
        roles: '',
    })

    /**
     * handle field changing
     *
     * @param {*} e event
     * @param {*} name field name
     */
    const fieldChangedHandler = (e, name) => {
        setPayload({ ...payload, [name]: e.target.value })
        setDisable(false)
    }

    /**
     *submit adding user
     *
     */
    const submit = () => {
        const newPayload = {
            ...payload,
            fonction: { id: payload.fonction },
            direction_regionale: { id: payload.direction_regionale },
            structure: { id: payload.structure },
            roles: payload.roles.map(id => ({ id })),
        }
        editAgent({ intl, payload: newPayload })
    }

    const formElments = [
        {
            name: 'nom',
            label: intl.formatMessage({ id: 'lastName' }),
            placeholder: intl.formatMessage({ id: 'lastName' }),
        },
        {
            name: 'prenom',
            label: intl.formatMessage({ id: 'firstName' }),
            placeholder: intl.formatMessage({ id: 'firstName' }),
        },
        {
            name: 'identifiant',
            label: intl.formatMessage({ id: 'identifiant' }),
            placeholder: intl.formatMessage({ id: 'identifiant' }),
        },
        {
            name: 'email',
            label: intl.formatMessage({ id: 'email' }),
            placeholder: intl.formatMessage({ id: 'email' }),
            type: 'email',
        },
        {
            name: 'tel',
            label: intl.formatMessage({ id: 'phone' }),
            placeholder: intl.formatMessage({ id: 'phone' }),
            type: 'tel',
        },
        {
            name: 'grade',
            label: intl.formatMessage({ id: 'grade' }),
            placeholder: intl.formatMessage({ id: 'grade' }),
        },
        {
            name: 'premier_responsable',
            label: intl.formatMessage({ id: 'firstResponsable' }),
            placeholder: intl.formatMessage({ id: 'firstResponsable' }),
        },
        {
            name: 'fonction',
            label: intl.formatMessage({ id: 'fonction' }),
            list: functions,
            type: 'select',
        },
        {
            name: 'structure',
            label: intl.formatMessage({ id: 'structure' }),
            list: structures,
            type: 'select',
        },
        {
            name: 'direction_regionale',
            label: intl.formatMessage({ id: 'directionRegionale' }),
            list: drList,
            type: 'select',
        },
        {
            name: 'roles',
            label: intl.formatMessage({ id: 'profiles' }),
            list: rolesList || [],
            type: 'multiSelect',
        },
    ]

    /**
     * handle getting all regional directions
     */

    useEffect(() => {
        setDrList(
            (allDrs || []).map(dr => ({
                label: dr[getTranslatedAttribute(language, 'titre')],
                value: dr.id,
            }))
        )
    }, [allDrs, language])

    /**
     * handle updating agent api response
     */
    useEffect(() => {
        const checkAgent = data => {
            if (!data) return
            if (data.code === 400) {
                const errors = {}
                try {
                    Object.keys(data.data).forEach(key => {
                        const item = data.data[key]
                        if (item) {
                            const errorText = item[language]
                            errors[key] = errorText
                        }
                    })
                } catch (e) {
                    console.log(e)
                }
                setErrorsList(errors)
                setDisable(true)
            } else {
                setErrorsList({})
                setDisable(false)
            }
        }
        if (response) checkAgent(response)
    }, [response, match, language, history])

    /**
     * handle getting agent for edit
     */
    useEffect(() => {
        setPayload({
            id: selectedAgent.id,
            nom: selectedAgent.nomFr,
            prenom: selectedAgent.prenomFr,
            identifiant: selectedAgent.identifiant,
            grade: selectedAgent.grade,
            premier_responsable: selectedAgent.premierResponsable,
            structure: (selectedAgent.structure || {}).id,
            fonction: (selectedAgent.fonction || {}).id,
            tel: selectedAgent.tel
                ? {
                      dialCode: (selectedAgent.tel.split(' ') || [])[0],
                      number: (selectedAgent.tel.split(' ') || [])[1],
                  }
                : { dialCode: '', number: '' },
            email: selectedAgent.email,
            direction_regionale: (selectedAgent.uniteRegionale || {}).id,
            roles: (selectedAgent.userRoles || []).map(r => r.id),
        })
    }, [selectedAgent])

    useEffect(() => {
        setRolesList(
            (allRoles || [])
                .filter(
                    r =>
                        ![
                            'ROLE_CYNAPSYS',
                            'ROLE_ADMIN',
                            'ROLE_SUPER_ADMIN',
                            'ROLE_CITOYEN',
                        ].includes(r.role)
                )
                .map(r => ({
                    label: r.role,
                    value: r.id,
                }))
        )
    }, [allRoles])

    return (
        <Fragment>
            <Form
                formElements={formElments}
                errorsList={errorsList || {}}
                payload={payload}
                fieldChangedHandler={fieldChangedHandler}
                language={language}
            />
            <div className="p-4 text-center">
                <ButtonComponent
                    disabled={disable}
                    color="secondary"
                    type="outlined"
                    label={<FormattedMessage id="cancel" />}
                    size="large"
                    clicked={() => {
                        history.goBack()
                    }}
                />
                <ButtonComponent
                    disabled={disable}
                    color="secondary"
                    type="contained"
                    size="large"
                    label={<FormattedMessage id="save" />}
                    clicked={submit}
                />
            </div>
        </Fragment>
    )
}

EditAgent.propTypes = {
    getAllDrs: PropType.func.isRequired,
    setPageTitle: PropType.func.isRequired,
    getAgentById: PropType.func.isRequired,
    editAgent: PropType.func.isRequired,
    intl: PropType.object.isRequired,
    history: PropType.object.isRequired,
    allDrs: PropType.array,
    response: PropType.object,
    selectedAgent: PropType.object,
    allStructures: PropType.array.isRequired,
    allFunctions: PropType.array.isRequired,
    language: PropType.string.isRequired,
    match: PropType.object,
    allRoles: PropType.array,
    getAllRoles: PropType.func.isRequired,
}
EditAgent.defaultProps = {
    allDrs: null,
    response: null,
    selectedAgent: null,
    match: { params: {} },
    allRoles: null,
}

const mapStateToProps = ({
    uniteRegionale,
    info,
    referencial,
    user,
    roles,
}) => {
    return {
        allRoles: roles.getAllRoles.response,
        allDrs: uniteRegionale.allUniteRegionales.response,
        response: user.editAgent.response,
        selectedAgent: user.user.response,
        allFunctions:
            referencial.allReferencials.response.referenciels.RefFonction,
        allStructures:
            referencial.allReferencials.response.referenciels.RefStructure,
        language: info.language,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getAllRoles: () => dispatch(getAllRolesActions.getAllRolesRequest()),
        getAllDrs: () =>
            dispatch(
                getAllUniteRegionalesActions.getAllUniteRegionalesRequest()
            ),
        editAgent: payload =>
            dispatch(editAgentActions.editAgentRequest(payload)),
        getAgentById: payload =>
            dispatch(getUserActions.getUserRequest(payload)),
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
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(EditAgent))
