import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import arDZ from 'date-fns/locale/ar-DZ'
import frLocale from 'date-fns/locale/fr'
import FrDateFnsUtils from './frDateFnsUtils'

// eslint-disable-next-line no-unused-vars
class DatePickerField extends React.Component {
    static propTypes = {
        isArabic: PropTypes.bool.isRequired,
        date: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedDate: props.date
                .split('/')
                .reverse()
                .join('-'),
        }
    }

    render() {
        const { isArabic, onChange } = this.props
        const { selectedDate } = this.state
        return (
            <MuiPickersUtilsProvider
                utils={FrDateFnsUtils}
                locale={isArabic ? arDZ : frLocale}
                style={{ ActionOpacity: 1 }}
            >
                <DatePicker
                    format=" dd MMMM yyyy "
                    cancelLabel={isArabic ? 'الغاء' : 'Annuler'}
                    okLabel={isArabic ? 'موافق' : 'Ok'}
                    views={['year', 'month', 'date']}
                    openTo="year"
                    value={selectedDate}
                    onChange={e => {
                        this.setState({ selectedDate: e })
                        onChange(e)
                    }}
                    disableFuture
                    IProps={{
                        'aria-label': 'description',
                    }}
                />
            </MuiPickersUtilsProvider>
        )
    }
}
export default DatePickerField
