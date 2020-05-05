import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

/**
 * Alert Dialog
 * @param props
 * @returns {*}
 * @constructor
 */
function AlertDialog(props) {
    const { actions, handleClose, header, body, content } = props
    const fullWidth = content && { fullWidth: true, maxWidth: 'lg' }
    return (
        <Dialog
            open
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            {...fullWidth}
        >
            <DialogTitle id="alert-dialog-title">
                {header.show && header.element}
            </DialogTitle>
            <DialogContent>
                {body.show && (
                    <DialogContentText id="alert-dialog-description">
                        {body.element}
                    </DialogContentText>
                )}
                {content}
            </DialogContent>
            {actions.show && <DialogActions>{actions.element}</DialogActions>}
        </Dialog>
    )
}

/**
 * AlertDialog: Default Props
 * @type {{header: {show: boolean}, body: {show: boolean}, actions: boolean}}
 */
AlertDialog.defaultProps = {
    actions: { show: false, element: '' },
    header: { show: false, element: '' },
    content: null,
    body: { show: false, element: '' },
}
/**
 * AlertDialog: PropTypes
 * @type {{handleClose: *, header: *, body: *, actions: *}}
 */
AlertDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    header: PropTypes.shape({
        show: PropTypes.bool,
        element: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    }),
    content: PropTypes.node,
    body: PropTypes.shape({
        show: PropTypes.bool,
        element: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    }),
    actions: PropTypes.shape({
        show: PropTypes.bool,
        element: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    }),
}

export default AlertDialog
