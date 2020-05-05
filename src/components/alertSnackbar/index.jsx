import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from '@material-ui/core'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import ErrorIcon from '@material-ui/icons/Error'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

/**
 * Alert Dialog
 * @param props
 * @returns {*}
 * @constructor
 */
function Index(props) {
    const { handleAlert, body, variant, autoBack, autoHideDuration } = props
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (handleAlert) {
            setOpen(true)
        }
    }, [handleAlert])

    const handleClose = () => {
        setOpen(false)
        if (autoBack) {
            window.history.back()
        }
    }

    return (
        <Snackbar
            variant={variant}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{body}</span>}
            disableWindowBlurListener
        >
            <SnackbarContent
                className={variant === 'success' ? 'bg-success' : 'bg-danger'}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar">
                        {variant === 'success' ? (
                            <CheckCircleIcon className="mx-3" />
                        ) : (
                            <ErrorIcon className="mx-3" />
                        )}
                        {body}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    )
}

/**
 * AlertSnackbar: Default Props
 * @type {{header: {show: boolean}, body: {show: boolean}, actions: boolean}}
 */
Index.defaultProps = {
    handleAlert: true,
    variant: 'error',
    autoBack: false,
    autoHideDuration: 6000,
}
/**
 * AlertSnackbar: PropTypes
 * @type {{handleClose: *, header: *, body: *, actions: *}}
 */
Index.propTypes = {
    handleAlert: PropTypes.bool,
    body: PropTypes.string.isRequired,
    variant: PropTypes.string,
    autoBack: PropTypes.bool,
    autoHideDuration: PropTypes.number,
}

export default Index
