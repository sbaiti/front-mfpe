/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import alertActions from '../../../redux/alert'

class Alert extends React.Component {
    static propTypes = {
        warning: PropTypes.bool,
        show: PropTypes.bool,
        error: PropTypes.bool,
        success: PropTypes.bool,
        info: PropTypes.bool,
        title: PropTypes.string,
        message: PropTypes.string,
        onHideAlert: PropTypes.func.isRequired,
        onConfirm: PropTypes.func,
        language: PropTypes.string.isRequired,
    }

    static defaultProps = {
        onConfirm: null,
        warning: false,
        show: false,
        error: false,
        success: false,
        info: false,
        message: '',
        title: '',
    }

    constructor(props) {
        super(props)
        this.state = { confirmDelete: false }
    }

    componentWillReceiveProps() {}

    hideAlert = () => {
        const { onHideAlert } = this.props
        onHideAlert()
        this.setState({ confirmDelete: false })
    }

    onConfirm = () => {
        const { onConfirm, onHideAlert } = this.props
        if (onConfirm) {
            onConfirm()
        } else {
            this.setState({ confirmDelete: false })
        }
        onHideAlert()
    }

    render() {
        const { confirmDelete } = this.state
        const {
            error,
            info,
            success,
            warning,
            title,
            message,
            show,
            onConfirm,
            language,
        } = this.props
        return (
            <div>
                {show && (
                    <SweetAlert
                        showCancel={onConfirm || (onConfirm && !error)}
                        cancelBtnText={language === 'ar' ? 'لا' : 'Non'}
                        confirmBtnBsStyle={
                            error || warning ? 'danger' : 'default'
                        }
                        confirmBtnText={
                            onConfirm
                                ? language === 'ar'
                                    ? 'نعم'
                                    : 'Oui'
                                : 'x'
                        }
                        confirmBtnCssClass={
                            onConfirm ? 'ConfirmBtnAlert' : 'closeBtnAlert'
                        }
                        cancelBtnBsStyle="default"
                        onCancel={() => this.hideAlert()}
                        error={error || confirmDelete}
                        info={info}
                        warning={warning}
                        success={success || confirmDelete}
                        title={
                            confirmDelete
                                ? language === 'ar'
                                    ? 'نعم'
                                    : 'Succès'
                                : title
                        }
                        onConfirm={() => this.onConfirm()}
                    >
                        {confirmDelete
                            ? language === 'ar'
                                ? 'نعم'
                                : 'تم الحذف بنجاح'
                            : message}
                    </SweetAlert>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onHideAlert: () => dispatch(alertActions.alertHide()),
})
const mapStateToProps = state => {
    return {
        language: state.info.language,
        warning: state.alert.infos.warning,
        show: state.alert.show,
        error: state.alert.infos.error,
        success: state.alert.infos.success,
        info: state.alert.infos.info,
        title: state.alert.infos.title,
        message: state.alert.infos.message,
        onConfirm: state.alert.infos.onConfirm,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alert)
