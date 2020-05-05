/**
 * Format Phone Number
 * @param phone
 * @returns {string}
 */
const formatPhoneNumber = phone => {
    return `+(${phone.dialCode}) ${phone.number}`
}

export default formatPhoneNumber
