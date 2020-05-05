import React from 'react'
import { Button, TextField } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isValidEmail } from '../../shared/utility'
import loginActions from '../../redux/login/index'

/**
 * Access Form
 *
 * @class AccessForm
 * @extends {React.Component}
 */
class AccessForm extends React.Component {
    /**
     * Creates an instance of AccessForm.
     *
     * @param {*} props
     * @memberof AccessForm
     */
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            loading: false,
            username: '',
            password: '',
            errorText: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fetchingLogin) this.setState({ loading: true })
        if (nextProps.loginError) {
            this.setState({ isError: true, loading: false })
        }
    }

    /**
     * On change input
     *
     * @param {object} target
     * @memberof AccessForm
     */
    onChangeInput = target => {
        const { username } = this.state
        const { intl } = this.props
        const email = target.name === 'username' ? target.value : username
        const isValid = isValidEmail(email)
        this.setState({
            [target.name]: target.value,
            isError: !isValid,
            errorText:
                !isValid &&
                intl.formatMessage({
                    id: 'emailValidator',
                }),
            loading: false,
        })
    }

    /**
     * Login
     *
     * @memberof AccessForm
     */
    login = event => {
        event.preventDefault()
        const { loginRequest } = this.props
        const { username, password } = this.state
        loginRequest({ username, password })
        this.setState({ loading: true, isError: false })
    }

    render() {
        const { intl } = this.props
        const { isError, username, password, loading, errorText } = this.state

        return (
            <div className="access-form-block">
                <form className="access-form" action="/">
                    <TextField
                        id="outlined-login-input"
                        placeholder={intl.formatMessage({
                            id: 'login',
                        })}
                        className="login-textField"
                        type="email"
                        name="username"
                        autoComplete="username"
                        variant="outlined"
                        margin="dense"
                        value={username}
                        onChange={event => this.onChangeInput(event.target)}
                        error={isError}
                        disabled={loading}
                        helperText={isError ? errorText : false}
                    />
                    <TextField
                        id="outlined-password-input"
                        placeholder={intl.formatMessage({
                            id: 'password',
                        })}
                        className="password-textField"
                        type="password"
                        name="password"
                        autoComplete="password"
                        variant="outlined"
                        margin="dense"
                        value={password}
                        onChange={event => this.onChangeInput(event.target)}
                        error={isError}
                        disabled={loading}
                    />
                    <Button
                        variant="contained"
                        size="medium"
                        color="secondary"
                        className="submit-button"
                        onClick={this.login}
                        disabled={loading || isError}
                        type="submit"
                    >
                        <FormattedMessage id="connect" />
                    </Button>
                </form>
            </div>
        )
    }
}

AccessForm.propTypes = {
    loginRequest: PropTypes.func.isRequired,
    fetchingLogin: PropTypes.bool,
    loginError: PropTypes.bool,
    intl: PropTypes.object.isRequired,
}

AccessForm.defaultProps = {
    fetchingLogin: false,
    loginError: false,
}

const mapDispatchToProps = dispatch => ({
    loginRequest: payload => dispatch(loginActions.loginRequest(payload)),
})

const mapStateToProps = state => ({
    loginError: state.login.error,
    fetchingLogin: state.login.loading,
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    injectIntl
)(withRouter(AccessForm))
