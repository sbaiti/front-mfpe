import DateFnsUtils from '@date-io/date-fns'
import format from 'date-fns/format'

// eslint-disable-next-line no-unused-vars
class FrDateFnsUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, 'dd MMMM', { locale: this.locale })
    }
}
export default FrDateFnsUtils
