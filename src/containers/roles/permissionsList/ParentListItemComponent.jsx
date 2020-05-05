import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import React from 'react'
import PropType from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import Icons from '../../../components/icons'

const ParentListItemComponent = ({
    onClick,
    item,
    intl,
    itemId,
    onChange,
    codeState,
    disabled,
}) => {
    return (
        <ListItem button onClick={onClick}>
            <ListItemIcon>
                <Icons name={item.code} />
            </ListItemIcon>
            <ListItemText
                primary={intl.formatMessage({
                    id: item.code,
                })}
            />
            {!item.subitems.length && item.code !== 'demands' ? (
                <Checkbox
                    edge="end"
                    onChange={onChange}
                    checked={codeState.indexOf(item.code) !== -1}
                    disabled={disabled}
                    inputProps={{
                        'aria-labelledby': item.id,
                    }}
                />
            ) : itemId === item.id ? (
                <ExpandLess />
            ) : (
                <ExpandMore />
            )}
        </ListItem>
    )
}
ParentListItemComponent.propTypes = {
    onClick: PropType.func.isRequired,
    item: PropType.object.isRequired,
    intl: PropType.object.isRequired,
    itemId: PropType.number,
    onChange: PropType.func.isRequired,
    codeState: PropType.array.isRequired,
    disabled: PropType.bool.isRequired,
}
ParentListItemComponent.defaultProps = {
    itemId: null,
}
export default ParentListItemComponent
