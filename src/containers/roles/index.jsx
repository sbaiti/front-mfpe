import PropType from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import React, { useEffect, useState } from 'react'
import getAllRolesActions from '../../redux/roles/getAllRoles'
import getAllPermissionsActions from '../../redux/roles/getAllPermissions'
import MuiTable from '../../components/ui/table'
import alertActions from '../../redux/alert'
import deleteRolesActions from '../../redux/roles/deleteRoles'
import setPageTitleActions from '../../redux/pageTitle'

const RolesList = props => {
    const {
        intl,
        language,
        allRoles,
        isLoading,
        history,
        getAllRoles,
        getAllPermissions,
        allPermissions,
        alertShow,
        deleteRole,
        setPageTitle,
    } = props
    const [rolesList, setRolesList] = useState(null)
    const [permissionsList, setPermissionsList] = useState(null)
    useEffect(() => {
        setPageTitle('rolesManagement')
        getAllRoles()
        getAllPermissions()
    }, [])

    const columns = [
        {
            field: 'identifiant',
            title: intl.formatMessage({ id: 'identifiant' }),
        },
        {
            field: 'name',
            title: intl.formatMessage({ id: 'roleName' }),
        },
        {
            field: 'nbUsersAffected',
            title: intl.formatMessage({ id: 'nbUsersAffected' }),
            type: 'numeric',
        },
    ]

    const getList = data => {
        try {
            return (data || []).map(item => ({
                id: item.id,
                name: language === 'fr' ? item.intituleFr : item.intituleAr,
                identifiant: item.role,
                nbUsersAffected: item.users.length,
                users: item.users,
                noEdit: item.editable,
            }))
        } catch (e) {
            console.error(e)
            return []
        }
    }

    const getPermissionsList = data => {
        try {
            const result = []
            // eslint-disable-next-line array-callback-return
            data.map(item => {
                if (!item.parent) {
                    result[item.id] = {
                        id: item.id,
                        code: item.code,
                        subitems: [],
                    }
                } else {
                    result[item.parent.id].subitems.push({
                        id: item.id,
                        code: item.code,
                    })
                }
            })
            return result
        } catch (e) {
            console.error(e)
            return []
        }
    }

    const selectedRole = (id, listOfRoles) => {
        return listOfRoles.find(role => role.id === id)
    }

    const renderOtherActions = () => [
        rowData => ({
            icon: 'remove_red_eye',
            tooltip: intl.formatMessage({ id: 'details' }),
            onClick: () => {
                history.push(`/gestion-roles/details/${rowData.id}`, {
                    roleDetails: selectedRole(rowData.id, rolesList),
                    permissionsList,
                })
            },
        }),
    ]

    useEffect(() => {
        const list = getList(allRoles)
        setRolesList(list)
    }, [allRoles])

    useEffect(() => {
        if (allPermissions) {
            const list = getPermissionsList(allPermissions)
            setPermissionsList(list)
        }
    }, [allPermissions])

    const removeRole = id => {
        alertShow(true, {
            onConfirm: () => {
                deleteRole({ intl, id })
            },
            warning: true,
            info: false,
            error: false,
            success: false,
            message:
                language === 'ar'
                    ? 'هل أنت متأكد أنك تريد حذف هذا الدور ؟'
                    : 'voulez-vous vraiment supprimer cet role ?',
            title: language === 'ar' ? 'تحقق' : 'Confirmation',
        })
    }

    return (
        <MuiTable
            list={rolesList || []}
            columns={columns}
            isLoading={isLoading}
            details={null}
            edit={id => {
                history.push(`/gestion-roles/edit/${id}`, {
                    roleDetails: selectedRole(id, allRoles),
                    permissionsList,
                })
            }}
            remove={id => removeRole(id)}
            language={language}
            otherActions={renderOtherActions()}
            add={() => {
                history.push('/gestion-roles/add')
            }}
        />
    )
}

RolesList.propTypes = {
    intl: PropType.object.isRequired,
    language: PropType.string.isRequired,
    allRoles: PropType.array,
    allPermissions: PropType.array,
    isLoading: PropType.bool,
    history: PropType.object.isRequired,
    getAllRoles: PropType.func.isRequired,
    getAllPermissions: PropType.func.isRequired,
    alertShow: PropType.func.isRequired,
    deleteRole: PropType.func.isRequired,
    setPageTitle: PropType.func.isRequired,
}

RolesList.defaultProps = {
    allRoles: [],
    allPermissions: [],
    isLoading: false,
}

const mapStateToProps = ({ roles, info }) => {
    return {
        allRoles: roles.getAllRoles.response,
        allPermissions: roles.getAllPermissions.response,
        language: info.language,
        isLoading: roles.getAllRoles.loading || roles.getAllPermissions.loading,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setPageTitle: payload =>
            dispatch(setPageTitleActions.setPageTitleRequest(payload)),
        getAllRoles: () => dispatch(getAllRolesActions.getAllRolesRequest()),
        getAllPermissions: () =>
            dispatch(getAllPermissionsActions.getAllPermissionsRequest()),
        deleteRole: payload =>
            dispatch(deleteRolesActions.deleteRolesRequest(payload)),
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
)(injectIntl(RolesList))
