/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}))

const InputText = props => {
    const {
        value,
        label,
        placeholder,
        type,
        onchange,
        isError,
        errorText,
        attributes,
        required,
        disabled,
        name,
        className,
    } = props
    const classes = useStyles()
    return (
        <FormControl className={className}>
            <label className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary">
                {label}
                {required && !attributes.disabled && (
                    <span className="text-danger"> * </span>
                )}
            </label>

            <TextField
                name={name}
                error={isError}
                className={`${classes.textField} mt-1 `}
                placeholder={placeholder}
                value={value}
                margin="normal"
                variant="outlined"
                inputProps={{ 'aria-label': 'bare' }}
                type={type === 'number' ? 'text' : type}
                helperText={isError && <span>{errorText}</span>}
                onChange={e => onchange(e)}
                onKeyPress={e => {
                    if (type === 'number') {
                        const charCode = e.which ? e.which : e.keyCode
                        if (charCode < 48 || charCode > 57) e.preventDefault()
                    }
                }}
                disabled={disabled}
                {...attributes}
            ></TextField>
        </FormControl>
    )
}

InputText.defaultProps = {
    value: '',
    label: '',
    placeholder: '',
    type: 'text',
    isError: false,
    required: true,
    disabled: false,
    errorText: '',
    attributes: {},
    className: 'col-12 col-lg-6',
    onchange: () => {},
}

InputText.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isError: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onchange: PropTypes.func,
    errorText: PropTypes.string,
    attributes: PropTypes.object,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
}
export default InputText
