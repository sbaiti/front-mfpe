/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const ButtonComponent = props => {
    const { label, type, color, clicked, size, disabled } = props
    return (
        <Button
            variant={type}
            color={color}
            size={size}
            onClick={() => clicked()}
            disabled={disabled}
        >
            {label}
        </Button>
    )
}

ButtonComponent.defaultProps = {
    type: 'text',
    label: '',
    color: 'primary',
    size: 'medium',
    disabled: false,
}

ButtonComponent.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    label: PropTypes.element,
    disabled: PropTypes.bool,
    clicked: PropTypes.func.isRequired,
}
export default ButtonComponent
