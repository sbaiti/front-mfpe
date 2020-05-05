/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    ExpansionPanelActions,
    Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchIcon from '@material-ui/icons/Search'
import ClearAllIcon from '@material-ui/icons/ClearAll'

const FilterTable = ({ children, onSubmit, onReset, isOpen }) => {
    const [expanded, handleChange] = useState(isOpen)
    return (
        <ExpansionPanel
            className="container mb-3 mx-auto"
            expanded={expanded}
            onChange={() => handleChange(!expanded)}
        >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h5>
                    <FormattedMessage id="filter" />
                </h5>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
            <ExpansionPanelActions>
                <Button
                    size="small"
                    variant="text"
                    startIcon={<ClearAllIcon />}
                    onClick={onReset}
                >
                    <FormattedMessage id="cancel" />
                </Button>
                <Button
                    size="small"
                    color="primary"
                    startIcon={<SearchIcon />}
                    onClick={onSubmit}
                >
                    <FormattedMessage id="search" />
                </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    )
}
FilterTable.defaultProps = {
    isOpen: false,
    onSubmit: () => {},
    onReset: () => {},
}
FilterTable.propTypes = {
    children: PropTypes.any.isRequired,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default injectIntl(FilterTable)
