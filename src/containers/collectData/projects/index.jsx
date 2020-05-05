/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper, TableRow, TableCell, TableBody, Table } from '@material-ui/core'
import { formatDate } from '../../profile/common'
import setPageTitleActions from '../../../redux/pageTitle'
import getAllProjectsActions from '../../../redux/projects/getAllProjects'
import MuiTable from '../../../components/ui/table'
import generateKey, { getTranslatedAttribute } from '../../../shared/utility'

/**
 * display Project list
 *
 * @class ListProject
 * @extends {React.Component}
 */
class ListProject extends React.Component {
    /**
     * Creates an instance of ListProject.
     * @param {*} props
     * @memberof ListProject
     */
    constructor(props) {
        super(props)
        this.state = { type: props.match.params.type }
        this.columns = this.getColumns()
        props.getAllProjects({ ...this.getParams() })
        props.setPageTitle(props.match.params.type)
    }

    static getDerivedStateFromProps(props, state) {
        if (state.type !== props.match.params.type) {
            let params = []
            switch (props.match.params.type) {
                case 'projets_publics':
                    params = { type: 'true' }
                    break
                case 'projets_coopération_internationale':
                    params = { type: 'false' }
                    break
                default:
                    break
            }
            props.getAllProjects(params)
            props.setPageTitle(props.match.params.type)
            return { type: props.match.params.type }
        }
        return {}
    }

    getParams = () => {
        const { match } = this.props
        switch (match.params.type) {
            case 'projets_publics':
                return { type: 'true' }
            case 'projets_coopération_internationale':
                return { type: 'false' }
            default:
                return null
        }
    }

    getList = () => {
        const { allProject, language } = this.props
        const list = (allProject || []).map(d => {
            return {
                titleProject: d.titleProject,
                governorat: d.governorat[getTranslatedAttribute(language)],
                createdAt: d.createdAt || formatDate(new Date()),
                delegation: d.delegation[getTranslatedAttribute(language)],
                sector: d.sector[getTranslatedAttribute(language)],
                typeProject: d.typeProject,
                projectManager: d.projectManager,
                projectCost: d.projectCost,
                projectCostUpdated: d.projectCostUpdated,
                finance: d.finance,
                expenseExtimed: d.expenseExtimed,
                expenseReal: d.expenseReal,
                typeFinance: d.typeFinance,
                registrationProjectYear: d.registrationProjectYear,
                projectProgress: d.projectProgress,
                projectProgressPercent: d.projectProgressPercent,
                projectDuration: d.projectDuration,
                projectComponent: d.projectComponent,
                targetPopulation: d.targetPopulation,
                numberBeneficiarie: d.numberBeneficiarie,
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
                field: 'titleProject',
                title: intl.formatMessage({ id: 'intituleProjet' }),
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
            {
                field: 'typeProject',
                title: intl.formatMessage({ id: 'projectType' }),
                type: 'string',
            },
        ]
    }

    onAdd = () => {
        const { history, match } = this.props
        history.push({
            pathname: `${match.params.type}/ajouter`,
        })
    }

    getDetails = data => {
        return (
            <Paper className="m-3 p-3">
                <Table>
                    <TableBody>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="projectManager" />
                            </TableCell>
                            <TableCell>{data.projectManager}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="projectCost" />
                            </TableCell>
                            <TableCell>{data.projectCost}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="projectCostUpdated" />
                            </TableCell>
                            <TableCell>{data.projectCostUpdated}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="finance" />
                            </TableCell>
                            <TableCell>{data.finance}</TableCell>
                        </TableRow>
                        {data.type && (
                            <Fragment>
                                <TableRow key={generateKey()}>
                                    <TableCell className="font-weight-bold">
                                        <FormattedMessage id="expenseEstimed" />
                                    </TableCell>
                                    <TableCell>{data.expenseExtimed}</TableCell>
                                </TableRow>

                                <TableRow key={generateKey()}>
                                    <TableCell className="font-weight-bold">
                                        <FormattedMessage id="expenseReal" />
                                    </TableCell>
                                    <TableCell>{data.expenseReal}</TableCell>
                                </TableRow>
                            </Fragment>
                        )}
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="typeFinance" />
                            </TableCell>
                            <TableCell>{data.typeFinance}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="registrationProjectYear" />
                            </TableCell>
                            <TableCell>
                                {data.registrationProjectYear}
                            </TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="projectDuration" />
                            </TableCell>
                            <TableCell>{data.projectDuration}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="projectProgress" />
                            </TableCell>
                            <TableCell>{data.projectProgress}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="projectProgressPercent" />
                            </TableCell>
                            <TableCell>{data.projectProgressPercent}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="projectComponent" />
                            </TableCell>
                            <TableCell>{data.projectComponent}</TableCell>
                        </TableRow>
                        {!data.type && (
                            <Fragment>
                                <TableRow key={generateKey()}>
                                    <TableCell className="font-weight-bold">
                                        <FormattedMessage id="targetPopulation" />
                                    </TableCell>
                                    <TableCell>
                                        {data.targetPopulation}
                                    </TableCell>
                                </TableRow>
                                <TableRow key={generateKey()}>
                                    <TableCell className="font-weight-bold">
                                        <FormattedMessage id="numberBeneficiarie" />
                                    </TableCell>
                                    <TableCell>
                                        {data.numberBeneficiarie}
                                    </TableCell>
                                </TableRow>
                            </Fragment>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        )
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

ListProject.propTypes = {
    getAllProjects: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    allProject: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool,
}

ListProject.defaultProps = {
    loading: false,
}

const mapStateToProps = state => {
    return {
        language: state.info.language,
        response: state.projects.getAllProjects.response,
        success: state.projects.getAllProjects.success,
        allProject: state.projects.getAllProjects.response,
        error: state.projects.getAllProjects.error,
        loading: state.projects.getAllProjects.loading,
    }
}

const mapDispatchToProps = dispatch => ({
    getAllProjects: payload =>
        dispatch(getAllProjectsActions.getAllProjectsRequest(payload)),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(ListProject))
