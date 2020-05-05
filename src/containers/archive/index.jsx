/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addMonths } from 'date-fns/esm'
import { updatedDiff } from 'deep-object-diff'
import getArchiveActions from '../../redux/demande/getArchive'
import setPageTitleActions from '../../redux/pageTitle'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import getAllUsersActions from '../../redux/user/getAllUsers'
import getAllSpecialitesActions from '../../redux/specialite/getAllSpecialites'
import MuiTable from '../../components/ui/table'
import { displayDate, formatDate } from '../../shared/utility'
import getAllCentersActions from '../../redux/centreFormation/getAllCenters'
import RenderDetails from '../demande/details'

/**
 * display demands list
 *
 * @class Archive
 * @extends {React.Component}
 */
class Archive extends React.Component {
    /**
     * Creates an instance of Archive.
     * @param {*} props
     * @memberof Archive
     */
    constructor(props) {
        super(props)
        const {
            getAllDemandes,
            allUsers,
            getAllUsers,
            getAllSpecialites,
            allSpecialites,
            allCenters,
            getAllCenters,
            setPageTitle,
        } = props
        this.columns = []
        const today = new Date()
        const dateSixMonthsAgo = addMonths(today, -6)
        this.state = {
            startDate: formatDate(dateSixMonthsAgo),
            endDate: formatDate(today),
        }
        const { endDate, startDate } = this.state
        getAllDemandes({ from: startDate, to: endDate })
        if (!allUsers) getAllUsers()
        if (!allSpecialites) getAllSpecialites()
        if (!allCenters) getAllCenters()

        setPageTitle('archive')
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

    getColumns({ allSpecialites, allReferenciels, allCenters }) {
        const { intl, language } = this.props

        const intitule = language === 'ar' ? 'intituleAr' : 'intituleFr'
        const allStatus = {}
        allReferenciels.referenciels.RefStatut.forEach(i => {
            allStatus[i.id] = intl.formatMessage({ id: i.code })
        })
        const allMotifs = {}
        allReferenciels.referenciels.RefMotif.forEach(i => {
            allMotifs[i.id] = i[intitule]
        })
        const allDomains = {}
        allReferenciels.referenciels.RefDomaine.forEach(i => {
            allDomains[i.id] = i[intitule]
        })
        const allSectors = {}
        allReferenciels.referenciels.RefSecteur.forEach(i => {
            allSectors[i.id] = i[intitule]
        })
        const allGovs = {}
        allReferenciels.referenciels.RefGouvernorat.forEach(i => {
            allGovs[i.id] = i[intitule]
        })
        const allDelegs = {}
        allReferenciels.referenciels.RefDelegation.forEach(i => {
            allDelegs[i.id] = i[intitule]
        })
        const allNatios = {}
        allReferenciels.referenciels.RefNationalite.forEach(i => {
            allNatios[i.id] = i[intitule]
        })
        const allStudyLevels = {}
        allReferenciels.referenciels.RefNiveauEtude.forEach(i => {
            allStudyLevels[i.id] = i[intitule]
        })
        const allSpecs = {}
        allSpecialites.forEach(i => {
            allSpecs[i.id] = i[intitule]
        })
        const allTrCenters = {}
        allCenters.forEach(i => {
            allTrCenters[i.id] = i[intitule]
        })
        const idTypes = {
            1: intl.formatMessage({ id: 'passport' }),
            2: intl.formatMessage({ id: 'cin' }),
        }
        const isDisable = {
            1: intl.formatMessage({ id: 'no' }),
            2: intl.formatMessage({ id: 'yes' }),
        }
        const sex = {
            1: intl.formatMessage({ id: 'femme' }),
            2: intl.formatMessage({ id: 'homme' }),
        }
        return [
            {
                field: 'code',
                title: intl.formatMessage({ id: 'number' }),
                type: 'string',
            },
            {
                field: 'dateDepot',
                title: intl.formatMessage({ id: 'applicationFilingDate' }),
                type: 'string',
            },
            {
                field: 'status',
                title: intl.formatMessage({ id: 'status' }),
                lookup: allStatus,
                type: 'multiple',
            },
            {
                field: 'motif',
                title: intl.formatMessage({ id: 'motive' }),
                lookup: allMotifs,
                type: 'multiple',
            },
            {
                field: 'specialiteCitoyen',
                title: intl.formatMessage({ id: 'citizenSpeciality' }),
                type: 'string',
            },
            {
                field: 'specialite',
                title: intl.formatMessage({ id: 'specialityDR' }),
                type: 'multiple',
                lookup: allSpecs,
            },
            {
                field: 'centre',
                title: intl.formatMessage({ id: 'trainingCenter' }),
                type: 'multiple',
                lookup: allTrCenters,
            },
            {
                field: 'domaine',
                title: intl.formatMessage({ id: 'domaine' }),
                type: 'multiple',
                lookup: allDomains,
            },
            {
                field: 'secteur',
                title: intl.formatMessage({ id: 'sector' }),
                type: 'multiple',
                lookup: allSectors,
            },
            {
                field: 'citoyen',
                title: intl.formatMessage({ id: 'citizen' }),
                type: 'string',
            },
            {
                field: 'insrDate',
                title: intl.formatMessage({ id: 'registrationDate' }),
                type: 'string',
            },
            {
                field: 'nationality',
                title: intl.formatMessage({ id: 'nationality' }),
                type: 'multiple',
                lookup: allNatios,
            },
            {
                field: 'birthDate',
                title: intl.formatMessage({ id: 'birthDate' }),
                type: 'string',
            },
            {
                field: 'birthPlace',
                title: intl.formatMessage({ id: 'birthPlace' }),
                type: 'string',
            },
            {
                field: 'identityType',
                title: intl.formatMessage({ id: 'identityType' }),
                type: 'multiple',
                lookup: idTypes,
            },
            {
                field: 'numIdentity',
                title: intl.formatMessage({ id: 'numIdentity' }),
                type: 'string',
            },
            {
                field: 'delivDate',
                title: intl.formatMessage({ id: 'issueDate' }),
                type: 'string',
            },
            {
                field: 'gouvernorat',
                title: intl.formatMessage({ id: 'governorate' }),
                type: 'multiple',
                lookup: allGovs,
            },
            {
                field: 'delegation',
                title: intl.formatMessage({ id: 'delegation' }),
                type: 'multiple',
                lookup: allDelegs,
            },
            {
                field: 'phone',
                title: intl.formatMessage({ id: 'phone' }),
                type: 'string',
            },
            {
                field: 'email',
                title: intl.formatMessage({ id: 'email' }),
                type: 'string',
            },
            {
                field: 'sex',
                title: intl.formatMessage({ id: 'sex' }),
                type: 'multiple',
                lookup: sex,
            },
            {
                field: 'studyLevel',
                title: intl.formatMessage({ id: 'studyLevel' }),
                type: 'multiple',
                lookup: allStudyLevels,
            },
            {
                field: 'isDisable',
                title: intl.formatMessage({ id: 'personWithSpecialNeeds' }),
                type: 'multiple',
                lookup: isDisable,
            },
        ]
    }

    /**
     * getActor
     *
     * @memberof Archive
     * @param {string} userId
     * @returns {string} returns user name & role
     */
    getActor = userId => {
        const { allUsers, intl } = this.props
        const user = (allUsers || []).find(u => u.id === parseInt(userId, 10))
        return user
            ? `${intl.formatMessage({ id: user.userRoles[0].role })} ${
                  user.prenomFr
              } ${user.nomFr}`
            : ''
    }

    refreshData = (start, end) => {
        const { getAllDemandes } = this.props

        this.setState({ startDate: start, endDate: end })
        getAllDemandes({ from: start, to: end })
    }

    render() {
        const {
            intl,
            language,
            allDemandes,
            allReferenciels,
            allSpecialites,
            allUsers,
            allCenters,
        } = this.props
        const { endDate, startDate } = this.state
        if (allSpecialites && allReferenciels && allCenters)
            this.columns = this.getColumns({
                allSpecialites,
                allReferenciels,
                allCenters,
            })
        const list = (allDemandes || []).map(d => {
            return {
                id: d.id,
                code: d.code,
                specialite: d.specialite ? d.specialite.id : '',
                specialiteCitoyen: d.specialiteCitoyen,
                status: d.currentStatut.id,
                dateDepot: displayDate(d.createdAt, language),
                createdAt: d.createdAt,
                centre: d.centreFormation ? d.centreFormation.id : '',
                motif: d.motif ? d.motif.id : '',
                domaine: d.domaine.id,
                secteur: d.secteur.id,
                citoyen: `${d.user.nomFr} ${d.user.prenomFr}`,
                insrDate: displayDate(d.user.dateInscription, language),
                nationality: (d.user.nationalite || {}).id,
                birthDate: displayDate(d.user.dateNaissance, language),
                birthPlace: d.user.lieuNaissance,
                identityType: d.user.numPassport ? 1 : 2,
                numIdentity: d.user.numPassport || d.user.numCin,
                delivDate: displayDate(
                    d.user.dateDelivrancePassport || d.user.dateDelivranceCin,
                    language
                ),
                gouvernorat: (d.user.gouvernorat || {}).id,
                delegation: (d.user.delegation || {}).id,
                phone: d.user.tel,
                email: d.user.email,
                sex: d.user.sex === 'homme' ? 2 : 1,
                studyLevel: (d.user.niveauEtude || {}).id,
                isDisable: d.user.natureBesoinSpecifique === null ? 2 : 1,
            }
        })
        return (
            <MuiTable
                intl={intl}
                columns={this.columns}
                list={list}
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
                hideActions
                customFilters
                filterByDate
                startDate={startDate}
                endDate={endDate}
                getNewList={this.refreshData}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedUser: state.login.response.User.details,
        language: state.info.language,
        allDemandes: state.demande.archive.response,
        allReferenciels: state.referencial.allReferencials.response,
        allUsers: state.user.allUsers.response,
        allSpecialites: state.specialite.allSpecialites.response,
        allCenters: state.centreFormation.allCenters.response,
    }
}
const mapDispatchToProps = dispatch => ({
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
    getAllDemandes: payload =>
        dispatch(getArchiveActions.getArchiveRequest(payload)),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    getAllUsers: () => dispatch(getAllUsersActions.getAllUsersRequest()),
    getAllSpecialites: () =>
        dispatch(getAllSpecialitesActions.getAllSpecialitesRequest()),
    getAllCenters: () => dispatch(getAllCentersActions.getAllCentersRequest()),
})

Archive.propTypes = {
    getAllDemandes: PropTypes.func.isRequired,
    getAllSpecialites: PropTypes.func.isRequired,
    allDemandes: PropTypes.array,
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    allUsers: PropTypes.array,
    allSpecialites: PropTypes.array,
    allReferenciels: PropTypes.object,
    getAllCenters: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    allCenters: PropTypes.array,
}

Archive.defaultProps = {
    allDemandes: [],
    allUsers: [],
    allSpecialites: [],
    allReferenciels: {},
    allCenters: [],
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Archive))
