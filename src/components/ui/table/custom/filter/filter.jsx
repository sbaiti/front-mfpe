/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import ColumnFilter from './filterByColumn'

const CustomFilter = ({ filters, columnFilterChange, intl }) => (
    <tr>
        <td></td>
        {filters.columns.map((c, index) => {
            if (c.filter === false) return <td key={`${index}${c.field}`}></td>
            const type = c.type || (c.lookup ? 'multiple' : 'string')
            return (
                <td key={`${index}${c.field}`}>
                    <ColumnFilter
                        intl={intl}
                        type={type}
                        onchange={e => columnFilterChange(e, c.field)}
                        list={
                            c.lookup
                                ? Object.keys(c.lookup).map(key => ({
                                      id: key,
                                      value: c.lookup[key],
                                  }))
                                : []
                        }
                    />
                </td>
            )
        })}
    </tr>
)
CustomFilter.propTypes = {
    filters: PropTypes.any.isRequired,
    intl: PropTypes.object.isRequired,
    columnFilterChange: PropTypes.func.isRequired,
}

export default CustomFilter
