/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import {
    CloudDownload,
    InsertDriveFile,
    FolderShared,
} from '@material-ui/icons'
import { updatedDiff } from 'deep-object-diff'
import getAllDemandesActions from '../../redux/demande/getAllDemandes'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import getAllUsersActions from '../../redux/user/getAllUsers'
import getAllSpecialitesActions from '../../redux/specialite/getAllSpecialites'
import MuiTable from '../../components/ui/table'
import generateKey, { calcAge } from '../../shared/utility'
import alertActions from '../../redux/alert'
import setPageTitleActions from '../../redux/pageTitle'
import getPdfLinkActions from '../../redux/pdf/getPdfLink'
import AlertDialog from '../../components/alertDialog'
import RenderDetails from './details'
import { getList, hideActions, getColumns, getPageTitle } from './common'

/**
 * display demands list
 *
 * @class DemandeList
 * @extends {React.Component}
 */
class DemandeList extends React.Component {
    /**
     * Creates an instance of DemandeList.
     * @param {*} props
     * @memberof DemandeList
     */
    constructor(props) {
        super(props)
        this.state = { showModal: false, content: {}, isLoading: false }
        const {
            intl,
            loggedUser,
            language,
            allReferenciels,
            allUsers,
            allSpecialites,
            getAllUsers,
            getAllSpecialites,
            getAllDemandes,
            setPageTitle,
        } = props
        this.columns = getColumns(intl, loggedUser, language, allReferenciels)
        if (!allUsers) getAllUsers()
        if (!allSpecialites) getAllSpecialites()
        getAllDemandes()
        setPageTitle('demands')
    }

    static getDerivedStateFromProps(prevProps) {
        if (((prevProps.match || {}).params || {}).status) {
            const { setPageTitle } = prevProps
            setPageTitle(getPageTitle((prevProps.match.params || {}).status))
        }
        return null
    }

    shouldComponentUpdate(nextProps, nextState) {
        let diff = updatedDiff(nextProps, this.props)
        if (Object.keys(diff).length) {
            return true
        }
        diff = updatedDiff(nextState, this.state)
        if (Object.keys(diff).length) {
            return true
        }
        return false
    }

    onEdit = id => {
        const { history } = this.props
        history.push({
            pathname: `/demande/modifier/${id}`,
            state: { demandeId: id },
        })
    }

    onAdd = () => {
        const { history, loggedUser, language } = this.props
        if (calcAge(loggedUser.User.details.dateNaissance) < 20) {
            const { alertShow } = this.props
            alertShow(true, {
                onConfirm: false,
                warning: false,
                info: true,
                error: true,
                success: false,
                message:
                    language === 'ar'
                        ? 'لا يمكنك التقديم بطلب, سنك أصغر من 20 سنة'
                        : 'Vous ne pouvez pas ajouter une demande, votre âge est inférieur à 20 ans',
                title: language === 'ar' ? 'إشعار' : 'Information',
            })
            return
        }
        history.push({
            pathname: `/demande/ajouter/`,
        })
    }

    /**
     * Print
     *
     * @memberof DemandeList
     */
    print = (p, id) => {
        const { getPdfLink, language } = this.props
        getPdfLink({
            url: p
                ? 'demande/export-attestation_pdf'
                : 'demande/export-convocation_pdf',
            payload: {
                id,
                lang: language,
            },
        })
    }

    renderAttachments = demande => {
        const { intl } = this.props
        let content = ''
        const document = [...demande.documents]
            .filter(doc => {
                return doc.type === 'Document'
            })
            .pop()
        const pv = [...demande.documents]
            .filter(doc => {
                return doc.type === 'PV'
            })
            .pop()
        content = document && [
            {
                text: intl.formatMessage({ id: 'document' }),
                title: document.name,
                icon: <FolderShared />,
                frame: `<iframe
                    title="${document.name}"
                    src="http://${document.path}"
                        type="application/pdf"
                        width="400"
                        height="600"
                        style= "overflow: auto; width: 100% "
                        ></iframe>`,
            },
        ]
        content = [
            ...content,
            pv && {
                text: intl.formatMessage({ id: 'pv' }),
                title: pv.name,
                icon: <InsertDriveFile />,
                frame: ` <iframe
                    title="${pv.name}"
                    src="http://${pv.path}"
                    type="application/pdf"
                    width="400"
                    height="600"
                    style=" overflow: auto; width: 100% "
                    ></iframe>`,
            },
        ]

        return content
            .filter(c => c)
            .map(c => (
                <Button
                    key={generateKey()}
                    title={c.title}
                    onClick={() => {
                        const myWindow = window.open('')
                        myWindow.document.write(c.frame)
                    }}
                    startIcon={c.icon}
                >
                    {c.text}
                </Button>
            ))
    }

    renderCertificate = demande => {
        const { intl } = this.props
        if (demande.currentStatut.code !== 'ATTESTATION_OK') return null
        return (
            <Button
                onClick={() => this.print(true, demande.id)}
                startIcon={<CloudDownload />}
            >
                {intl.formatMessage({ id: 'attestation' })}
            </Button>
        )
    }

    renderInvitation = demande => {
        const { intl } = this.props
        const invitationStatus = [
            'DATE_EXAM_OK',
            'RE_DATE_EXAM_OK',
            'PV_UPLOAD',
            'PV_REFUSE',
            'PV_ACCEPTE',
            'ATTESTATION_OK',
            'ATTESTATION_KO',
        ]
        if (!invitationStatus.includes(demande.currentStatut.code)) return null
        return (
            <Button
                onClick={() => this.print(false, demande.id)}
                startIcon={<CloudDownload />}
            >
                {intl.formatMessage({ id: 'invitation' })}
            </Button>
        )
    }

    render() {
        const {
            allDemandes,
            intl,
            language,
            loggedUser,
            allReferenciels,
            allUsers,
            loading,
            match,
        } = this.props

        const { showModal, content, isLoading } = this.state
        const list = getList(
            allDemandes,
            match,
            loggedUser,
            this.renderCertificate,
            this.renderInvitation,
            this.renderAttachments,
            language
        )

        const hide = hideActions(list, loggedUser)
        return [
            showModal && (
                <AlertDialog
                    key={generateKey()}
                    handleClose={() => this.setState({ showModal: false })}
                    content={content}
                    header={{
                        show: true,
                        element: intl.formatMessage({ id: 'attachments' }),
                    }}
                    actions={
                        <Button
                            onClick={() => this.setState({ showModal: false })}
                        >
                            {intl.formatMessage({ id: 'close' })}
                        </Button>
                    }
                />
            ),
            <MuiTable
                key={generateKey()}
                intl={intl}
                columns={this.columns}
                list={list}
                edit={e => this.onEdit(e)}
                language={language}
                details={e => (
                    <RenderDetails
                        data={e}
                        language={language}
                        allDemandes={allDemandes}
                        intl={intl}
                        allReferenciels={allReferenciels}
                        allUsers={allUsers}
                    />
                )}
                add={
                    loggedUser.User.details.userRoles[0].role === 'ROLE_CITOYEN'
                        ? e => this.onAdd(e)
                        : false
                }
                showTitle={false}
                hideActions={hide}
                filterByDate={list.length !== 0}
                isLoading={loading || isLoading}
            />,
        ]
    }
}

const mapStateToProps = ({
    login,
    info,
    demande,
    referencial,
    uniteRegionale,
    user,
    specialite,
}) => {
    const { allSpecialites } = specialite
    const { allDemandes } = demande
    const { allReferencials } = referencial
    const { allUniteRegionales } = uniteRegionale
    const { allUsers } = user
    return {
        loggedUser: login.response,
        language: info.language,
        allDemandes: allDemandes.response,
        error: allDemandes.error,
        allReferenciels: allReferencials.response,
        allUnits: allUniteRegionales.response,
        allUsers: allUsers.response,
        allSpecialites: allSpecialites.response,
        loading:
            allSpecialites.loading ||
            allReferencials.loading ||
            allDemandes.loading,
    }
}
const mapDispatchToProps = dispatch => ({
    getAllDemandes: () =>
        dispatch(getAllDemandesActions.getAllDemandesRequest()),
    getPdfLink: payload =>
        dispatch(getPdfLinkActions.getPdfLinkRequest(payload)),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    getAllUsers: () => dispatch(getAllUsersActions.getAllUsersRequest()),
    getAllSpecialites: () =>
        dispatch(getAllSpecialitesActions.getAllSpecialitesRequest()),
    alertShow: (show, info) =>
        dispatch(
            alertActions.alertShow(show, {
                onConfirm: info.onConfirm,
                warning: info.warning,
                info: info.info,
                error: info.error,
                success: info.success,
                message: info.message,
                title: info.title,
            })
        ),

    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})

DemandeList.propTypes = {
    getAllDemandes: PropTypes.func.isRequired,
    getAllSpecialites: PropTypes.func.isRequired,
    allDemandes: PropTypes.array,
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    loggedUser: PropTypes.object.isRequired,
    alertShow: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    setPageTitle: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    getPdfLink: PropTypes.func.isRequired,
    allUsers: PropTypes.array,
    allSpecialites: PropTypes.array,
    match: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object,
    loading: PropTypes.bool,
}

DemandeList.defaultProps = {
    allDemandes: [],
    allUsers: [],
    allSpecialites: [],
    allReferenciels: {},
    loading: false,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(DemandeList))
