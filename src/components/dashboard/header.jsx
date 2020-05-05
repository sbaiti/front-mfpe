/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import PageTitle from '../ui/pageTitle'
import NotificationsList from './notificationsList'
import generateKey, { getTranslatedAttribute } from '../../shared/utility'
import getAllNotificationsActions from '../../redux/notification/getAllNotifications'
import CustomAvatars from '../customAvatars'

class DashboardHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemId: 0,
            open: false,
            toggleDisconnect: false,
            toggleNotification: false,
            countNotification: 0,
        }
    }

    componentDidMount() {
        const { getAllNotifications } = this.props
        getAllNotifications()
        this.interval = setInterval(() => getAllNotifications(), 36000)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            countNotification: nextProps.allNotfications
                ? this.getAllNotificationsLength(nextProps.allNotfications)
                : 0,
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getAllNotificationsLength = allNotifications => {
        let length = 0
        // eslint-disable-next-line array-callback-return
        allNotifications.map(e => {
            // eslint-disable-next-line no-plusplus
            if (!e.statusNotif) length++
        })

        return length
    }

    handleDrawer = () => {
        this.setState(prevState => ({
            open: !prevState.open,
        }))
    }

    toggleNotification = () => {
        this.setState(prevState => ({
            toggleNotification: !prevState.toggleNotification,
            countNotification: 0,
        }))
    }

    handleClickAwayNotification = () => {
        this.setState({ toggleNotification: false })
    }

    toggleDisconnect = () => {
        this.setState(prevState => ({
            toggleDisconnect: !prevState.toggleDisconnect,
        }))
    }

    handleClickAway = () => {
        this.setState({ toggleDisconnect: false })
    }

    handleClick = (e, itemId) => {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        this.setState({ [itemId]: !this.state[itemId] })
    }

    getDisplayName = () => {
        const { loggedUser, language } = this.props
        if (language === 'fr') {
            return `${loggedUser.User.details.prenomFr} ${loggedUser.User.details.nomFr}`
        }
        return `${loggedUser.User.details.prenomAr} ${loggedUser.User.details.nomAr}`
    }

    getUserRole = () => {
        const { loggedUser, language } = this.props
        return (
            <span key={generateKey()}>
                {
                    loggedUser.User.details.userRoles[0][
                        getTranslatedAttribute(language)
                    ]
                }
            </span>
        )
    }

    handleLogout = e => {
        const { logout } = this.props
        e.preventDefault()
        logout()
    }

    getRouteTitle = () => {
        const { currentRoute } = this.props

        return <FormattedMessage id={currentRoute.title || 'welcome'} />
    }

    render() {
        const {
            toggleDisconnect,
            toggleNotification,
            countNotification,
        } = this.state

        const logoutDivStyle = {
            position: 'absolute',
            width: '131px',
            height: '122px',
            top: '10%',
            left: '50%',
            marginLeft: '-65px',
        }
        const { loggedUser } = this.props
        return (
            <header className="dashboard-header">
                <div className="left-block">
                    <PageTitle label={this.getRouteTitle()} />
                </div>
                <div className="right-block">
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <div className="profile-status">
                            <div
                                role="presentation"
                                onClick={this.toggleDisconnect}
                            >
                                <CustomAvatars
                                    firstName={loggedUser.User.details.prenomFr}
                                    lastName={loggedUser.User.details.nomFr}
                                    alt="profile image"
                                />
                                <b>{this.getDisplayName()}</b>
                                <p className="m-0">{this.getUserRole()}</p>
                            </div>
                            <div
                                style={logoutDivStyle}
                                onMouseLeave={this.toggleDisconnect}
                                onMouseEnter={this.toggleDisconnect}
                            >
                                {toggleDisconnect && (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="secondary"
                                        className="disconnectButton"
                                        onClick={this.handleLogout}
                                    >
                                        <FormattedMessage id="disconnect" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </ClickAwayListener>
                    <div className="notifications">
                        <ClickAwayListener
                            onClickAway={this.handleClickAwayNotification}
                        >
                            <div className="pos-relative">
                                <Badge
                                    color="error"
                                    badgeContent={countNotification}
                                    onClick={this.toggleNotification}
                                >
                                    <NotificationsIcon />
                                </Badge>

                                {toggleNotification && (
                                    <NotificationsList allNotfications />
                                )}
                            </div>
                        </ClickAwayListener>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = ({ info, login, notification, pageTitle }) => ({
    language: info.language,
    loggedUser: login.response,
    allNotfications: notification.allNotifications.response,
    currentRoute: pageTitle,
})

const mapDispatchToProps = dispatch => ({
    logout: () =>
        dispatch({
            type: 'SIGNOUT_REQUEST',
        }),
    getAllNotifications: () =>
        dispatch(getAllNotificationsActions.getAllNotificationsRequest()),
})

DashboardHeader.propTypes = {
    language: PropTypes.string.isRequired,
    loggedUser: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    currentRoute: PropTypes.object,
    getAllNotifications: PropTypes.func.isRequired,
    allNotfications: PropTypes.array,
}

DashboardHeader.defaultProps = {
    allNotfications: [],
    currentRoute: { title: 'welcome' },
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(DashboardHeader))
