import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import PropType from 'prop-types'

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 250,
        height: 300,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}))

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1)
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1)
}

function union(a, b) {
    return [...a, ...not(b, a)]
}

const UsersTransferList = props => {
    const classes = useStyles()

    const {
        allUsers,
        getAllUsers,
        intl,
        onPayloadChange,
        isLoading,
        selectedUsers,
    } = props

    const [checked, setChecked] = React.useState([])
    const [left, setLeft] = React.useState([])
    const [right, setRight] = React.useState([])

    const leftChecked = intersection(checked, left)
    const rightChecked = intersection(checked, right)

    if ((!allUsers || !allUsers.length) && !isLoading) {
        getAllUsers('all-agents')
    }

    const formatList = listOfUsers =>
        listOfUsers.map(user => ({
            id: user.id,
            fullName: `${user.nomFr} ${user.prenomFr}`,
        }))

    useEffect(() => {
        const list = formatList(allUsers)
        setLeft(list)
    }, [allUsers])

    useEffect(() => {
        if (left && right) {
            const users = right.map(item => {
                return { id: item.id }
            })
            onPayloadChange({ users })
        }
    }, [right])

    useEffect(() => {
        const result = []
        let list = []
        let usersList = allUsers || []
        const ids = (selectedUsers || []).map(user => {
            return user.id
        })
        usersList.forEach(user => {
            if (ids.includes(user.id)) {
                result.push(user)
            }
        })
        usersList = usersList.filter(user => {
            return !ids.includes(user.id)
        })
        list = formatList(usersList)
        setLeft(list)
        list = formatList(result)
        setRight(list)
    }, [selectedUsers, allUsers])

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    const numberOfChecked = items => intersection(checked, items).length

    const handleToggleAll = items => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items))
        } else {
            setChecked(union(checked, items))
        }
    }
    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked))
        setLeft(not(left, leftChecked))
        setChecked(not(checked, leftChecked))
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked))
        setRight(not(right, rightChecked))
        setChecked(not(checked, rightChecked))
    }

    const customList = (title, items) => (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={
                            numberOfChecked(items) === items.length &&
                            items.length !== 0
                        }
                        indeterminate={
                            numberOfChecked(items) !== items.length &&
                            numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${
                    items.length
                } ${intl.formatMessage({ id: 'selected' })}`}
            />
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {items.map(value => {
                    const labelId = `transfer-list-all-item-${value}-label`

                    return (
                        <ListItem
                            key={value.id}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={value.fullName}
                            />
                        </ListItem>
                    )
                })}
                <ListItem />
            </List>
        </Card>
    )

    return (
        <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid item>
                {customList(intl.formatMessage({ id: 'choices' }), left)}
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                {customList(intl.formatMessage({ id: 'chosen' }), right)}
            </Grid>
        </Grid>
    )
}

UsersTransferList.propTypes = {
    getAllUsers: PropType.func.isRequired,
    onPayloadChange: PropType.func.isRequired,
    allUsers: PropType.array,
    intl: PropType.object.isRequired,
    isLoading: PropType.bool,
    selectedUsers: PropType.array,
}

UsersTransferList.defaultProps = {
    allUsers: [],
    isLoading: false,
    selectedUsers: [],
}

export default UsersTransferList
