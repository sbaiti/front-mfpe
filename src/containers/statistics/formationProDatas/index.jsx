/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropType from 'prop-types'
import { injectIntl } from 'react-intl'
import MaterialTable, { MTableToolbar } from 'material-table'
import { Divider, TableHead, TableRow, TableCell } from '@material-ui/core'
import CustomPagination from '../../../components/ui/table/custom/pagination'
import Form from '../../../components/ui/form'
import generalStatistics from './data/proFormation'
import educationalHealth from './data/educationalHealth'
import regionalProjects from './data/regionalProjects'
import FilterTable from '../common/filterTable'
import localization from '../../../components/ui/table/custom/localization'
import setPageTitleActions from '../../../redux/pageTitle'
import {
    proFormationColumns,
    educationalHealthColumns,
    regionalProjectsColumns,
} from './columns'
import { formElements } from './formFields'

const List = props => {
    const { intl, setPageTitle, allReferentiels, language, centersList } = props
    const [pageTitleSet, handlePageTitleSet] = useState(false)

    const [filterState, setFilterState] = useState({})
    if (!pageTitleSet) {
        setPageTitle('trainingData')
        handlePageTitleSet(true)
    }

    const renderFilter = tableIndex => {
        return (
            <div className="d-flex p-2 align-items-center justify-content-center w-100">
                <Form
                    formElements={formElements(
                        allReferentiels,
                        centersList,
                        language,
                        intl,
                        tableIndex
                    )}
                    errorsList={
                        {
                            // TODO handle search errors
                        }
                    }
                    payload={filterState[tableIndex] || {}}
                    fieldChangedHandler={({ target: { value } }, name) => {
                        setFilterState({
                            ...filterState,
                            [tableIndex]: {
                                ...filterState[tableIndex],
                                [name]: value,
                            },
                        })
                    }}
                    language={language}
                />
            </div>
        )
    }

    return (
        <div className="p-2">
            <MaterialTable
                title={intl.formatMessage({ id: 'professionalTraining' })}
                data={generalStatistics || []}
                columns={proFormationColumns(intl)}
                isLoading={generalStatistics === null}
                localization={localization({ intl })}
                components={{
                    Header: headerProps => {
                        return (
                            <TableHead>
                                {headerProps.columns.map((c, i) => (
                                    <TableRow key={i}>
                                        {c.map((s, k) => (
                                            <TableCell
                                                key={s.field + k}
                                                className="border align-bottom"
                                                align="center"
                                                rowSpan={s.rowSpan}
                                                colSpan={s.colSpan}
                                            >
                                                {s.title}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>
                        )
                    },
                    Row: rowProps => {
                        return (
                            <TableRow>
                                {Object.values(rowProps.data)
                                    .filter(v => typeof v === 'string')
                                    .map((v, k) => (
                                        <TableCell key={v + k}>{v}</TableCell>
                                    ))}
                            </TableRow>
                        )
                    },
                    Toolbar: properties => (
                        <div>
                            <MTableToolbar {...properties} />
                            <FilterTable
                                onSubmit={() => {
                                    console.log(filterState['0'])
                                    // TODO call search api with params ...filterState
                                }}
                                onReset={() =>
                                    setFilterState({ ...filterState, '0': {} })
                                }
                                isOpen={filterState['0'] !== null}
                            >
                                {renderFilter('0')}
                            </FilterTable>
                        </div>
                    ),
                    Pagination: properties => (
                        <CustomPagination
                            properties={properties}
                            exportTable
                            intl={intl}
                            columns={proFormationColumns(intl)}
                            language={language}
                            title={intl.formatMessage({
                                id: 'generalStatistics',
                            })}
                            filteredData={generalStatistics || []}
                        />
                    ),
                }}
            />
            <Divider className="mb-3" />
            <MaterialTable
                title={intl.formatMessage({
                    id: 'publicProfessionalTraining',
                })}
                data={educationalHealth || []}
                columns={educationalHealthColumns(intl)}
                isLoading={educationalHealth === null}
                localization={localization({ intl })}
                components={{
                    Toolbar: properties => (
                        <div>
                            <MTableToolbar {...properties} />
                            <FilterTable
                                onSubmit={() => {
                                    console.log(filterState['0'])
                                    // TODO call search api with params ...filterState
                                }}
                                onReset={() =>
                                    setFilterState({ ...filterState, '0': {} })
                                }
                                isOpen={filterState['0'] !== null}
                            >
                                {renderFilter('1')}
                            </FilterTable>
                        </div>
                    ),
                }}
            />
            <Divider className="mb-3" />
            <MaterialTable
                title={intl.formatMessage({
                    id: 'numberOfPrivateCentors',
                })}
                data={regionalProjects || []}
                columns={regionalProjectsColumns(intl)}
                isLoading={regionalProjects === null}
                localization={localization({ intl })}
                components={{
                    Toolbar: properties => (
                        <div>
                            <MTableToolbar {...properties} />
                            <FilterTable
                                onSubmit={() => {
                                    console.log(filterState['0'])
                                    // TODO call search api with params ...filterState
                                }}
                                onReset={() =>
                                    setFilterState({ ...filterState, '0': {} })
                                }
                                isOpen={filterState['0'] !== null}
                            >
                                {renderFilter('2')}
                            </FilterTable>
                        </div>
                    ),
                }}
            />
        </div>
    )
}

List.propTypes = {
    setPageTitle: PropType.func.isRequired,
    intl: PropType.object.isRequired,
    allReferentiels: PropType.object.isRequired,
    centersList: PropType.array.isRequired,
    language: PropType.string.isRequired,
}
const mapStateToProps = ({ referencial, centreFormation, info }) => ({
    language: info.language,
    centersList: centreFormation.allCenters.response,
    allReferentiels: referencial.allReferencials.response,
})
const mapDispatchToProps = dispatch => {
    return {
        setPageTitle: payload =>
            dispatch(setPageTitleActions.setPageTitleRequest(payload)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(List))
