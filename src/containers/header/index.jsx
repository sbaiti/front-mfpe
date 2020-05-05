import React from 'react'
import { Grid, Select, MenuItem } from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import flagTn from '../../assets/images/flag-tn.svg'
import accessPro from '../../assets/images/acces-pro.svg'
import Logo from '../../assets/images/Logo-MFPE.png'
import AccessForm from '../../components/forms/accessForm'
import languageActions from '../../redux/language'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleAuth: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        const { history, connected } = this.props
        if (
            connected !== nextProps.connected &&
            nextProps.connected === false
        ) {
            history.push('/')
        }
        if (connected !== nextProps.connected && nextProps.connected === true) {
            if (nextProps.firstTimetoConnect) history.push('/change-password')
            else history.push('/demande/liste/')
        }
    }

    toggleAccessForm = () => {
        this.setState(prevState => ({
            toggleAuth: !prevState.toggleAuth,
        }))
    }

    handleHomePage = () => {
        const { history, connected } = this.props
        history.push({
            pathname: connected ? '/demande/liste/' : '/',
        })
    }

    handleClickAway = () => {
        this.setState({ toggleAuth: false })
    }

    render() {
        const appState = this.state
        const { changeLanguage, language, connected } = this.props
        return (
            <header className="header">
                <Grid container>
                    <Grid item md={4} xs={8} className="left-block">
                        <div className="tn-flag mt-auto">
                            <img src={flagTn} alt="tunisia-flag" />
                        </div>
                        <div className="text-block uppercase">
                            <p className="p-0">
                                <FormattedMessage id="nameRepublic" />
                            </p>
                            <p>
                                <FormattedMessage id="name" />
                            </p>
                        </div>
                    </Grid>
                    <Grid item md={4} xs={4} className="center-block">
                        <div
                            className="logo-img"
                            onClick={this.handleHomePage}
                            role="presentation"
                        >
                            <img src={Logo} alt="Logo-MFPE" />
                        </div>
                    </Grid>
                    <Grid item md={4} xs={12} className="right-block">
                        {!connected && (
                            <ClickAwayListener
                                onClickAway={this.handleClickAway}
                            >
                                <div className="pos-relative">
                                    <div
                                        className="prof-access"
                                        onClick={this.toggleAccessForm}
                                        role="presentation"
                                    >
                                        <img
                                            src={accessPro}
                                            alt="Accès professionel"
                                        />
                                        <p>
                                            <FormattedMessage id="profesionalAccess" />
                                        </p>
                                    </div>
                                    {appState.toggleAuth && <AccessForm />}
                                </div>
                            </ClickAwayListener>
                        )}

                        <Select
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            inputProps={{
                                name: 'language',
                                id: 'language-native-simple',
                            }}
                            onChange={e => changeLanguage(e.target.value)}
                            value={language}
                            style={{
                                color: 'rgb(255, 255, 255)',
                                fontSize: 15,
                                border: 'none',
                            }}
                        >
                            <MenuItem value="fr">Français</MenuItem>
                            <MenuItem value="ar">العربية</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </header>
        )
    }
}
Header.propTypes = {
    changeLanguage: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    connected: PropTypes.bool.isRequired,
    firstTimetoConnect: PropTypes.bool,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}
Header.defaultProps = {
    firstTimetoConnect: false,
}
const mapDispatchToProps = dispatch => ({
    changeLanguage: l => dispatch(languageActions.changeLanguage(l)),
})
const mapStateToProps = ({ login, info }) => {
    return {
        connected: login.connected,
        firstTimetoConnect:
            login.firstTimetoConnect &&
            login.response.User.details.userRoles.find(
                i => i.role === 'ROLE_CITOYEN'
            ) !== undefined,
        language: info.language,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Header))
