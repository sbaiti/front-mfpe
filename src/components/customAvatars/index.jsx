import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { lightBlue } from '@material-ui/core/colors'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import { toUpper } from 'lodash'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        '& > * + *': {
            margin: 16,
        },
    },
    square: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#fff',
        backgroundColor: lightBlue[500],
        fontSize: '16px',
    },
})

/**
 * CustomAvatars
 * @param props
 * @returns {*}
 * @constructor
 */
function CustomAvatars(props) {
    const classes = useStyles()
    const { firstName, lastName } = props

    const getNameCombination = () => {
        const result = ` ${firstName.charAt([0])} ${lastName.charAt([0])}.`
        return toUpper(result)
    }

    return (
        <div className={classes.root}>
            <Avatar variant="square" className={classes.square}>
                {getNameCombination()}
            </Avatar>
        </div>
    )
}

/**
 * Avatars: Default Props
 * @type {{firstName: string, lastName: string}}
 */
CustomAvatars.defaultProps = {
    firstName: '',
    lastName: '',
}
/**
 *  Avatars: PropTypes
 * @type {{firstName: *, lastName: *}}
 */
CustomAvatars.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
}

export default CustomAvatars
