import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

class SpecialNeedsInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    handleChange = panel => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false })
    }

    render() {
        const { intl, natureBesoinSpecifique } = this.props
        const { expanded } = this.state
        return (
            <Paper>
                <ExpansionPanel
                    expanded={expanded === 'panel1'}
                    onChange={this.handleChange('panel1')}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <h5>
                            {intl.formatMessage({ id: 'specialNeedsNature' })}
                        </h5>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <p>{natureBesoinSpecifique}</p>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>
        )
    }
}

SpecialNeedsInfo.defaultProps = {
    natureBesoinSpecifique: null,
}

SpecialNeedsInfo.propTypes = {
    intl: PropTypes.object.isRequired,
    natureBesoinSpecifique: PropTypes.string,
}

export default injectIntl(SpecialNeedsInfo)
