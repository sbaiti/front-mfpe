/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper, TableRow, TableCell, TableBody, Table } from '@material-ui/core'
import getAllPrivateCentersActions from '../../../redux/nombreCentreFormationsPrivees/getAllPrivateCenters'
import MuiTable from '../../../components/ui/table'
import generateKey from '../../../shared/utility'
import { getList, getColumns } from './common'
import setPageTitleActions from '../../../redux/pageTitle'

/**
 * display privatecenters list
 *
 * @class PrivateCentersList
 * @extends {React.Component}
 */
class PrivateCentersList extends React.Component {
    /**
     * Creates an instance of PrivateCentersList.
     * @param {*} props
     * @memberof PrivateCentersList
     */
    constructor(props) {
        super(props)
        this.state = { isLoading: false }
        const { intl, language, getAllPrivateCenters, setPageTitle } = props
        this.columns = getColumns(intl, language)
        setPageTitle('privateCenterNumber')
        getAllPrivateCenters()
    }

    onAdd = () => {
        const { history } = this.props
        history.push({
            pathname: `/formulaires/centres/nombre-centres-formation-privée/ajouter`,
        })
    }

    getDetails = data => {
        return (
            <Paper className="m-3 p-3">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="createdAt" />
                            </TableCell>
                            <TableCell>{data.createdAt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="governorate" />
                            </TableCell>
                            <TableCell>{data.gouvernorat}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="closedCenter" />
                            </TableCell>
                            <TableCell>
                                {data.closedTrainingCenterNumber}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="changeNumber" />
                            </TableCell>
                            <TableCell>{data.changeNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="year" />
                            </TableCell>
                            <TableCell>{data.year}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="initialNumber" />
                            </TableCell>
                            <TableCell>{data.initialNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="continusNumber" />
                            </TableCell>
                            <TableCell> {data.continusNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="initialContinusNumber" />
                            </TableCell>
                            <TableCell>{data.initialContiusNumber}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    render() {
        const { allPrivateCenters, intl, language, loading } = this.props
        const { isLoading } = this.state
        const list = getList(allPrivateCenters, language)

        return (
            <MuiTable
                key={generateKey()}
                title={intl.formatMessage({ id: 'privateCentersList' })}
                intl={intl}
                columns={this.columns}
                list={list}
                language={language}
                add={e => this.onAdd(e)}
                showTitle={false}
                isLoading={loading || isLoading}
                details={this.getDetails}
                hideActions
            />
        )
    }
}

PrivateCentersList.propTypes = {
    getAllPrivateCenters: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    allPrivateCenters: PropTypes.array,
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    loading: PropTypes.bool,
}

PrivateCentersList.defaultProps = {
    allPrivateCenters: [],
    loading: false,
}

const mapStateToProps = state => {
    return {
        language: state.info.language,
        allPrivateCenters:
            state.nombreCentreFormationsPrivees.getAllPrivateCenters.response,
        error: state.nombreCentreFormationsPrivees.getAllPrivateCenters.error,
        loading:
            state.nombreCentreFormationsPrivees.getAllPrivateCenters.loading,
    }
}
const mapDispatchToProps = dispatch => ({
    getAllPrivateCenters: () =>
        dispatch(getAllPrivateCentersActions.getAllPrivateCentersRequest()),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(PrivateCentersList))
