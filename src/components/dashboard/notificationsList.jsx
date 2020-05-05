import React from 'react'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'
import { connect } from 'react-redux'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-unresolved
import { formatNotifBody } from 'shared/utility'
import { withRouter } from 'react-router'
import { isEmpty } from 'lodash'
import { Replay } from '@material-ui/icons/'
import IconButton from '@material-ui/core/IconButton'
import editNotificationsActions from '../../redux/notification/editNotifications'
import getAllNotificationsActions from '../../redux/notification/getAllNotifications'

/**
 * NotificationsList
 */
class NotificationsList extends React.Component {
    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props)
        this.state = {
            toggleNotification: false,
            replay: '',
            demandeId: null,
        }
    }

    /**
     * componentWillReceiveProps
     */
    componentWillReceiveProps() {
        this.setState({ replay: '' })
    }

    /**
     * componentDidUpdate
     * @param props
     */
    componentDidUpdate(props) {
        if (props.editNotificationsSuccess) {
            const { history } = this.props
            const { demandeId } = this.state
            history.replace({
                pathname: `/demande/modifier/${demandeId}`,
            })
            window.location.reload()
        }
    }

    /**
     * Toggle Notification
     */
    toggleNotification = () => {
        this.setState(prevState => ({
            toggleNotification: !prevState.toggleNotification,
        }))
    }

    /**
     * Get Notifications
     * @returns {[]}
     */
    getNotifications = () => {
        const { allNotfications, language } = this.props
        const table = []
        try {
            // eslint-disable-next-line array-callback-return
            allNotfications.map((notif, index) => {
                table[index] = {
                    id: notif.id,
                    demandeId: notif.demande.id,
                    body: formatNotifBody(
                        notif.type,
                        notif.demande.id || '',
                        notif.demande.centreFormation.nom || '',
                        language === 'fr'
                            ? notif.demande.uniteRegionale.titreFr
                            : notif.demande.uniteRegionale.titreAr || '',
                        `${notif.userReceive.nomFr} ${notif.userReceive.prenomFr}` ||
                            '',
                        language
                    ),
                    statusNotif: notif.statusNotif,
                }
            })
        } catch (error) {
            console.error(error)
        }
        return table
    }

    /**
     *
     * @param {integer} id - demande id
     * @memberof NotificationsList
     */
    handleDemande = (id, demandeId) => {
        const { editNotifications } = this.props
        this.setState({ demandeId })
        editNotifications(id)
    }

    /**
     * Toggle Refresh Notification
     */
    toggleRefreshNotification = () => {
        const { getAllNotifications } = this.props
        this.setState({ replay: 'replay' })
        getAllNotifications()
    }

    /**
     * Empty Snackbar Snackbar
     * @returns {*}
     */
    emptySnackbar = () => {
        const { intl } = this.props
        const { replay } = this.state
        return (
            <SnackbarContent
                key="0"
                message={intl.formatMessage({ id: 'noNotificationsMsg' })}
                className="bg-light text-primary"
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.toggleRefreshNotification}
                    >
                        <Replay className={replay} />
                    </IconButton>,
                ]}
            />
        )
    }

    /**
     * Render
     * @returns {*}
     */
    render() {
        const notifications = this.getNotifications()

        return (
            <div className="notifications-list">
                {isEmpty(notifications)
                    ? this.emptySnackbar()
                    : notifications.map(value => (
                          <SnackbarContent
                              key={value.id}
                              message={value.body}
                              className={
                                  value.statusNotif
                                      ? 'bg-light text-primary'
                                      : 'bg-primary'
                              }
                              onClick={() =>
                                  this.handleDemande(value.id, value.demandeId)
                              }
                          />
                      ))}
            </div>
        )
    }
}

/**
 * propTypes
 * @type {{allNotfications: *, getAllNotifications: *, history: *, editNotifications: *, intl: *}}
 */
NotificationsList.propTypes = {
    allNotfications: PropTypes.array,
    editNotifications: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    getAllNotifications: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    editNotificationsSuccess: PropTypes.bool.isRequired,
}

/**
 * defaultProps
 * @type {{allNotfications: []}}
 */
NotificationsList.defaultProps = {
    allNotfications: [],
}

/**
 * mapStateToProps
 * @param info
 * @param login
 * @param notification
 * @returns {{allNotfications: *, loggedUser: *, language: *}}
 */
const mapStateToProps = ({ info, login, notification }) => ({
    language: info.language,
    loggedUser: login.response,
    allNotfications: notification.allNotifications.response,
    editNotificationsSuccess: notification.editNotifications.success,
})

/**
 * mapDispatchToProps
 * @param dispatch
 * @returns {{getAllNotifications: (function(): *), editNotifications: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => ({
    editNotifications: payload =>
        dispatch(editNotificationsActions.editNotificationsRequest(payload)),

    getAllNotifications: () =>
        dispatch(getAllNotificationsActions.getAllNotificationsRequest()),
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    injectIntl
)(withRouter(NotificationsList))
