/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { Button, Paper, Container } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Home from '@material-ui/icons/Home'
import InputText from '../ui/input'
import resetPasswordActions from '../../redux/user/resetPassword'

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        // this.identity = ''
        this.state = {
            identity: '',
        }
    }

    onChangeInput = value => {
        // this.identity = value
        this.setState({ identity: value })
    }

    reset = () => {
        const { resetPasswordRequest } = this.props
        const { identity } = this.state
        resetPasswordRequest({
            identity,
        })
    }

    goBack = () => {
        const { history } = this.props
        history.push('/')
    }

    render() {
        const {
            intl,
            language,
            resetPasswordError,
            fetchingResetPassword,
            errorResponse,
            resetPasswordSuccess,
        } = this.props

        const { identity } = this.state

        return (
            <Container className="reset-form-block container" maxWidth="sm">
                <Paper className="p-5">
                    {resetPasswordSuccess ? (
                        <div className="text-center">
                            <div className="alert alert-success" role="alert">
                                <FormattedMessage id="resetPasswordSuccess" />
                            </div>
                            <Button
                                className="mx-auto"
                                aria-label="home"
                                variant="contained"
                                color="primary"
                                onClick={this.goBack}
                            >
                                <Home fontSize="large" />
                                <FormattedMessage id="goHomePage" />
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <div className="alert alert-warning" role="alert">
                                <FormattedMessage id="resetPasswordWarning" />
                            </div>
                            <form
                                className="reset-form d-flex flex-column"
                                action="/"
                            >
                                <InputText
                                    id="outlined-password-input"
                                    label={intl.formatMessage({
                                        id: 'identifiant',
                                    })}
                                    placeholder={intl.formatMessage({
                                        id: 'identityCinPasspEmail',
                                    })}
                                    className="password-textField"
                                    type="text"
                                    name="identity"
                                    variant="outlined"
                                    margin="dense"
                                    onchange={event =>
                                        this.onChangeInput(event.target.value)
                                    }
                                    errorText={
                                        language === 'fr'
                                            ? errorResponse.fr
                                            : errorResponse.ar
                                    }
                                    isError={resetPasswordError}
                                    disabled={fetchingResetPassword}
                                    value={identity}
                                />
                                <Button
                                    variant="contained"
                                    size="medium"
                                    color="secondary"
                                    className="submit-button"
                                    onClick={this.reset}
                                    disabled={fetchingResetPassword}
                                    type="submit"
                                >
                                    <FormattedMessage id="validate" />
                                </Button>
                            </form>
                        </div>
                    )}
                </Paper>
            </Container>
        )
    }
}

ResetPassword.propTypes = {
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    resetPasswordRequest: PropTypes.func.isRequired,
    fetchingResetPassword: PropTypes.bool,
    resetPasswordError: PropTypes.bool,
    errorResponse: PropTypes.shape({
        fr: PropTypes.string,
        ar: PropTypes.string,
    }),
    resetPasswordSuccess: PropTypes.bool,
}

ResetPassword.defaultProps = {
    fetchingResetPassword: false,
    resetPasswordError: false,
    resetPasswordSuccess: false,
    errorResponse: {},
}

const mapDispatchToProps = dispatch => ({
    resetPasswordRequest: payload =>
        dispatch(resetPasswordActions.resetPasswordRequest(payload)),
})

const mapStateToProps = state => ({
    language: state.info.language,
    fetchingResetPassword: state.user.resetPassword.loading,
    resetPasswordSuccess: state.user.resetPassword.success,
    resetPasswordError: state.user.resetPassword.error,
    errorResponse: state.user.resetPassword.error
        ? state.user.resetPassword.response.data.data.identity
        : '',
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    injectIntl
)(withRouter(ResetPassword))
