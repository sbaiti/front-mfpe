import { isDate } from 'lodash'

function editable(currentFieldName, role) {
    if (role === 'ROLE_CITOYEN' || role === 'ROLE_SUPER_ADMIN') {
        return [
            'email',
            'dateDelivranceCin',
            'dateDelivrancePassport',
            'tel',
        ].includes(currentFieldName)
    }
    return false
}

/**
 * Date Naissance Validator
 * @param value
 * @returns {boolean}
 */
function dateValidator(value) {
    // eslint-disable-next-line no-useless-escape
    const pattern = /(\d{2})\-(\d*)-(\d{4})/
    const val = value.replace(pattern, '$3-$2-$1')
    const date = new Date(val)
    const dateNow = new Date()
    if (!isDate(date) || dateNow.getTime() < date.getTime()) {
        return false
    }
    return true
}
/**
 * Format Date
 *
 * @param{string} date
 * @memberof Index
 */
function formatDate(date) {
    if (!date) return null
    try {
        const currentDatetime = new Date(date)
        return `${currentDatetime.getDate()}-${currentDatetime.getMonth() +
            1}-${currentDatetime.getFullYear()}`
    } catch (e) {
        console.error(e)
        return null
    }
}

/**
 * Email Validator
 * @param email
 * @returns {boolean}
 */
function emailValidator(email) {
    // eslint-disable-next-line no-useless-escape
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(String(email).toLowerCase())
}

export { editable, dateValidator, formatDate, emailValidator }
