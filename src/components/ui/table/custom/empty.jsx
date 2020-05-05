import { FormattedMessage } from 'react-intl'
import React from 'react'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ErrorIcon from '@material-ui/icons/Error'
/**
 * Empty Table
 */
const emptyTable = add => {
    return (
        <div className="text-center my-5">
            <ErrorIcon fontSize="large" />
            <h3 className="my-5">
                <FormattedMessage id="noResult" />
            </h3>
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
    )
}
export default emptyTable
