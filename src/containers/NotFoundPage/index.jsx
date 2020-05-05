import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Home from '@material-ui/icons/Home'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router'
import { compose } from 'redux'

class NotFound extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    goBack = () => {
        const { history } = this.props
        history.push('/')
    }

    render() {
        const { intl } = this.props
        return (
            <Fragment>
                <div className="text-center w-50 mx-auto my-5">
                    <div className="display-1 text-primary">404</div>
                    <div className="display-3 text-secondary">
                        {intl.formatMessage({ id: 'notFoundTitleMsg' })}
                    </div>
                    <h5 className="mt-5">
                        {intl.formatMessage({ id: 'notFoundDescMsg' })}
                    </h5>
                    <h5>{intl.formatMessage({ id: 'notFoundDescSugMsg' })}</h5>
                    <Button
                        className="mx-auto my-4"
                        aria-label="home"
                        variant="contained"
                        color="secondary"
                        onClick={this.goBack}
                    >
                        <Home fontSize="medium" />
                        <FormattedMessage id="goHomePage" />
                    </Button>
                </div>
            </Fragment>
        )
    }
}
NotFound.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default compose(injectIntl)(withRouter(NotFound))
