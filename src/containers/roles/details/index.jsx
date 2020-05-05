import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import React, { useEffect } from 'react'
import PropType from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import UsersList from './usersList'
import PermissionsList from '../permissionsList'
import Informations from './informations'
import getRoleActions from '../../../redux/roles/getRole'
import getAllPermissionsActions from '../../../redux/roles/getAllPermissions'
import setPageTitleActions from '../../../redux/pageTitle'

const Index = props => {
    const {
        history,
        roles,
        language,
        isLoading,
        getRole,
        intl,
        match,
        allPermissions,
        selectedPermissions,
        selectedDemandsStatus,
        getAllPermissions,
        allDemandesStatut,
        setPageTitle,
        editable,
    } = props

    setPageTitle('detailRole')

    useEffect(() => {
        const {
            match: { params },
        } = props

        if (params.id) {
            getRole(params.id)
        }
    }, [match.params.id])

    return (
        <div className="container-fluid">
            {isLoading && <LinearProgress color="secondary" />}
            <div className="row">
                <div className="col-md-7 col-sm-12 my-3">
                    <PermissionsList
                        data={(history.location.state || {}).permissionsList}
                        intl={intl}
                        match={match}
                        allPermissions={allPermissions}
                        selectedPermissions={selectedPermissions}
                        selectedDemandsStatus={selectedDemandsStatus}
                        isLoading={isLoading}
                        getAllPermissions={getAllPermissions}
                        getRole={getRole}
                        allDemandesStatut={allDemandesStatut}
                        disabledCheckbox
                    />
                </div>
                <div className="col-md-5 col-sm-12 my-3">
                    <div className="my-3">
                        <Informations
                            data={(history.location.state || {}).roleDetails}
                            roles={roles}
                            language={language}
                            isLoading={isLoading}
                            getRole={getRole}
                            intl={intl}
                            match={match}
                        />
                    </div>
                    {((roles || {}).users || []).length > 0 && (
                        <div className="my-3">
                            <UsersList
                                data={
                                    (history.location.state || {}).roleDetails
                                }
                                getRole={getRole}
                                isLoading={isLoading}
                                roles={roles}
                                intl={intl}
                                match={match}
                                history={history}
                            />
                        </div>
                    )}
                    {editable && (
                        <div className="my-3 text-right">
                            <Fab
                                color="secondary"
                                aria-label="add"
                                href={`/gestion-roles/edit/${match.params.id}`}
                            >
                                <EditIcon />
                            </Fab>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

Index.propTypes = {
    history: PropType.object.isRequired,
    getRole: PropType.func.isRequired,
    roles: PropType.object,
    language: PropType.string.isRequired,
    isLoading: PropType.bool,
    intl: PropType.object.isRequired,
    match: PropType.object.isRequired,
    allPermissions: PropType.array,
    selectedPermissions: PropType.array,
    selectedDemandsStatus: PropType.array,
    getAllPermissions: PropType.func.isRequired,
    allDemandesStatut: PropType.array.isRequired,
    setPageTitle: PropType.func.isRequired,
    editable: PropType.bool,
}

Index.defaultProps = {
    roles: null,
    isLoading: null,
    allPermissions: [],
    selectedPermissions: null,
    selectedDemandsStatus: null,
    editable: false,
}

const mapStateToProps = ({ roles, info, referencial }) => {
    return {
        roles: roles.getRole.response,
        language: info.language,
        isLoading:
            roles.getAllRoles.loading ||
            roles.getRole.loading ||
            roles.getAllPermissions.loading,
        allPermissions: roles.getAllPermissions.response,
        selectedPermissions: (roles.getRole.response || {}).frontInterfaces,
        selectedDemandsStatus: (roles.getRole.response || {}).stateExecute,
        allDemandesStatut:
            referencial.allReferencials.response.referenciels.RefStatut,
        editable: (roles.getRole.response || {}).editable,
    }
}
const mapDispatchToProps = dispatch => ({
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
    getRole: payload => dispatch(getRoleActions.getRoleRequest(payload)),
    getAllPermissions: () =>
        dispatch(getAllPermissionsActions.getAllPermissionsRequest()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
