import React from 'react'
import PropTypes from 'prop-types'
import DateExamSwitcher from './actions/DateExamSwitcher'
import AttenteDr from './actions/AttenteDr'
import PaymentOk from './actions/PaymentOk'
import ScanOk from './actions/ScanOk'
import SpecialiteChoisie from './actions/SpecialiteChoisie'
import PvUpload from './actions/PvUpload'
import PvAccepte from './actions/PvAccepte'
import AttentePaiment from './actions/AttentePaiement'
import AttestaionKo from './actions/AttestaionKo'

/**
 * Edit demand factory
 *
 * @class EditDemandFactory
 */
class EditDemandFactory extends React.Component {
    /**
     * Handle Upload
     *
     * @param {object} file
     * @memberof EditDemandFactory
     */
    handleUpload = file => {
        const { data, update } = this.props
        const fileData = new FormData()
        fileData.append('file', file)
        update(data.action, fileData, file)
    }

    /**
     * Render
     *
     * @returns
     * @memberof EditDemandFactory
     */
    render() {
        const { data, showButtons } = this.props
        switch (data.action) {
            case 'ATTENTE_DR':
                return <AttenteDr {...data.props} />
            case 'PV_REFUSE':
                return (
                    <DateExamSwitcher
                        showButtons={e => {
                            showButtons(e)
                        }}
                        action={data.action}
                        onGetFile={this.handleUpload}
                        {...data.props}
                        isRefused="1"
                    />
                )
            case 'DATE_EXAM_OK':
            case 'RE_DATE_EXAM_OK':
                return (
                    <DateExamSwitcher
                        showButtons={e => {
                            showButtons(e)
                        }}
                        action={data.action}
                        onGetFile={this.handleUpload}
                        {...data.props}
                    />
                )
            case 'PAIEMENT_OK':
                return <PaymentOk {...data.props} />
            case 'PV_UPLOAD':
                return <PvUpload {...data.props} />
            case 'SCAN_OK':
                return <ScanOk {...data.props} />
            case 'ATTENTE_PAIEMENT':
                return <AttentePaiment {...data.props} />
            case 'REFUS_CENTRE':
            case 'SPECIALITE_CHOISIE':
                return (
                    <SpecialiteChoisie
                        onGetFile={this.handleUpload}
                        {...data.props}
                    />
                )
            case 'CENTRE_OK':
                return (
                    <SpecialiteChoisie
                        onGetFile={this.handleUpload}
                        {...data.props}
                    />
                )
            case 'PV_ACCEPTE':
                return <PvAccepte {...data.props} />
            case 'ATTESTATION_KO':
                return <AttestaionKo {...data.props} />
            default:
                return undefined
        }
    }
}
EditDemandFactory.defaultProps = {
    showButtons: null,
}

EditDemandFactory.propTypes = {
    data: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    showButtons: PropTypes.func,
}

export default EditDemandFactory
