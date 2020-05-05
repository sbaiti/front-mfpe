import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import MaterialTable from 'material-table'
import Immutable from 'seamless-immutable'
import { maxBy, minBy } from 'lodash'
import { getDate, formatDate } from '../../../shared/utility'
import FilterByDate from './custom/filter/filterByDate'
import { filterTable } from './custom/common'
import localization from './custom/localization'
import CustomToolbar from './custom/toolbar'
import CustomPagination from './custom/pagination'
import CustomFilter from './custom/filter/filter'
import emptyTable from './custom/empty'

class MuiTable extends React.Component {
    tableRef = React.createRef()

    constructor(props) {
        super(props)
        const lastDemand = maxBy(props.list, e => {
            return e.createdAt
        })

        const firstDemand = minBy(props.list, e => {
            return e.createdAt
        })
        this.isArchive = props.startDate && props.endDate && true
        if (this.isArchive) {
            this.maxDate = getDate(new Date())
            this.minDate = getDate(new Date('2019'))
            this.selectedMinDate = getDate(props.startDate) || null
            this.selectedMaxDate = getDate(props.endDate) || null
        } else {
            this.maxDate = getDate((lastDemand || {}).createdAt)
            this.minDate = getDate((firstDemand || {}).createdAt)
            this.selectedMinDate = this.minDate || null
            this.selectedMaxDate = this.maxDate || null
        }
        this.filteredData = props.list

        this.filterValues = props.filterByDate
            ? {
                  dateDepotPeriod: {
                      min: this.selectedMinDate,
                      max: this.selectedMaxDate,
                  },
              }
            : {}
    }

    componentWillReceiveProps(nextProps) {
        if (this.isArchive) {
            this.selectedMinDate = getDate(nextProps.startDate) || null
            this.selectedMaxDate = getDate(nextProps.endDate) || null
        }
        if (this.tableRef.current) this.tableRef.current.onQueryChange()
    }

    /**
     * On Handle Filter Search
     * @param selectedMin
     * @param selectedMax
     */
    onHandleFilterSearch = (selectedMin, selectedMax) => {
        const { startDate, endDate, getNewList, filterByDate } = this.props
        if (startDate && endDate) {
            getNewList(formatDate(selectedMin), formatDate(selectedMax))
            return
        }
        const dateFilter = filterByDate
            ? {
                  dateDepotPeriod: { min: selectedMin, max: selectedMax },
              }
            : {}
        const newFilterValues = {
            ...this.filterValues,
            ...dateFilter,
        }
        this.filterValues = newFilterValues
        this.selectedMinDate = selectedMin
        this.selectedMaxDate = selectedMax
        this.tableRef.current.onQueryChange()
    }

    /**
     * Column Filter Change
     * @param search
     * @param column
     */
    columnFilterChange = (search, column) => {
        const newFilterValues = { ...this.filterValues, [column]: search }
        this.filterValues = newFilterValues
        this.tableRef.current.onQueryChange()
    }

    /**
     * Toggle Filter By Date
     * @returns {boolean|*}
     */
    toggleFilterByDate = () => {
        const { filterByDate, language, intl } = this.props

        const { list } = this.props
        if (filterByDate) {
            return (
                <FilterByDate
                    language={language}
                    intl={intl}
                    list={list}
                    isOpen={this.isArchive || false}
                    onHandleFilterSearch={this.onHandleFilterSearch}
                    minDate={this.minDate}
                    maxDate={this.maxDate}
                    selectedMinDate={this.selectedMinDate || null}
                    selectedMaxDate={this.selectedMaxDate || null}
                    reset={() =>
                        this.onHandleFilterSearch(this.minDate, this.maxDate)
                    }
                />
            )
        }
        return false
    }

    /**
     * Get List Table
     * @returns {*}
     */
    getListTable = () => {
        const {
            intl,
            details,
            columns,
            edit,
            add,
            remove,
            language,
            exportTable,
            hideActions,
            isLoading,
            title,
            otherActions,
            list,
        } = this.props
        const mutable = []
        list.forEach(e => {
            mutable.push(Immutable.asMutable(e))
        })

        return (
            <MaterialTable
                tableRef={this.tableRef}
                options={{
                    filtering: true,
                    actionsColumnIndex: -1,
                    showTitle: false,
                }}
                detailPanel={
                    details
                        ? [
                              {
                                  tooltip:
                                      language === 'ar'
                                          ? 'التفاصيل'
                                          : 'Détails',
                                  render: rowData => details(rowData),
                              },
                          ]
                        : []
                }
                columns={columns.map(c => {
                    return {
                        ...c,
                        cellStyle: { textAlign: 'inherit' },
                        headerStyle: { textAlign: 'inherit' },
                    }
                })}
                data={query => {
                    return new Promise(resolve => {
                        this.filteredData = filterTable(
                            list,
                            columns,
                            query.search,
                            this.filterValues
                        )
                        const m = []
                        this.filteredData
                            .slice(
                                query.pageSize * query.page,
                                query.pageSize * (query.page + 1)
                            )
                            .forEach(e => {
                                m.push(Immutable.asMutable(e))
                            })
                        resolve({
                            data: m,
                            page: query.page,
                            totalCount: this.filteredData.length,
                        })
                    })
                }}
                actions={
                    hideActions
                        ? [
                              {
                                  icon: '',
                                  isFreeAction: true,
                              },
                          ]
                        : [
                              rowData =>
                                  edit && {
                                      icon: 'edit',
                                      tooltip: 'Modifier',
                                      onClick: () => {
                                          edit(rowData.id)
                                      },
                                      hidden: rowData.noEdit === false,
                                  },
                              rowData =>
                                  remove && {
                                      icon: 'delete',
                                      tooltip: 'Supprimer',
                                      onClick: () => {
                                          remove(rowData.id)
                                      },
                                      hidden: rowData.noEdit === false,
                                  },
                              ...otherActions,
                          ]
                }
                localization={localization({ intl })}
                components={{
                    Toolbar: properties => (
                        <CustomToolbar
                            toggleFilterByDate={this.toggleFilterByDate}
                            add={add}
                            properties={properties}
                        />
                    ),
                    Pagination: properties => (
                        <CustomPagination
                            properties={properties}
                            exportTable={exportTable}
                            intl={intl}
                            columns={columns}
                            language={language}
                            title={title}
                            filteredData={this.filteredData}
                        />
                    ),
                    FilterRow: filters => (
                        <CustomFilter
                            filters={filters}
                            columnFilterChange={this.columnFilterChange}
                            intl={intl}
                            details={details}
                        />
                    ),
                }}
                isLoading={isLoading}
            />
        )
    }

    render() {
        const { list, add } = this.props
        if (!list.length) {
            return emptyTable(add)
        }
        return this.getListTable()
    }
}

MuiTable.defaultProps = {
    edit: false,
    remove: false,
    details: false,
    add: false,
    exportTable: true,
    hideActions: false,
    filterByDate: false,
    startDate: '',
    endDate: '',
    title: '',
    getNewList: () => {},
    // customFilters: false,
    isLoading: false,
    otherActions: [],
}

MuiTable.propTypes = {
    language: PropTypes.string.isRequired,
    title: PropTypes.string,
    hideActions: PropTypes.bool,
    // customFilters: PropTypes.bool,
    filterByDate: PropTypes.bool,
    intl: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    exportTable: PropTypes.bool,
    add: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    edit: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    remove: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    details: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    isLoading: PropTypes.bool,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    getNewList: PropTypes.any,
    otherActions: PropTypes.array,
}
export default injectIntl(MuiTable)
