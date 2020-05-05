import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import MaterialTable from 'material-table'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

class RoleInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    payload = () => {
        const {
            intl,
            grade,
            fonction,
            identifiant,
            firstResponsible,
        } = this.props
        return {
            columns: [
                {
                    title: 'text',
                    field: 'text',
                    editable: 'never',
                    cellStyle: { textAlign: 'inherit', fontWeight: 'bold' },
                },
                {
                    title: 'value',
                    field: 'value',
                    cellStyle: { textAlign: 'inherit' },
                },
            ],

            data: [
                {
                    name: 'identifiant',
                    text: intl.formatMessage({ id: 'identifiant' }),
                    value: identifiant,
                },
                {
                    name: 'grade',
                    text: intl.formatMessage({ id: 'grade' }),
                    value: grade,
                },
                {
                    name: 'firstResponsible',
                    text: intl.formatMessage({ id: 'firstResponsible' }),
                    value: firstResponsible,
                },
                {
                    name: 'fonction',
                    text: intl.formatMessage({ id: 'functional' }),
                    value: intl.formatMessage({ id: fonction || 'undefined' }),
                },
            ],
        }
    }

    handleChange = panel => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false })
    }

    render() {
        const { expanded } = this.state
        const { loading, intl } = this.props

        return (
            <Paper>
                <ExpansionPanel
                    expanded={expanded === 'panel2'}
                    onChange={this.handleChange('panel2')}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <h5>{intl.formatMessage({ id: 'function' })}</h5>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ padding: '0' }}>
                        <MaterialTable
                            style={{ width: '100%' }}
                            columns={this.payload().columns}
                            data={this.payload().data}
                            options={{
                                toolbar: false,
                                showTitle: false,
                                search: false,
                                sorting: false,
                                paging: false,
                                header: false,
                                detailPanelColumnAlignment: 'right',
                                actionsColumnIndex: -1,
                                rowStyle: rowData => ({
                                    display: rowData.value ? '' : 'none',
                                }),
                            }}
                            isLoading={loading}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>
        )
    }
}

RoleInfo.defaultProps = {
    grade: null,
    fonction: null,
    identifiant: null,
    firstResponsible: null,
    loading: false,
}

RoleInfo.propTypes = {
    intl: PropTypes.object.isRequired,
    grade: PropTypes.string,
    fonction: PropTypes.string,
    identifiant: PropTypes.string,
    firstResponsible: PropTypes.string,
    loading: PropTypes.bool,
}

export default injectIntl(RoleInfo)
