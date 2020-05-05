import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropType from 'prop-types'
import { injectIntl } from 'react-intl'
import MuiTable from '../../components/ui/table'
import getAllUsersActions from '../../redux/user/getAllUsers'
import deleteAgentActions from '../../redux/user/deleteAgent'
import { getTranslatedAttribute } from '../../shared/utility'
import setPageTitleActions from '../../redux/pageTitle'
import alertActions from '../../redux/alert'

const UsersList = props => {
    const {
        getAllUsers,
        allUsers,
        intl,
        language,
        history,
        setPageTitle,
        alertShow,
        deleteAgent,
    } = props

    const [usersList, setUsersList] = useState(null)

    useEffect(() => {
        setPageTitle('agentsList')
        getAllUsers('all-agents')
    }, [])

    const renderOtherActions = () => [
        rowData => ({
            icon: 'remove_red_eye',
            tooltip: intl.formatMessage({ id: 'details' }),
            onClick: () => {
                const selectedUser = allUsers.find(
                    user => user.id === rowData.id
                )
                history.push(`/gestion-accees/agents/details/${rowData.id}`, {
                    user: selectedUser,
                })
            },
        }),
    ]
    useEffect(() => {
        const getList = data => {
            return data.map(user => ({
                ...user,
                roles: user.userRoles
                    .map(role => role[getTranslatedAttribute(language)])
                    .join(' | '),
                fullName: `${user.nomFr} ${user.prenomFr}`,
                dr:
                    (user.uniteRegionale || {})[
                        getTranslatedAttribute(language, 'titre')
                    ] || 'non défini',
                structure: (user.structure || {})[
                    getTranslatedAttribute(language)
                ],
                fonction: (user.fonction || {})[
                    getTranslatedAttribute(language)
                ],
                grade: user.grade,
                identifiant: user.identifiant,
                firstResponsible: user.firstResponsible,
            }))
        }
        const list = getList(allUsers)
        setUsersList(list)
    }, [allUsers, language, intl])

    const columns = [
        {
            field: 'identifiant',
            title: intl.formatMessage({ id: 'identifiant' }),
        },
        {
            field: 'fullName',
            title: intl.formatMessage({ id: 'first&lastName' }),
        },
        { field: 'roles', title: intl.formatMessage({ id: 'profiles' }) },
        {
            field: 'dr',
            title: intl.formatMessage({ id: 'directionRegionale' }),
        },
        { field: 'structure', title: intl.formatMessage({ id: 'structure' }) },
        { field: 'fonction', title: intl.formatMessage({ id: 'fonction' }) },
        { field: 'grade', title: intl.formatMessage({ id: 'grade' }) },
    ]

    const removeAgent = id => {
        alertShow(true, {
            onConfirm: () => {
                deleteAgent({ intl, id })
            },
            warning: true,
            info: false,
            error: false,
            success: false,
            message:
                language === 'ar'
                    ? 'هل أنت متأكد أنك تريد حذف هذا الموضف ؟'
                    : 'voulez-vous vraiment supprimer cet agent ?',
            title: language === 'ar' ? 'تحقق' : 'Confirmation',
        })
    }
    return (
        <MuiTable
            list={usersList || []}
            columns={columns}
            isLoading={usersList === null}
            details={null}
            edit={id => {
                history.push(`/gestion-accees/agents/modifier/${id}`)
            }}
            remove={id => removeAgent(id)}
            otherActions={renderOtherActions()}
            language={language}
            add={() => {
                history.push('/gestion-accees/agents/ajouter')
            }}
        />
    )
}

UsersList.propTypes = {
    getAllUsers: PropType.func.isRequired,
    setPageTitle: PropType.func.isRequired,
    deleteAgent: PropType.func.isRequired,
    alertShow: PropType.func.isRequired,
    intl: PropType.object.isRequired,
    history: PropType.object.isRequired,
    allUsers: PropType.array,
    language: PropType.string.isRequired,
}
UsersList.defaultProps = {
    allUsers: [],
}

const mapStateToProps = ({ user, info }) => {
    return {
        allUsers: user.allUsers.response,
        language: info.language,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: payload =>
            dispatch(getAllUsersActions.getAllUsersRequest(payload)),
        deleteAgent: payload =>
            dispatch(deleteAgentActions.deleteAgentRequest(payload)),
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
)(injectIntl(UsersList))
