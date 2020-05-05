/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import MuiPhoneNumber from 'material-ui-phone-number'
import { trim, size, toInteger, toString, isNil } from 'lodash'

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: 0,
    },
}))

const validatePhoneNumber = phoneNumber => {
    /**
     * Clean The Input Type
     * @param number
     * @returns {string}
     */
    const toInt = number => {
        const num = toInteger(number.replace(/ /g, ''))
        return toString(num)
    }

    /**
     * Valid the number max size
     * @param number
     * @param max
     * @param min
     * @returns {boolean}
     * @private
     */
    const validNumber = (number, max, min = 6) => {
        const num = toInt(number)
        const length = size(trim(num))
        if (length <= max && length >= min) {
            return true
        }
        return false
    }

    return (
        validNumber(phoneNumber.dialCode, 3, 1) &&
        validNumber(phoneNumber.number, 12)
    )
}

const InputTel = props => {
    const {
        value,
        label,
        onchange,
        isError,
        errorText,
        required,
        variant,
        className,
    } = props
    const [valid, setValid] = React.useState(true)
    const classes = useStyles()

    return (
        <FormControl className={className}>
            <label className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary">
                {label}
                {required && <span className="text-danger"> * </span>}
            </label>
            <FormControl
                style={{ direction: 'ltr' }}
                className="mt-1 pt-0 pb-0 "
            >
                <MuiPhoneNumber
                    autoFormat
                    preferredCountries={['tn', 'dz', 'ly', 'fr']}
                    error={isError || !valid}
                    className={classes.textField}
                    value={value}
                    margin="normal"
                    variant={variant}
                    inputProps={{ 'aria-label': 'bare' }}
                    helperText={isError && <span>{errorText}</span>}
                    defaultCountry="tn"
                    onChange={(e, d) => {
                        let number =
                            e.charAt(0) === '+' || e.charAt(0) === '0'
                                ? e.replace(/ /g, '').split(d.dialCode)[1]
                                : e
                        if (!isNil(number)) {
                            number = number.replace(/ /g, '')
                            const phoneNumber = { number, ...d }
                            const validNumber = validatePhoneNumber(phoneNumber)
                            setValid(validNumber)
                            onchange(phoneNumber, validNumber)
                        }
                    }}
                />
            </FormControl>
        </FormControl>
    )
}

InputTel.defaultProps = {
    value: '',
    label: '',
    isError: false,
    required: true,
    errorText: '',
    variant: 'outlined',
    className: 'col-12 col-lg-6',
    onchange: () => {},
}

InputTel.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    isError: PropTypes.bool,
    required: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onchange: PropTypes.func,
    errorText: PropTypes.string,
    variant: PropTypes.string,
}
export default InputTel
