import * as React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import Index from '../alertSnackbar'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { error: null, errorInfo: null }
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error,
            errorInfo,
        })
        // You can also log error messages to an error reporting service here
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const { error, errorInfo } = this.state
        const { children, intl } = this.props
        if (error || errorInfo) {
            // Error path
            return (
                <Index
                    body={intl.formatMessage({
                        id: 'WRONG_ALERT',
                    })}
                    handleAlert
                    autoBack
                    autoHideDuration={3000}
                />

                /* <div>
                  <AlertSnackbar body="Something went wrong !"/>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {error && error.toString()}
                        <br />
                        {errorInfo.componentStack}
                    </details>
                </div> */
            )
        }
        // Normally, just render children
        return children
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.element.isRequired,
    intl: PropTypes.object.isRequired,
}

export default injectIntl(ErrorBoundary)
