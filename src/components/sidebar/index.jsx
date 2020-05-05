/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react'
import { Collapse } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import { FormattedMessage, injectIntl } from 'react-intl'

import {
    ExpandLess,
    ExpandMore,
    ArrowRightAlt,
    KeyboardBackspace,
} from '@material-ui/icons'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { isEmpty, isUndefined } from 'lodash'
import data from './data'
import AlertDialog from '../alertDialog'
import Icons from '../icons'

class Sidebar extends React.Component {
    /**
     * state
     * @type {{itemId: number, showAlert: boolean, open: boolean, selectedIndex: number}}
     */
    state = {
        itemId: 0,
        open: true,
        selectedIndex: 0,
        showAlert: false,
    }

    /**
     *
     * @param props
     * @param state
     * @returns {{open: Requireable<boolean> | boolean | *}|null}
     */
    static getDerivedStateFromProps(props, state) {
        if (props.drawerIsOpen !== state.open) {
            return { open: props.drawerIsOpen }
        }
        return null
    }

    /**
     * Open Drawer
     * @return{*}
     */
    openDrawer = () => {
        this.setState({ open: true })
    }

    /**
     * Handle Click
     * @param e
     * @param item
     * @param openDrawer
     */
    handleClick = (e, item, openDrawer) => {
        const { tabClicked } = this.props
        this.setState(prevState => {
            return { [item.id]: !prevState[item.id] }
        })
        if (openDrawer) {
            this.openDrawer()
            tabClicked(e, true)
            this.handleSelectItem(e, { ...item, id: item.id })
        } else {
            tabClicked(e, false)
            this.handleSelectItem(e, item)
        }
    }

    /**
     * Handle Select Item
     * @param event
     * @param id
     * @param subitems
     * @param link
     * @param dev
     * @param title
     */
    handleSelectItem = (event, { id, subitems, link, dev, title }) => {
        const { history, logout } = this.props
        this.setState({ selectedIndex: id })
        if (title === 'disconnect') {
            logout()
        }
        if (!isUndefined(dev) && dev) {
            this.setState({ showAlert: true })
        }
        if (isEmpty(subitems)) {
            history.push({
                pathname: link,
            })
        }
    }

    /**
     * filterByPermissions
     * @param array
     * @returns {*}
     */
    filterByPermissions = array => {
        const { ecrans } = this.props

        const permissionsEcrans = Object.values(ecrans)

        return array.filter(i => {
            return permissionsEcrans.find(
                f => f === i.title || i.defaultPermission
            )
            // return permissionsEcrans.includes(i)
        })
    }

    /**
     * Create Sidebar Items
     * @param array
     * @returns {*}
     */
    createSidebarItems = array => {
        return this.filterByPermissions(array)
            .filter(f => {
                if (f.subitems !== undefined && f.title !== 'demands') {
                    return this.filterByPermissions(f.subitems).length > 0
                }
                return true
            })
            .map(a => {
                if (a.subitems !== undefined) {
                    return {
                        ...a,
                        subitems: this.filterByPermissions(a.subitems),
                    }
                }
                return a
            })
    }

    /**
     * handleClose
     */
    handleClose = () => {
        this.setState({ showAlert: false })
    }

    /**
     * getListItem
     * @param item
     * @param openDrawer
     * @param type
     * @param expand
     * @returns {*}
     */
    getListItem = (item, openDrawer, type, expand = false) => {
        const { intl, language } = this.props
        const sideState = this.state
        return (
            <ListItem
                button
                key={item.title}
                onClick={e => this.handleClick(e, item, openDrawer)}
                className={`list-item ${type}`}
                divider
                selected={sideState.selectedIndex === item.id}
            >
                {!sideState.open && (
                    <Tooltip
                        title={intl.formatMessage({
                            id: item.title,
                        })}
                        aria-label={item.title}
                        placement="right"
                    >
                        <ListItemIcon>
                            <Icons name={item.title} />
                        </ListItemIcon>
                    </Tooltip>
                )}
                {type === 'subitem' &&
                    (language === 'fr' ? (
                        <ArrowRightAlt color="secondary" />
                    ) : (
                        <KeyboardBackspace color="secondary" />
                    ))}
                <ListItemText
                    primary={intl.formatMessage({
                        id: item.title,
                    })}
                />
                {expand && this.getExpand(item.id)}
            </ListItem>
        )
    }

    /**
     * getExpand
     * @param itemId
     * @returns {*}
     */
    getExpand = itemId => {
        const sideState = this.state
        return sideState[itemId] ? (
            <ExpandLess color="secondary" />
        ) : (
            <ExpandMore color="secondary" />
        )
    }

    render() {
        const sideState = this.state
        const items = this.createSidebarItems(data[0].items)
        const header = {
            show: true,
            element: (
                <div className="text-center">
                    <Icons
                        name="construction"
                        viewBox="0 0 60 75"
                        width="150"
                        height="150"
                        color="red"
                    />
                </div>
            ),
        }
        const body = {
            show: true,
            element: (
                <div className="text-center h5 w-75 mx-auto text-primary">
                    <FormattedMessage id="constructionText" />
                </div>
            ),
        }
        return (
            <Fragment>
                {sideState.showAlert && (
                    <AlertDialog
                        handleClose={this.handleClose}
                        header={header}
                        body={body}
                    />
                )}
                <List className="sidebar-list">
                    {items.map(item =>
                        item.subitems && item.subitems.length > 0 ? (
                            <Fragment key={item.id}>
                                {this.getListItem(item, true, 'item', true)}
                                <Collapse
                                    key={data[0].items.id}
                                    component="li"
                                    in={sideState[item.id]}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    {sideState.open && (
                                        <List disablePadding className="list">
                                            {item.subitems.map(sitem =>
                                                sitem.subsubitems &&
                                                sitem.subsubitems.length > 0 ? (
                                                    <Fragment key={sitem.id}>
                                                        {this.getListItem(
                                                            sitem,
                                                            true,
                                                            'subitem',
                                                            true
                                                        )}
                                                        <Collapse
                                                            key={
                                                                data[0].items.id
                                                            }
                                                            component="li"
                                                            in={
                                                                sideState[
                                                                    sitem.id
                                                                ]
                                                            }
                                                            timeout="auto"
                                                            unmountOnExit
                                                        >
                                                            {sideState.open && (
                                                                <List
                                                                    disablePadding
                                                                    className="list"
                                                                >
                                                                    {sitem.subsubitems.map(
                                                                        ssitem => {
                                                                            return this.getListItem(
                                                                                ssitem,
                                                                                true,
                                                                                'subsubitem'
                                                                            )
                                                                        }
                                                                    )}
                                                                </List>
                                                            )}
                                                        </Collapse>
                                                    </Fragment>
                                                ) : (
                                                    this.getListItem(
                                                        sitem,
                                                        true,
                                                        'subitem'
                                                    )
                                                )
                                            )}
                                        </List>
                                    )}
                                </Collapse>
                            </Fragment>
                        ) : (
                            this.getListItem(item, sideState.open, 'item')
                        )
                    )}
                </List>
            </Fragment>
        )
    }
}

/**
 * PropTypes
 * @type {{logout: Validator<NonNullable<(...args: any[]) => any>>, ecrans: Validator<NonNullable<any[]>>, tabClicked: Validator<NonNullable<(...args: any[]) => any>>, language: Validator<NonNullable<string>>, history: Validator<NonNullable<InferProps<{push: Validator<NonNullable<(...args: any[]) => any>>}>>>, intl: Validator<NonNullable<object>>}}
 */
Sidebar.propTypes = {
    tabClicked: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    logout: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    ecrans: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    language: state.info.language,
    ecrans: state.login.response.User.ecrans,
})
const mapDispatchToProps = dispatch => ({
    logout: () =>
        dispatch({
            type: 'SIGNOUT_REQUEST',
        }),
})
export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    injectIntl
)(Sidebar)
