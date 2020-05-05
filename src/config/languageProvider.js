import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

class LanguageProvider extends React.PureComponent {
    render() {
        const { language, messages, children } = this.props
        return (
            <IntlProvider
                locale={language}
                key={language}
                messages={messages[language]}
            >
                {React.Children.only(children)}
            </IntlProvider>
        )
    }
}

LanguageProvider.propTypes = {
    language: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        ar: PropTypes.object,
        fr: PropTypes.object,
    }).isRequired,
    children: PropTypes.element.isRequired,
}

const mapStateToProps = state => ({
    language: state.info.language,
})
export default connect(
    mapStateToProps,
    null
)(LanguageProvider)
