import React from 'react'
import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

import { FilterList } from '@material-ui/icons'
import ACSelect from '../../../select/autoCompleteSelect'

const ColumnFilter = ({ type, onchange, list, intl }) => {
    switch (type) {
        case 'string':
            return (
                <div className="d-flex flex-nowrap align-items-center">
                    <FilterList />
                    <TextField
                        className="w-100"
                        onChange={e => {
                            onchange(e.target.value)
                        }}
                        InputProps={{
                            style: { height: 40 },
                        }}
                    />{' '}
                </div>
            )

        case 'multiple':
            return (
                <ACSelect
                    suggestions={list.map(i => ({ id: i.id, label: i.value }))}
                    onChange={onchange}
                    intl={intl}
                />
            )

        default:
            return ''
    }
}
ColumnFilter.propTypes = {
    type: PropTypes.string,
    onchange: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    list: PropTypes.array,
}
ColumnFilter.defaultProps = {
    type: 'text',
    list: [],
}
export default ColumnFilter
