/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import PropTypes from 'prop-types'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import frLocale from 'date-fns/locale/fr'
import arDZ from 'date-fns/locale/ar-DZ'
import format from 'date-fns/format'
import { FormControl } from '@material-ui/core'

class FrDateFnsUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, 'd MMMM', { locale: this.locale })
    }
}
class DateField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDate: props.defaultValue || '',
            error: '',
        }
    }

    formatDate = date => {
        const d = new Date(date)
        let month = `${d.getMonth() + 1}`
        let day = `${d.getDate()}`
        const year = d.getFullYear()
        if (month.length < 2) month = `0${month}`
        if (day.length < 2) day = `0${day}`
        return [year, month, day].join('-')
    }

    handleDateChange = date => {
        const { onchange, attributes } = this.props
        this.setState({ selectedDate: date })
        if (attributes.disableFuture && date > new Date()) {
            this.setState({ error: "la date choisie n'est pas valide" })
        }
        onchange({ target: { value: this.formatDate(date) } })
    }

    handleFocus = () => {
        const { selectedDate } = this.state
        const { onchange } = this.props
        const newDate =
            selectedDate && selectedDate.getDate() ? selectedDate : new Date()
        this.setState({ selectedDate: newDate })

        onchange({
            target: {
                value: this.formatDate(newDate),
            },
        })
    }

    render() {
        const {
            placeholder,
            label,
            isArabic,
            isError,
            attributes,
            required,
            className,
            errorText,
        } = this.props
        const { selectedDate, error } = this.state
        const border = {
            border: attributes.disabled
                ? '1px solid #b1b1b1'
                : isError
                ? '1px solid #f44336'
                : '1px solid rgb(73, 160, 174)',
        }
        return (
            <FormControl className={className}>
                <label className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary">
                    {label}
                    {required && !attributes.disabled && (
                        <span className="text-danger"> * </span>
                    )}
                </label>
                <MuiPickersUtilsProvider
                    utils={FrDateFnsUtils}
                    locale={isArabic ? arDZ : frLocale}
                >
                    <KeyboardDatePicker
                        onFocus={() => {
                            this.handleFocus()
                        }}
                        value={selectedDate}
                        onChange={this.handleDateChange}
                        className="pl-3 pr-3 mb-0 mt-1 ml-2 mr-2 "
                        style={{
                            height: '46px',
                            ...border,
                        }}
                        cancelLabel={isArabic ? 'الغاء' : 'Annuler'}
                        okLabel={isArabic ? 'موافق' : 'Ok'}
                        format={isArabic ? 'yyyy/MM/dd' : 'dd/MM/yyyy'}
                        margin="normal"
                        label={placeholder}
                        disableFuture={
                            attributes.disableFuture !== undefined
                                ? attributes.disableFuture
                                : true
                        }
                        {...attributes}
                        InputProps={{
                            disableUnderline: true,
                            margin: 'dense',
                        }}
                        helperText={
                            isError || error ? (
                                <div className="mt-1">{error || errorText}</div>
                            ) : (
                                ''
                            )
                        }
                    />
                </MuiPickersUtilsProvider>
            </FormControl>
        )
    }
}
DateField.defaultProps = {
    onchange: () => {},
    placeholder: ' ',
    defaultValue: new Date(),
    label: '',
    isError: false,
    required: true,
    isArabic: false,
    attributes: {},
    errorText: '',
    className: 'col-12 col-lg-6',
}
DateField.propTypes = {
    className: PropTypes.string,
    onchange: PropTypes.func,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.instanceOf(Date),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    isError: PropTypes.bool,
    required: PropTypes.bool,
    isArabic: PropTypes.bool,
    attributes: PropTypes.object,
    errorText: PropTypes.string,
}

export default DateField
