import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import PropType from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'

const ListItemComponent = ({ i, intl, onChange, codeState, disabled }) => {
    return (
        <ListItem dense alignItems="flex" button>
            <ListItemText
                id={i.id}
                primary={intl.formatMessage({
                    id: i.code,
                })}
            />
            <Checkbox
                edge="end"
                onChange={onChange}
                checked={codeState.indexOf(i.code) !== -1}
                disabled={disabled}
                inputProps={{
                    'aria-labelledby': i.id,
                }}
            />
        </ListItem>
    )
}
ListItemComponent.propTypes = {
    i: PropType.object.isRequired,
    intl: PropType.object.isRequired,
    onChange: PropType.func.isRequired,
    codeState: PropType.array.isRequired,
    disabled: PropType.bool.isRequired,
}

export default ListItemComponent
