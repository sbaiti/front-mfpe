import arTranslationMessages from '../translations/ar.json'
import frTranslationMessages from '../translations/fr.json'

const DEFAULT_LOCALE = 'ar'

if (!Intl.PluralRules) {
    import('@formatjs/intl-pluralrules/polyfill')
    import('@formatjs/intl-pluralrules/dist/locale-data/ar') // Add locale data for ar
    import('@formatjs/intl-pluralrules/dist/locale-data/fr') // Add locale data for fr
}
export const appLocales = ['fr', 'ar']

export const formatTranslationMessages = (locale, messages) => {
    const defaultFormattedMessages =
        locale !== DEFAULT_LOCALE
            ? formatTranslationMessages(DEFAULT_LOCALE, frTranslationMessages)
            : {}
    return Object.keys(messages).reduce((formattedMessages, key) => {
        const formattedMessage =
            !messages[key] && locale !== DEFAULT_LOCALE
                ? defaultFormattedMessages[key]
                : messages[key]
        return Object.assign(formattedMessages, { [key]: formattedMessage })
    }, {})
}

export default {
    ar: formatTranslationMessages('ar', arTranslationMessages),
    fr: formatTranslationMessages('fr', frTranslationMessages),
}
