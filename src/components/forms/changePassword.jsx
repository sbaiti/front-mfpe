/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { Button, Paper, Container } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import InputText from '../ui/input'
import changePasswordActions from '../../redux/user/changePassword'
import PageTitle from '../ui/pageTitle'

class ChangePassword extends React.Component {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props)
        if (
            props.loggedUser &&
            !props.loggedUser.User.details.userRoles.find(
                i => i.role === 'ROLE_CITOYEN'
            )
        )
            this.goBack()
        this.passWord = ''
        this.state = {
            passWord: '',
            confirmationPassword: '',
            isError: false,
            errorText: props.intl.formatMessage({
                id: 'errorMatchingPasswords',
            }),
        }
    }

    /**
     *
     * @param props
     * @returns {null}
     */
    /*    componentDidUpdate(props) {
        if (props.changePasswordSuccess) {
            const { history } = this.props
            history.replace({
                pathname: `/demande/liste/en-cours`,
            })
            window.location.reload()
            // history.push('/demande/liste/en-cours')
        }
        return null
    } */

    componentWillReceiveProps(props) {
        if (props.changePasswordSuccess) {
            const { history } = this.props
            history.push('/demande/liste/en-cours')
        }
        return null
    }

    onChangeInput = (value, whichOne) => {
        if (whichOne) {
            this.setState({ passWord: value })
        } else {
            const { passWord } = this.state
            this.setState({
                confirmationPassword: value,
                isError: value !== passWord,
            })
        }
    }

    reset = e => {
        e.preventDefault()
        const { changePasswordRequest } = this.props
        const { passWord, confirmationPassword } = this.state

        if (passWord === confirmationPassword) {
            changePasswordRequest({
                password: passWord,
            })
        } else {
            this.setState({ isError: true })
        }
    }

    goBack = () => {
        const { history } = this.props
        history.push('/')
    }

    render() {
        const {
            intl,
            changePasswordError,
            fetchingChangePassword,
            errorResponse,
        } = this.props
        const {
            isError,
            errorText,
            passWord,
            confirmationPassword,
        } = this.state
        return (
            <Container className="reset-form-block container" maxWidth="sm">
                <PageTitle
                    label={intl.formatMessage({
                        id: 'change-password',
                    })}
                />
                <Paper className="p-5">
                    <div>
                        <form className="reset-form d-flex flex-column">
                            <InputText
                                id="outlined-password-input"
                                label={intl.formatMessage({
                                    id: 'newPassword',
                                })}
                                className="col-12 password-textField"
                                type="password"
                                name="password"
                                variant="outlined"
                                margin="dense"
                                value={passWord}
                                onchange={event =>
                                    this.onChangeInput(event.target.value, 1)
                                }
                                errorText={isError ? '' : errorResponse}
                                isError={changePasswordError}
                                disabled={fetchingChangePassword}
                                inputProps={{
                                    min: '5',
                                    max: '10',
                                    step: '1',
                                }}
                            />
                            <InputText
                                id="outlined-confirm-password-input"
                                label={intl.formatMessage({
                                    id: 'confirmPassword',
                                })}
                                className={`password-textField${
                                    isError
                                        ? 'border-success'
                                        : 'border-success'
                                }`}
                                type="password"
                                name="confirm-password"
                                variant="outlined"
                                margin="dense"
                                value={confirmationPassword}
                                onchange={event =>
                                    this.onChangeInput(event.target.value, 0)
                                }
                                errorText={isError ? errorText : errorResponse}
                                isError={isError || changePasswordError}
                                disabled={fetchingChangePassword}
                                inputProps={{
                                    min: '5',
                                    max: '10',
                                    step: '1',
                                }}
                            />
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                className="submit-button"
                                onClick={e => this.reset(e)}
                                disabled={isError || fetchingChangePassword}
                                type="submit"
                            >
                                <FormattedMessage id="validate" />
                            </Button>
                        </form>
                    </div>
                </Paper>
            </Container>
        )
    }
}

ChangePassword.propTypes = {
    history: PropTypes.object.isRequired,
    changePasswordRequest: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    fetchingChangePassword: PropTypes.bool,
    changePasswordSuccess: PropTypes.bool,
    changePasswordError: PropTypes.bool,
    errorResponse: PropTypes.string,
    loggedUser: PropTypes.object.isRequired,
}

ChangePassword.defaultProps = {
    fetchingChangePassword: false,
    changePasswordSuccess: false,
    changePasswordError: false,
    errorResponse: '',
}

const mapDispatchToProps = dispatch => ({
    changePasswordRequest: payload =>
        dispatch(changePasswordActions.changePasswordRequest(payload)),
})

const mapStateToProps = state => ({
    changePasswordError: state.user.changePassword.error,
    fetchingChangePassword: state.user.changePassword.loading,
    changePasswordSuccess: state.user.changePassword.success,
    errorResponse: state.user.changePassword.response
        ? state.user.changePassword.response.data.message
        : '',
    loggedUser: state.login.response,
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    injectIntl
)(withRouter(ChangePassword))
