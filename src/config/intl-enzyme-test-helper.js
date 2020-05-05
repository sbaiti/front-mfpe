import React, { ReactElement } from 'react'
import IntlProvider from 'react-intl/dist/components/provider'
import { mount } from 'enzyme'

const defaultMessages = new Proxy({}, { get: (target, property) => property })
let messages = defaultMessages

export function loadTranslationObject(translations) {
    if (typeof translations === 'undefined') {
        messages = defaultMessages
        return defaultMessages
    }

    messages = translations
    return messages
}

// eslint-disable-next-line react/prop-types
const WrappingComponent: React.FC = ({ children }) => (
    <IntlProvider locale="en" messages={messages}>
        {children}
    </IntlProvider>
)

export const mountWithIntl = (node: ReactElement) =>
    mount(node, { wrappingComponent: WrappingComponent })
