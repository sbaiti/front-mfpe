import { MTableToolbar } from 'material-table'
import React from 'react'
import { Button } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'

const CustomToolbar = ({ properties, toggleFilterByDate, add }) => (
    <div>
        <MTableToolbar {...properties} />

        <div
            style={{
                padding: '0px 26px',
                display: 'flow-root',
            }}
        >
            {add && (
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={add}
                >
                    <FormattedMessage id="add" />
                </Button>
            )}
        </div>
        {toggleFilterByDate()}
    </div>
)
CustomToolbar.propTypes = {
    properties: PropTypes.any.isRequired,
    toggleFilterByDate: PropTypes.func.isRequired,
    add: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
}

export default CustomToolbar
