/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-escape */
import React from 'react'
import { Button, TextField } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import loginActions from '../../redux/login/index'

class CitizenAccessForm extends React.Component {
    constructor(props) {
        super(props)
        this.userName = ''
        this.passWord = ''
        this.state = { errorText: '', isError: false }
    }

    componentWillReceiveProps(nextProps) {
        // eslint-disable-next-line react/prop-types
        if (nextProps.loginError) {
            try {
                this.setState({ isError: true, errorText: '' })
            } catch (e) {
                console.log(e)
            }
        }
    }

    /**
     * On change input
     *
     * @param {string} value
     * @param {integer} whichOne
     * @memberof CitizenAccessForm
     */
    onChangeInput = (value, whichOne) => {
        this.setState({
            isError: false,
        })
        if (whichOne) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                const { intl } = this.props

                this.setState({
                    errorText: intl.formatMessage({
                        id: 'usernameValidator',
                    }),
                    isError: true,
                })
            } else {
                this.userName = value
                this.setState({ errorText: '', isError: false })
            }
        } else {
            this.passWord = value
        }
    }

    login = event => {
        event.preventDefault()
        const { loginRequest } = this.props
        loginRequest({
            username: this.userName,
            password: this.passWord,
        })
    }

    gotoLink = (e, url) => {
        e.preventDefault()
        const { history } = this.props
        history.push(url)
    }

    render() {
        // eslint-disable-next-line react/prop-types
        const { intl, fetchingLogin } = this.props
        const { isError, errorText } = this.state

        return (
            <div className="access-form-block d-flex flex-column">
                <form className="access-form text-center" action="/">
                    <h5 className="text-secondary">
                        <FormattedMessage id="accessAccount" />
                    </h5>
                    <TextField
                        id="outlined-login-input"
                        placeholder={intl.formatMessage({
                            id: 'login',
                        })}
                        className="login-textField d-block"
                        type="text"
                        name="login"
                        autoComplete="login"
                        variant="outlined"
                        margin="dense"
                        onChange={event =>
                            this.onChangeInput(event.target.value, 1)
                        }
                        error={isError}
                        disabled={fetchingLogin}
                        helperText={isError ? errorText : false}
                    />
                    <TextField
                        id="outlined-password-input"
                        placeholder={intl.formatMessage({
                            id: 'password',
                        })}
                        className="password-textField d-block"
                        type="password"
                        name="password"
                        autoComplete="password"
                        variant="outlined"
                        margin="dense"
                        onChange={event =>
                            this.onChangeInput(event.target.value, 0)
                        }
                        error={isError}
                        disabled={fetchingLogin}
                    />
                    <Button
                        variant="contained"
                        size="medium"
                        color="secondary"
                        className="d-block my-2 mx-auto"
                        onClick={this.login}
                        disabled={fetchingLogin || isError}
                        type="submit"
                    >
                        <FormattedMessage id="connect" />
                    </Button>
                    <a
                        className="text-center d-block py-2 small text-muted"
                        href=""
                        onClick={e => this.gotoLink(e, '/reset-password')}
                    >
                        <FormattedMessage id="forgetPassword" />
                    </a>
                    <a
                        className="text-primary text-center d-block py-2"
                        href=""
                        onClick={e => this.gotoLink(e, '/inscription')}
                    >
                        <FormattedMessage id="createAccount" />
                    </a>
                </form>
            </div>
        )
    }
}

CitizenAccessForm.propTypes = {
    loginRequest: PropTypes.func.isRequired,
    fetchingLogin: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

CitizenAccessForm.defaultProps = {
    fetchingLogin: false,
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
)(withRouter(CitizenAccessForm))
