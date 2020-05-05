import Paper from '@material-ui/core/Paper'
import React, { Fragment, useEffect, useState } from 'react'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import ListSubheader from '@material-ui/core/ListSubheader'
import PropType from 'prop-types'
import ParentListItemComponent from './ParentListItemComponent'
import ListItemComponent from './listItemComponent'

/**
 * @param props
 * @returns {*}
 * @constructor
 */
const PermissionsList = props => {
    const {
        intl,
        getAllPermissions,
        allPermissions,
        isLoading,
        data,
        getRole,
        selectedPermissions,
        selectedDemandsStatus,
        onPayloadChange,
        disabledCheckbox,
        allDemandesStatut,
    } = props

    const [itemId, setItemId] = useState(null)
    const [codeState, setCodeState] = useState([])
    const [permissionsList, setPermissionsList] = useState(null)
    const [demandsCodeStatus, setDemandsCodeStatus] = useState([])

    if (!permissionsList && !data && !isLoading) {
        getAllPermissions()
    }

    if (!selectedPermissions && !isLoading && disabledCheckbox) {
        const {
            match: { params },
        } = props
        getRole(params.id)
    }

    const handleCollapse = id => {
        if (itemId !== id) {
            setItemId(id)
        } else {
            setItemId(null)
        }
    }

    const handleCheckbox = item => {
        const { code } = item

        const result = []

        if (codeState.includes(code)) {
            const array = codeState
            array.splice(array.indexOf(code), 1)
            result.push(...array)
            // setCodeState([...array])
        } else {
            // setCodeState([...codeState, code])
            result.push(...codeState, code)
        }

        if (item.parent && !codeState.includes(item.parent)) {
            result.push(item.parent)
        }

        setCodeState([...result])
    }

    const onChangeDemandsStatus = code => {
        if (demandsCodeStatus.includes(code)) {
            const array = demandsCodeStatus
            array.splice(array.indexOf(code), 1)
            setDemandsCodeStatus([...array])
        } else {
            setDemandsCodeStatus([...demandsCodeStatus, code])
        }
    }

    const getPermissionsList = dataPermissions => {
        try {
            const result = []
            // eslint-disable-next-line no-unused-expressions
            dataPermissions &&
                // eslint-disable-next-line array-callback-return
                dataPermissions.map(item => {
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
                            selected: (selectedPermissions || []).includes(
                                item.code
                            ),
                            parent: item.parent.code,
                        })
                    }
                })
            return result
        } catch (e) {
            console.error(e)
            return []
        }
    }

    useEffect(() => {
        const list = getPermissionsList(allPermissions)
        setPermissionsList(data || list)
    }, [allPermissions])

    useEffect(() => {
        if (onPayloadChange) {
            onPayloadChange({ frontInterfaces: codeState })
        }
    }, [codeState])

    useEffect(() => {
        if (onPayloadChange) {
            onPayloadChange({
                stateExecute: demandsCodeStatus,
                status: demandsCodeStatus,
            })
        }
    }, [demandsCodeStatus])

    useEffect(() => {
        if (selectedPermissions && selectedPermissions.length) {
            setCodeState([...selectedPermissions])
        }
    }, [selectedPermissions])

    useEffect(() => {
        if (selectedDemandsStatus && selectedDemandsStatus.length) {
            setDemandsCodeStatus([...selectedDemandsStatus])
        }
    }, [selectedDemandsStatus])

    return (
        <Paper>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        disableSticky
                    >
                        {intl.formatMessage({ id: 'permissionsList' })}
                    </ListSubheader>
                }
            >
                {permissionsList &&
                    permissionsList.map(item => {
                        return (
                            <Fragment key={`key-${item.id}`}>
                                <ParentListItemComponent
                                    key={item.id}
                                    onClick={() => handleCollapse(item.id)}
                                    item={item}
                                    intl={intl}
                                    itemId={itemId}
                                    onChange={() => handleCheckbox(item)}
                                    codeState={codeState}
                                    disabled={disabledCheckbox}
                                />
                                <Collapse
                                    in={item.id === itemId}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List component="div" disablePadding>
                                        {item.subitems.length > 0 &&
                                            item.subitems.map(i => {
                                                return (
                                                    <ListItemComponent
                                                        key={i.id}
                                                        i={i}
                                                        intl={intl}
                                                        onChange={() =>
                                                            handleCheckbox(i)
                                                        }
                                                        codeState={codeState}
                                                        disabled={
                                                            disabledCheckbox
                                                        }
                                                    />
                                                )
                                            })}

                                        {item.code === 'demands' &&
                                            allDemandesStatut.map(d => {
                                                return (
                                                    <ListItemComponent
                                                        key={d.id}
                                                        i={d}
                                                        intl={intl}
                                                        onChange={() =>
                                                            onChangeDemandsStatus(
                                                                d.code
                                                            )
                                                        }
                                                        codeState={
                                                            demandsCodeStatus
                                                        }
                                                        disabled={
                                                            disabledCheckbox
                                                        }
                                                    />
                                                )
                                            })}
                                    </List>
                                </Collapse>
                            </Fragment>
                        )
                    })}
            </List>
        </Paper>
    )
}

PermissionsList.propTypes = {
    intl: PropType.object.isRequired,
    allPermissions: PropType.array,
    selectedPermissions: PropType.array,
    selectedDemandsStatus: PropType.array,
    data: PropType.oneOfType([PropType.array, PropType.object]),
    isLoading: PropType.bool,
    getAllPermissions: PropType.func.isRequired,
    getRole: PropType.func.isRequired,
    match: PropType.object.isRequired,
    onPayloadChange: PropType.func,
    disabledCheckbox: PropType.bool,
    allDemandesStatut: PropType.array.isRequired,
}

PermissionsList.defaultProps = {
    allPermissions: [],
    selectedPermissions: null,
    selectedDemandsStatus: null,
    isLoading: false,
    data: null,
    onPayloadChange: null,
    disabledCheckbox: false,
}

export default PermissionsList
