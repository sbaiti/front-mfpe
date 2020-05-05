import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropType from 'prop-types'
import Paper from '@material-ui/core/Paper'
import InfoIcon from '@material-ui/icons/Info'
import Tooltip from '@material-ui/core/Tooltip'
import LinearProgress from '@material-ui/core/LinearProgress'
import Informations from './informations'
import ButtonComponent from '../../../components/ui/button'
import PermissionsList from '../permissionsList'
import UsersTransferList from './usersTransferList'
import { isEmpty } from '../../../shared/utility'
import addRolesActions from '../../../redux/roles/addRoles'
import getAllPermissionsActions from '../../../redux/roles/getAllPermissions'
import getRoleActions from '../../../redux/roles/getRole'
import getAllUsersActions from '../../../redux/user/getAllUsers'
import setPageTitleActions from '../../../redux/pageTitle'

const AddRoles = props => {
    const {
        history,
        intl,
        addRoles,
        language,
        allPermissions,
        isLoading,
        getAllPermissions,
        getRole,
        match,
        getAllUsers,
        allUsers,
        allDemandesStatut,
        setPageTitle,
    } = props
    const [disable, setDisable] = useState(true)
    const [payload, setPayload] = useState({})

    setPageTitle('addRole')

    const setPayloadData = data => {
        setPayload({ ...payload, ...data })
    }

    useEffect(() => {
        // eslint-disable-next-line camelcase
        const { role, intituleFr, intituleAr } = payload
        if (isEmpty(role) || isEmpty(intituleFr) || isEmpty(intituleAr)) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [payload])

    const submit = () => {
        console.log(payload)
        addRoles(payload)
    }

    return (
        <Fragment>
            {isLoading && <LinearProgress color="secondary" />}
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-4">
                        <Paper>
                            <Informations
                                onPayloadChange={setPayloadData}
                                language={language}
                                intl={intl}
                            />
                        </Paper>
                    </div>
                    <div className="col-md-8">
                        <Paper>
                            <PermissionsList
                                onPayloadChange={setPayloadData}
                                intl={intl}
                                allPermissions={allPermissions}
                                isLoading={isLoading}
                                getAllPermissions={getAllPermissions}
                                getRole={getRole}
                                match={match}
                                allDemandesStatut={allDemandesStatut}
                            />
                        </Paper>
                        <Paper className="my-3">
                            <div className="text-center">
                                <h3 className="row justify-content-md-center text-primary">
                                    {intl.formatMessage({ id: 'usersList' })}
                                    <Tooltip
                                        title={intl.formatMessage({
                                            id: 'usersListTooltip',
                                        })}
                                    >
                                        <InfoIcon className="mx-2" />
                                    </Tooltip>
                                </h3>
                            </div>
                            <UsersTransferList
                                onPayloadChange={setPayloadData}
                                getAllUsers={getAllUsers}
                                allUsers={allUsers}
                                intl={intl}
                                isLoading={isLoading}
                            />
                        </Paper>
                    </div>
                </div>
            </div>
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

AddRoles.propTypes = {
    intl: PropType.object.isRequired,
    history: PropType.object.isRequired,
    addRoles: PropType.func.isRequired,
    language: PropType.string.isRequired,
    allPermissions: PropType.array,
    isLoading: PropType.bool,
    getAllPermissions: PropType.func.isRequired,
    getRole: PropType.func.isRequired,
    match: PropType.object.isRequired,
    getAllUsers: PropType.func.isRequired,
    allUsers: PropType.array,
    allDemandesStatut: PropType.array.isRequired,
    setPageTitle: PropType.func.isRequired,
}

AddRoles.defaultProps = {
    allPermissions: [],
    isLoading: false,
    allUsers: [],
}

const mapStateToProps = ({ roles, info, user, referencial }) => {
    return {
        language: info.language,
        allPermissions: roles.getAllPermissions.response,
        isLoading:
            roles.getAllPermissions.loading ||
            roles.getRole.loading ||
            user.allUsers.loading,
        allUsers: user.allUsers.response,
        allDemandesStatut:
            referencial.allReferencials.response.referenciels.RefStatut,
    }
}

const mapDispatchToProps = dispatch => ({
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
    addRoles: payload => dispatch(addRolesActions.addRolesRequest(payload)),
    getAllPermissions: () =>
        dispatch(getAllPermissionsActions.getAllPermissionsRequest()),
    getRole: payload => dispatch(getRoleActions.getRoleRequest(payload)),
    getAllUsers: payload =>
        dispatch(getAllUsersActions.getAllUsersRequest(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(AddRoles))
