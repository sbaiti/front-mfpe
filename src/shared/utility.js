/* eslint-disable global-require */
import { replace } from 'lodash'

export function getRefParent(str) {
    const refCategories = {
        RefGouvernorat: '',
        RefDelegation: 'RefGouvernorat',
        RefNatureBesoinSpecifique: '',
        RefNiveauEtude: '',
        RefNationalite: '',
        RefDomaine: '',
        RefSecteur: 'RefDomaine',
        RefJustificatifExperience: '',
        RefDirectionRegionale: '',
        RefCentreFormation: '',
        RefSpecialiteCentreFormation: 'RefSecteur',
        RefDelais: '',
    }
    return refCategories[str] || ''
}
export function calcAge(dateString) {
    const birthday = +new Date(dateString)
    return (Date.now() - birthday) / 31557600000
}
export default function generateKey() {
    const uuid = require('uuid/v1')
    const id = uuid()
    return id
}
export function formatDate(date) {
    const d = new Date(date)
    let month = `${d.getMonth() + 1}`
    let day = `${d.getDate()}`
    const year = d.getFullYear()
    if (month.length < 2) month = `0${month}`
    if (day.length < 2) day = `0${day}`
    return [year, month, day].join('-')
}

export function displayDate(str, language = 'fr') {
    let result = ''
    try {
        result = str.split(' ')[0].split('-')

        result = language === 'fr' ? result.reverse() : result

        return result.join('/')
    } catch (error) {
        console.error(error)
        result = ''
    }
    return result
}

/**
 * displayDateTime
 *
 * @export
 * @param {*} str
 * @returns formatted date and time
 */
export function displayDateTime(str) {
    try {
        return displayDate(str) + str.split(' ')[1]
    } catch (error) {
        return ''
    }
}

export const errorMessageToReturn = err => {
    let errorMessage = `Code :  ${err.response.data.code.toString()}`
    if (Array.isArray(err.response.data.message)) {
        errorMessage = `${errorMessage} ${err.response.data.message
            .toString()
            .join()}`
    } else if (typeof err.response.data.message === 'object') {
        let errorMessageObject = ''
        Object.keys(err.response.data.message).forEach(key => {
            errorMessageObject = `${errorMessageObject}  ${key}  ${err.response.data.message[key]}`
        })
        errorMessage = `${errorMessage}  ${errorMessageObject}`
    } else {
        errorMessage = `${errorMessage}  ${err.response.data.message.toString()}`
    }

    return errorMessage
}
export function concatMessages(message, language) {
    try {
        // if (typeof message.data === 'object') {
        //     return Object.keys(message.data).map(key => {
        //         return ` ${message.data[key][language]} `
        //     })[0]
        // }
        if (typeof message.message === 'object') {
            return ` ${message.message[language]} `
        }

        return message.message
    } catch (error) {
        return message
    }
}

export function formatNotifBody(
    type,
    demandeId,
    centreName,
    drName,
    fullName,
    language = 'fr'
) {
    const notificationContent = require('../assets/data/notificationContent')
    let str = notificationContent[type]
    str = str[language]
        .replace('%demandeId', demandeId)
        .replace('%centreName', centreName)
        .replace('%drName', drName)
        .replace('%fullName', fullName)
    return str
}
// Validation
export const isEmpty = value =>
    value === undefined || value === null || value === ''

export function isValidEmail(value) {
    if (
        !isEmpty(value) &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ) {
        return false
    }
    return true
}
/**
 * Get Date
 * @param value
 * @returns {Date}
 */
export const getDate = value => {
    const pattern = /(\w{2})\/(\w*)\/(\w{4})/
    const val = replace(value, pattern, '$3-$2-$1')
    return new Date(val)
}

/**
 * gets attribute corresponding to language (intitule => [intituleAr || intituleFr])
 *
 * @param {string} [language='fr']
 * @param {string} [attribute='intitule']
 * @returns {string} translated attribute
 */
export const getTranslatedAttribute = (
    language = 'fr',
    attribute = 'intitule'
) => {
    return `${attribute}${language[0].toUpperCase()}r`
}

/**
 * gets month in text
 *
 * @param {string} [language='fr']
 * @param {string} month
 * @returns {string} month in text
 */
export const getMonthName = (language = 'fr', month) => {
    const monthNames = {
        ar: [
            'يناير',
            'فيفري',
            'مارس',
            'أفريل',
            'ماي',
            'جوان',
            'جويلية',
            'أوت',
            'سبتمبر',
            'أكتوبر',
            'نوفمبر',
            'ديسمبر',
        ],
        fr: [
            'janvier',
            'février',
            'mars',
            'avril',
            'mai',
            'juin',
            'juillet',
            'août',
            'septembre',
            'octobre',
            'novembre',
            'décembre',
        ],
    }
    return monthNames[language][month - 1]
}
