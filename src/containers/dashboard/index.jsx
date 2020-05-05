import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { Switch } from 'react-router'
import PropTypes from 'prop-types'
import Sidebar from '../../components/sidebar'
import DashboardHeader from '../../components/dashboard/header'
import listOfRoutes from '../../routes/listOfRoutes'
import ErrorBoundary from '../../components/errorBoundary'

const drawerWidth = 340

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        top: 96,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        margin: '0 auto',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        position: 'relative',
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        position: 'relative',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        position: 'relative',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

/**
 *
 *
 * @export
 * @param {*} { isLogged }
 * @param {*} { userRole }
 * @returns
 */
export default function Dashboard({ isLogged, userRole }) {
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = React.useState(true)

    /**
     * Handle Drawer Open
     *
     */
    const handleDrawerOpen = () => {
        setOpen(true)
    }

    /**
     * Handle Drawer Close
     *
     */
    const handleDrawerClose = () => {
        setOpen(false)
    }

    /**
     * Select Handler
     *
     * @param {*} e
     * @param {*} openMenu
     */
    const selectHandler = (e, openMenu) => {
        setOpen(openMenu)
    }
    return (
        <div className={classes.root}>
            {isLogged && (
                <Drawer
                    style={{
                        position: 'relative',
                    }}
                    variant="permanent"
                    className={`${classes.drawer} ${
                        open ? classes.drawerOpen : classes.drawerClose
                    }`}
                    classes={{
                        paper: open ? classes.drawerOpen : classes.drawerClose,
                    }}
                    open={open}
                >
                    <div className={`${classes.toolbar} ${!open && 'mx-auto'}`}>
                        {!open ? (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={`${classes.menuButton} ${
                                    open ? classes.hide : ''
                                }`}
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? (
                                    <ChevronRightIcon />
                                ) : (
                                    <ChevronLeftIcon />
                                )}
                            </IconButton>
                        )}
                    </div>
                    <Divider />
                    <Sidebar
                        userRole={userRole}
                        drawerIsOpen={open}
                        tabClicked={(e, openMenu) => selectHandler(e, openMenu)}
                    />
                </Drawer>
            )}

            <main
                className="content dashboard-main bg-white"
                style={{ width: `calc(100% - ${drawerWidth}px)` }}
            >
                {isLogged && <DashboardHeader />}
                <ErrorBoundary>
                    <Switch>{listOfRoutes.map(route => route)}</Switch>
                </ErrorBoundary>
            </main>
        </div>
    )
}
Dashboard.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    userRole: PropTypes.string.isRequired,
}
