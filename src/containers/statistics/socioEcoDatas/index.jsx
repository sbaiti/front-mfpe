/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropType from 'prop-types'
import { injectIntl } from 'react-intl'
import MaterialTable, { MTableToolbar } from 'material-table'
import { Divider } from '@material-ui/core'
import CustomPagination from '../../../components/ui/table/custom/pagination'
import { getTranslatedAttribute } from '../../../shared/utility'
import Form from '../../../components/ui/form'
import generalStatistics from './data/generalStatistics'
import educationalHealth from './data/educationalHealth'
import regionalProjects from './data/regionalProjects'
import FilterTable from '../common/filterTable'
import localization from '../../../components/ui/table/custom/localization'
import setPageTitleActions from '../../../redux/pageTitle'
import {
    generalStatisticsColumns,
    educationalHealthColumns,
    regionalProjectsColumns,
} from './columns'

const List = props => {
    const { intl, setPageTitle, allReferentiels, language } = props
    const [pageTitleSet, handlePageTitleSet] = useState(false)
    const [filterState, setFilterState] = useState({})
    const allGovernorates = allReferentiels.referenciels.RefGouvernorat.map(
        i => ({
            label: i[getTranslatedAttribute(language)],
            value: i.id,
        })
    )
    if (!pageTitleSet) {
        setPageTitle('donnéesSocioéconomiques')
        handlePageTitleSet(true)
    }

    const renderFilter = tableIndex => {
        const formElments = [
            {
                name: 'governorate',
                label: intl.formatMessage({ id: 'governorate' }),
                list: allGovernorates || [],
                type: 'select',
                required: false,
            },
            {
                name: 'year',
                label: intl.formatMessage({ id: 'year' }),
                props: { format: 'yyyy', views: ['year'] },
                type: 'date',
                required: false,
            },
        ]
        return (
            <div className="d-flex p-2 align-items-center justify-content-center w-100">
                <Form
                    formElements={formElments}
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
                title={intl.formatMessage({ id: 'generalStatistics' })}
                data={generalStatistics || []}
                columns={generalStatisticsColumns(intl)}
                isLoading={generalStatistics === null}
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
                                {renderFilter('0')}
                            </FilterTable>
                        </div>
                    ),
                    Pagination: properties => (
                        <CustomPagination
                            properties={properties}
                            exportTable
                            intl={intl}
                            columns={generalStatisticsColumns(intl)}
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
                    id: 'educationalInstitutions&health',
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
                                    console.log(filterState['1'])
                                    // TODO call search api with params ...filterState
                                }}
                                onReset={() =>
                                    setFilterState({ ...filterState, '1': {} })
                                }
                                isOpen={filterState['1'] !== null}
                            >
                                {renderFilter('1')}
                            </FilterTable>
                        </div>
                    ),
                    Pagination: properties => (
                        <CustomPagination
                            properties={properties}
                            exportTable
                            intl={intl}
                            columns={educationalHealthColumns(intl)}
                            language={language}
                            title={intl.formatMessage({
                                id: 'educationalInstitutions&health',
                            })}
                            filteredData={educationalHealth || []}
                        />
                    ),
                }}
            />
            <Divider className="mb-3" />
            <MaterialTable
                title={intl.formatMessage({
                    id: 'regionalProjects',
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
                                    console.log(filterState['2'])
                                    // TODO call search api with params ...filterState
                                }}
                                onReset={() =>
                                    setFilterState({ ...filterState, '2': {} })
                                }
                                isOpen={filterState['2'] !== null}
                            >
                                {renderFilter('2')}
                            </FilterTable>
                        </div>
                    ),
                    Pagination: properties => (
                        <CustomPagination
                            properties={properties}
                            exportTable
                            intl={intl}
                            columns={regionalProjectsColumns(intl)}
                            language={language}
                            title={intl.formatMessage({
                                id: 'regionalProjects',
                            })}
                            filteredData={regionalProjects || []}
                        />
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
    language: PropType.string.isRequired,
}

const mapStateToProps = ({ referencial, info }) => ({
    language: info.language,
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
