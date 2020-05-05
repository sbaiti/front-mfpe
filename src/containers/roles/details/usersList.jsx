import Paper from '@material-ui/core/Paper'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import PropType from 'prop-types'
import generateKey from '../../../shared/utility'

const UsersList = props => {
    const { data, getRole, roles, isLoading, history, intl } = props
    const [expanded, setExpanded] = useState(true)
    const [informations, setInformations] = useState(null)
    const [usersList, setUsersList] = useState(null)

    useEffect(() => {
        setInformations(data || roles)
    }, [roles])

    useEffect(() => {
        let result = []
        if (((informations || {}).users || {}).length) {
            informations.users.map((item, index) => {
                // eslint-disable-next-line no-return-assign
                return (result[index] = { ...item })
            })
        } else {
            result = []
        }
        setUsersList(result)
        // setUsersList(informations )
    }, [informations])

    if (!informations && !data && !isLoading) {
        const {
            match: { params },
        } = props
        getRole(params.id)
    }

    const toggleExpansionPanel = () => {
        setExpanded(!expanded)
    }

    const getFullName = item => {
        return `${item.prenomFr} ${item.nomFr}`
    }

    return (
        <Paper>
            <ExpansionPanel expanded={expanded} onChange={toggleExpansionPanel}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <h5>{intl.formatMessage({ id: 'usersList' })}</h5>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ padding: '0' }}>
                    <div
                        className="d-block overflow-auto"
                        style={{ maxHeight: 150, width: '100%' }}
                    >
                        {usersList &&
                            usersList.map(item => {
                                return (
                                    <ListItem
                                        button
                                        key={generateKey()}
                                        onClick={() =>
                                            history.push(
                                                `/gestion-accees/agents/details/${item.id}`
                                            )
                                        }
                                    >
                                        <ListItemText
                                            key={item.id}
                                            primary={getFullName(item)}
                                            secondary={item.email}
                                        ></ListItemText>
                                    </ListItem>
                                )
                            })}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Paper>
    )
}

UsersList.propTypes = {
    data: PropType.oneOfType([PropType.array, PropType.object]),
    roles: PropType.object,
    isLoading: PropType.bool,
    match: PropType.object.isRequired,
    getRole: PropType.func.isRequired,
    history: PropType.object.isRequired,
    intl: PropType.object.isRequired,
}

UsersList.defaultProps = {
    data: null,
    roles: null,
    isLoading: false,
}

export default UsersList
