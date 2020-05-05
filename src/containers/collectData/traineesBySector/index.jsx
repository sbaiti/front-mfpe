/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper, TableRow, TableCell, TableBody, Table } from '@material-ui/core'
import { formatDate } from '../../profile/common'
import getTraineesBySectorActions from '../../../redux/collectData/getTraineesBySector'
import setPageTitleActions from '../../../redux/pageTitle'
import MuiTable from '../../../components/ui/table'
import generateKey, {
    getTranslatedAttribute,
    getMonthName,
} from '../../../shared/utility'

/**
 * display listTraineesBySector list
 *
 * @class listTraineesBySector
 * @extends {React.Component}
 */
class listTraineesBySector extends React.Component {
    /**
     * Creates an instance of listTraineesBySector.
     * @param {*} props
     * @memberof listTraineesBySector
     */
    constructor(props) {
        super(props)
        this.state = { type: props.match.params.type }
        this.columns = this.getColumns()
        props.getTraineesBySector({ ...this.getParams() })
        props.setPageTitle(props.match.params.type)
    }

    static getDerivedStateFromProps(props, state) {
        if (state.type !== props.match.params.type) {
            let params = []
            switch (props.match.params.type) {
                case 'diplomé-secteur-privé':
                    params = { level: 0, sectorType: 'false' }
                    break
                case 'diplomé-secteur-public':
                    params = { level: 0, sectorType: 'true' }
                    break
                case 'inscrit-secteur-privé':
                    params = { level: 1, sectorType: 'false' }
                    break
                case 'inscrit-secteur-public':
                    params = { level: 1, sectorType: 'true' }
                    break
                default:
                    params = { level: 0, sectorType: 'false' }
                    break
            }
            props.setPageTitle(props.match.params.type)
            props.getTraineesBySector(params)

            return { type: props.match.params.type }
        }
        return {}
    }

    getParams = () => {
        const { match } = this.props
        switch (match.params.type) {
            case 'diplomé-secteur-privé':
                return { level: 0, sectorType: 'false' }
            case 'diplomé-secteur-public':
                return { level: 0, sectorType: 'true' }
            case 'inscrit-secteur-privé':
                return { level: 1, sectorType: 'false' }
            case 'inscrit-secteur-public':
                return { level: 1, sectorType: 'true' }
            default:
                return { level: 0, sectorType: 'false' }
        }
    }

    getList = data => {
        const { language, intl } = this.props
        const list = (data || []).map(d => {
            return {
                administrativeYear: d.administrativeYear,
                createdAt: d.createdAt || formatDate(new Date()),
                month: getMonthName(language, d.month),
                approved: intl.formatMessage({ id: d.approved ? 'yes' : 'no' }),
                sector: d.sector[getTranslatedAttribute(language)],
                speciality: (d.speciality || {})[
                    getTranslatedAttribute(language)
                ],
                subsector: d.subsector[getTranslatedAttribute(language)],
                trainingCenter:
                    d.trainingCenter[getTranslatedAttribute(language)],
                levelStudy: d.levelStudy,
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
                field: 'trainingCenter',
                title: intl.formatMessage({ id: 'centername' }),
                type: 'string',
            },
            {
                field: 'sector',
                title: intl.formatMessage({ id: 'sector' }),
                type: 'string',
            },
            {
                field: 'subsector',
                title: intl.formatMessage({ id: 'subsector' }),
                type: 'string',
            },
            {
                field: 'speciality',
                title: intl.formatMessage({ id: 'speciality' }),
                type: 'string',
            },
            {
                field: 'approved',
                title: intl.formatMessage({ id: 'approved' }),
                type: 'string',
            },
            {
                field: 'administrativeYear',
                title: intl.formatMessage({ id: 'administrativeyear' }),
                type: 'string',
            },
            {
                field: 'month',
                title: intl.formatMessage({ id: 'month' }),
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
                        {data.levelStudy.map(level => [
                            level.level !== 0 && (
                                <TableRow key={generateKey()}>
                                    <TableCell
                                        colSpan="2"
                                        className="font-weight-bold bg-light"
                                    >
                                        <FormattedMessage
                                            id={`level${level.level}`}
                                        />
                                    </TableCell>
                                </TableRow>
                            ),
                            <TableRow key={generateKey()}>
                                <TableCell>
                                    <FormattedMessage id="nbrTrainedWomen" />
                                </TableCell>
                                <TableCell>{level.nbrTrainedF}</TableCell>
                            </TableRow>,
                            <TableRow key={generateKey()}>
                                <TableCell>
                                    <FormattedMessage id="nbrTrainedMen" />
                                </TableCell>
                                <TableCell>{level.nbrTrainedH}</TableCell>
                            </TableRow>,
                            <TableRow key={generateKey()}>
                                <TableCell>
                                    <FormattedMessage id="nbr_total" />
                                </TableCell>
                                <TableCell>{level.nbrTotal}</TableCell>
                            </TableRow>,
                            <TableRow key={generateKey()}>
                                <TableCell>
                                    <FormattedMessage id="nbrForeigner" />
                                </TableCell>
                                <TableCell>{level.nbrForeigner}</TableCell>
                            </TableRow>,
                            level.nbrAbundant !== undefined && (
                                <TableRow key={generateKey()}>
                                    <TableCell>
                                        <FormattedMessage id="nbrAbundant" />
                                    </TableCell>
                                    <TableCell>{level.nbrAbundant}</TableCell>
                                </TableRow>
                            ),
                        ])}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    render() {
        const { traineesBySector, intl, language, loading } = this.props
        const { type } = this.state
        const list = this.getList(traineesBySector)
        return (
            <MuiTable
                key={generateKey()}
                title={intl.formatMessage({ id: type })}
                intl={intl}
                columns={this.columns}
                list={list}
                language={language}
                details={this.getDetails}
                add={this.onAdd}
                hideActions
                isLoading={loading}
            />
        )
    }
}

listTraineesBySector.propTypes = {
    getTraineesBySector: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    traineesBySector: PropTypes.array,
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool,
}

listTraineesBySector.defaultProps = {
    traineesBySector: [],
    loading: false,
}

const mapStateToProps = ({ collectData, info }) => {
    const { getTraineesBySector } = collectData
    return {
        language: info.language,
        traineesBySector: getTraineesBySector.response,
        error: getTraineesBySector.error,
        loading: getTraineesBySector.loading,
    }
}
const mapDispatchToProps = dispatch => ({
    getTraineesBySector: payload =>
        dispatch(
            getTraineesBySectorActions.getTraineesBySectorRequest(payload)
        ),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(listTraineesBySector))
