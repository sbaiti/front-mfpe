import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import generateKey from '../../shared/utility'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    tabs: PropTypes.array,
}

TabPanel.defaultProps = {
    tabs: [],
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        minWidth: '500px',
        maxWidth: '1200px',
    },
}))

export default function FullWidthTabs({ tabs, language }) {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    function handleChange(event, newValue) {
        setValue(newValue)
    }

    function handleChangeIndex(index) {
        setValue(index)
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary" className="shadow-none">
                <Tabs
                    value={value}
                    inkbarstyle={{ background: 'blue' }}
                    onChange={handleChange}
                    textColor="inherit"
                    variant="fullWidth"
                    TabIndicatorProps={{ style: { height: 0 } }}
                    aria-label="full width tabs example"
                >
                    {(tabs || []).map((t, i) => (
                        <Tab
                            key={generateKey()}
                            label={t.title}
                            {...a11yProps(i)}
                        />
                    ))}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={language === 'ar' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {(tabs || []).map((t, i) => (
                    <TabPanel
                        key={generateKey()}
                        value={value}
                        index={i}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                    >
                        {t.content}
                    </TabPanel>
                ))}
            </SwipeableViews>
        </div>
    )
}

FullWidthTabs.propTypes = {
    tabs: PropTypes.any.isRequired,
    language: PropTypes.string.isRequired,
}
