/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper, TableRow, TableCell, TableBody, Table } from '@material-ui/core'
import { formatDate } from '../../profile/common'
import getAllInvestmentProjectActions from '../../../redux/investmentProjects/getAllInvestmentProject'
import MuiTable from '../../../components/ui/table'
import generateKey, { getTranslatedAttribute } from '../../../shared/utility'
import setPageTitleActions from '../../../redux/pageTitle'

/**
 * display ProjectInvestment list
 *
 * @class ListProjectInvestment
 * @extends {React.Component}
 */
class ListProjectInvestment extends React.Component {
    /**
     * Creates an instance of ListProjectInvestment.
     * @param {*} props
     * @memberof ListProjectInvestment
     */
    constructor(props) {
        super(props)
        this.state = { type: props.match.params.type }
        this.columns = this.getColumns()
        props.getAllInvestmentProject({ ...this.getParams() })
        props.setPageTitle(props.match.params.type)
    }

    static getDerivedStateFromProps(props, state) {
        if (state.type !== props.match.params.type) {
            let params = []
            switch (props.match.params.type) {
                case 'api':
                    params = { type: 1 }
                    break
                case 'apia':
                    params = { type: 2 }
                    break
                case 'entreprise-en-difficulté':
                    params = { type: 3 }
                    break
                default:
                    break
            }
            props.setPageTitle(props.match.params.type)
            props.getAllInvestmentProject(params)

            return { type: props.match.params.type }
        }
        return {}
    }

    getParams = () => {
        const { match } = this.props
        switch (match.params.type) {
            case 'api':
                return { type: 1 }
            case 'apia':
                return { type: 2 }
            case 'entreprise-en-difficulté':
                return { type: 3 }
            default:
                return null
        }
    }

    getList = () => {
        const { investProject, language } = this.props
        const list = (investProject || []).map(d => {
            return {
                governorat: d.governorat[getTranslatedAttribute(language)],
                createdAt: d.createdAt || formatDate(new Date()),
                delegation: d.delegation[getTranslatedAttribute(language)],
                sector: d.sector[getTranslatedAttribute(language)],
                object: d.object,
                regime: d.regime,
                job_estimed: d.jobEstimed,
                investment_cost: d.investmentCost,
                activiry_cessation: d.activiryCessation,
                duration: d.duration,
                number_job_lost: d.numberJobLost,
                type: d.type,
            }
        })
        return list
    }

    getColumns() {
        const { intl } = this.props
        return [
            {
                field: 'createdAt',
                title: intl.formatMessage({ id: 'createdAt' }),
                type: 'string',
            },
            {
                field: 'governorat',
                title: intl.formatMessage({ id: 'governorate' }),
                type: 'string',
            },
            {
                field: 'delegation',
                title: intl.formatMessage({ id: 'delegation' }),
                type: 'string',
            },
            {
                field: 'sector',
                title: intl.formatMessage({ id: 'sector' }),
                type: 'string',
            },
        ]
    }

    getDetails = data => {
        const { match } = this.props
        switch (match.params.type) {
            case 'api':
            case 'apia':
                return (
                    <Paper className="m-3 p-3">
                        <Table>
                            <TableBody>
                                <TableRow key={generateKey()}>
                                    <TableCell className="font-weight-bold">
                                        <FormattedMessage id="object" />
                                    </TableCell>
                                    <TableCell>{data.object}</TableCell>
                                </TableRow>
                                <TableRow key={generateKey()}>
                                    <TableCell className="font-weight-bold">
                                        <FormattedMessage id="job_estimed" />
                                    </TableCell>
                                    <TableCell>{data.job_estimed}</TableCell>
                                </TableRow>
                                {data.type === 1 && (
                                    <TableRow key={generateKey()}>
                                        <TableCell className="font-weight-bold">
                                            <FormattedMessage id="regime" />
                                        </TableCell>
                                        <TableCell>{data.regime}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                )

            case 'entreprise-en-difficulté':
                return (
                    <Paper className="m-3 p-3">
                        <Table>
                            <TableBody>
                                <TableRow key={generateKey()}>
                                    <TableCell className="font-weight-bold">
                                        <FormattedMessage id="activity_cessation" />
                                    </TableCell>
                                    <TableCell>
                                        {data.activiry_cessation}
                                    </TableCell>
                                </TableRow>
                                <TableRow key={generateKey()}>
                                    <TableCell className="font-weight-bold">
                                        <FormattedMessage id="duration" />
                                    </TableCell>
                                    <TableCell>{data.duration}</TableCell>
                                </TableRow>
                                <TableRow key={generateKey()}>
                                    <TableCell className="font-weight-bold">
                                        <FormattedMessage id="number_job_lost" />
                                    </TableCell>
                                    <TableCell>
                                        {data.number_job_lost}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                )
            default:
                return null
        }
    }

    onAdd = () => {
        const { history, match } = this.props
        history.push({
            pathname: `${match.params.type}/ajouter`,
        })
    }

    render() {
        const { intl, language, loading } = this.props
        const { type } = this.state
        return (
            <MuiTable
                key={generateKey()}
                title={intl.formatMessage({ id: type })}
                intl={intl}
                columns={this.columns}
                list={this.getList()}
                language={language}
                details={this.getDetails}
                add={this.onAdd}
                hideActions
                isLoading={loading}
            />
        )
    }
}

ListProjectInvestment.propTypes = {
    getAllInvestmentProject: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    investProject: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool,
}

ListProjectInvestment.defaultProps = {
    loading: false,
}

const mapStateToProps = state => {
    return {
        language: state.info.language,
        response: state.InvestmentProject.getAllInvestmentProject.response,
        success: state.InvestmentProject.getAllInvestmentProject.success,
        investProject: state.InvestmentProject.getAllInvestmentProject.response,
        error: state.InvestmentProject.getAllInvestmentProject.error,
        loading: state.InvestmentProject.getAllInvestmentProject.loading,
    }
}

const mapDispatchToProps = dispatch => ({
    getAllInvestmentProject: payload =>
        dispatch(
            getAllInvestmentProjectActions.getAllInvestmentProjectRequest(
                payload
            )
        ),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(ListProjectInvestment))
