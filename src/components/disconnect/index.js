/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import listOfRoutes from '../../routes/listOfRoutes'
import generateKey from '../../shared/utility'
import getAllNotificationsActions from '../../redux/notification/getAllNotifications'

class Disconnect extends React.Component {
    static propTypes = {
        language: PropTypes.string.isRequired,
        loggedUser: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        getAllNotifications: PropTypes.func.isRequired,
        allNotfications: PropTypes.array,
    }

    static defaultProps = {
        allNotfications: [],
    }

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
        const { loggedUser } = this.props
        return loggedUser.User.details.userRoles.map(r => (
            <span key={generateKey()}>
                <FormattedMessage id={r.role} />
            </span>
        ))
    }

    handleLogout = e => {
        const { logout } = this.props
        e.preventDefault()
        logout()
    }

    getRouteTitle = () => {
        const { location } = this.props
        // eslint-disable-next-line no-unused-vars
        for (const r of listOfRoutes) {
            let same = false
            let substrRoute = ''
            let substrLocation = ''
            if (r.key.indexOf(':') > -1) {
                substrRoute = r.key
                    .substring(0, r.key.lastIndexOf('/') - 1)
                    .replace(/\//gi, '')
                substrLocation = location.pathname
                    .substring(0, location.pathname.lastIndexOf('/') - 1)
                    .replace(/\//gi, '')
            } else {
                substrRoute = r.key.replace(/\//gi, '')
                substrLocation = location.pathname.replace(/\//gi, '')
            }
            same = substrRoute === substrLocation

            if (same) {
                return <FormattedMessage id={r.props.title} />
            }
        }
        return <FormattedMessage id="welcome" />
    }

    render() {
        return null
    }
}

const mapStateToProps = ({ info, login, notification }) => ({
    language: info.language,
    loggedUser: login.response,
    allNotfications: notification.allNotifications.response,
})

const mapDispatchToProps = dispatch => ({
    logout: () =>
        dispatch({
            type: 'SIGNOUT_REQUEST',
        }),
    getAllNotifications: () =>
        dispatch(getAllNotificationsActions.getAllNotificationsRequest()),
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    injectIntl
)(withRouter(Disconnect))
