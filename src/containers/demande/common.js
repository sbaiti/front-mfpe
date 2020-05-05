import { displayDate, getTranslatedAttribute } from '../../shared/utility'

const getPageTitle = urlParam => {
    switch (urlParam) {
        case 'nouveau':
            return 'newApplicationsList'
        case 'en-cours':
            return 'inProgressApplicationsList'
        case 'rejetées':
            return 'rejectedApplicationsList'
        case 'clôturés':
            return 'closedApplicationsList'
        default:
            return 'applicationsList'
    }
}

/**
 * _getStatus
 * @param urlParam
 * @param loggedUser
 * @returns {string[]|*[]}
 * @private
 */
const getStatus = (urlParam, loggedUser) => {
    const role = loggedUser && (loggedUser.User.details.userRoles[0] || {}).role
    if (!role) return ['']
    if (role === 'ROLE_CITOYEN')
        switch (urlParam) {
            case 'nouveau':
                return ['ATTENTE_DR']
            case 'en-cours':
                return [
                    'SPECIALITE_CHOISIE',
                    'SCAN_OK',
                    'CENTRE_OK',
                    'ATTENTE_PAIEMENT',
                    'PAIEMENT_OK',
                    'DATE_EXAM_OK',
                    'RE_DATE_EXAM_OK',
                    'PV_UPLOAD',
                    'PV_ACCEPTE',
                    'REFUS_CENTRE',
                    'PV_REFUSE',
                ]
            case 'rejetées':
                return ['REFUSE_DR', 'PAIEMENT_KO', 'ATTESTATION_KO']
            case 'clôturés':
                return ['ATTESTATION_OK']
            default:
                return ['ATTENTE_DR']
        }
    else
        return [
            'ATTENTE_DR',
            'SPECIALITE_CHOISIE',
            'SCAN_OK',
            'CENTRE_OK',
            'PAIEMENT_OK',
            'DATE_EXAM_OK',
            'RE_DATE_EXAM_OK',
            'ATTENTE_PAIEMENT',
            'PV_UPLOAD',
            'PV_ACCEPTE',
            'REFUS_CENTRE',
            'PV_REFUSE',
            'REFUSE_DR',
            'PAIEMENT_KO',
            'ATTESTATION_OK',
            'ATTESTATION_KO',
        ]
}

/**
 * _hideEdit
 * @param status
 * @param loggedUser
 * @returns {boolean}
 * @private
 */
const hideEdit = (status, loggedUser) => {
    const role = loggedUser && (loggedUser.User.details.userRoles[0] || {}).role
    if (!role)
        return (
            [
                'ATTESTATION_OK',
                'ATTESTATION_KO',
                'PAIEMENT_KO',
                'REFUSE_DR',
            ].indexOf(status) > -1
        )
    switch (role) {
        case 'ROLE_CITOYEN':
            return status === 'ATTENTE_PAIEMENT'
        case 'ROLE_DIRECTEUR_DR':
            return status === 'PV_ACCEPTE'
        case 'ROLE_AGENT_MFPE':
            // TODO: add restrictions for ROLE_AGENT_MFPE
            return true
        case 'ROLE_AGENT_DR1':
        case 'ROLE_AGENT_DR2':
        case 'ROLE_AGENT_DR3':
        case 'ROLE_AGENT_DR4':
            return (
                [
                    'ATTENTE_DR',
                    'SPECIALITE_CHOISIE',
                    'REFUS_CENTRE',
                    'CENTRE_OK',
                    'PV_UPLOAD',
                ].indexOf(status) > -1
            )
        case 'ROLE_AGENT_CENTRE_FORMATION':
            return (
                [
                    'SCAN_OK',
                    'PAIEMENT_OK',
                    'DATE_EXAM_OK',
                    'RE_DATE_EXAM_OK',
                    'PV_REFUSE',
                ].indexOf(status) > -1
            )

        default:
            return (
                [
                    'ATTESTATION_OK',
                    'ATTESTATION_KO',
                    'PAIEMENT_KO',
                    'REFUSE_DR',
                ].indexOf(status) < 0
            )
    }
}

/**
 * getList
 * @param allDemandes
 * @param match
 * @param loggedUser
 * @param renderCertificate
 * @param renderInvitation
 * @param renderAttachments
 * @param language
 * @returns {{dateDepot: *, code: *, attestation: *, gouvernorat: *, specialite: (*), invitation: *, centre: (*|string), citoyen: string, birthDate: *, docs: (boolean|*), phone: *, noEdit: *, dateExam: string, id: *, motif: *, strStatus: *, status: *, numIdentity: null}[]}
 */
const getList = (
    allDemandes,
    match,
    loggedUser,
    renderCertificate,
    renderInvitation,
    renderAttachments,
    language
) => {
    const allStatus = getStatus(match.params.status, loggedUser)
    const list = (allDemandes || [])
        .filter(d => allStatus.includes(d.currentStatut.code))
        .map(d => {
            const hide = hideEdit(d.currentStatut.code, loggedUser)
            return {
                id: d.id,
                code: d.code,
                specialite: d.specialite
                    ? d.specialite[getTranslatedAttribute(language)]
                    : d.specialiteCitoyen,
                status: d.currentStatut.id,
                createdAt: d.createdAt,
                dateDepot: displayDate(d.createdAt, language),
                centre: d.centreFormation
                    ? d.centreFormation[getTranslatedAttribute(language)]
                    : '',
                noEdit: hide,
                strStatus: d.currentStatut.code,
                numIdentity: d.user.numPassport || d.user.numCin,
                citoyen: `${d.user.nomFr} ${d.user.prenomFr}`,
                attestation: renderCertificate(d),
                invitation: renderInvitation(d),
                docs: d.documents.length > 0 && renderAttachments(d),
                motif: d.motif && d.motif.id,
                dateExam:
                    d.dateExams && d.dateExams.length
                        ? [...d.dateExams].pop().dateExam
                        : '',
                birthDate: displayDate(d.user.dateNaissance, language),
                phone: d.user.tel,
                gouvernorat: (d.gouvernorat || {}).id,
            }
        })

    return list
}

/**
 * hide actions column when needed
 *
 * @memberof DemandeList
 * @param {*} array array of status
 * @returns {bool}
 */
const hideActions = (array, loggedUser) => {
    const role =
        loggedUser &&
        (((loggedUser.User || {}).details || {}).userRoles[0] || {}).role
    if (!role) return false
    if (role === 'ROLE_CITOYEN') {
        return !array.some(a => a.strStatus === 'ATTENTE_PAIEMENT')
    }
    return false
}

const getColumns = (intl, loggedUser, language, allReferenciels) => {
    const { referenciels } = allReferenciels
    const intitule = language === 'ar' ? 'intituleAr' : 'intituleFr'

    const allStatus = {}
    const allMotifs = {}
    const allGovs = {}

    let role = ''
    role =
        loggedUser && ((loggedUser.User || {}).details || {}).userRoles[0].role

    const rolesArray = [
        'ROLE_CITOYEN',
        'ROLE_AGENT_DR1',
        'ROLE_AGENT_DR2',
        'ROLE_AGENT_DR3',
        'ROLE_AGENT_DR4',
        'ROLE_AGENT_CENTRE_FORMATION',
        'ROLE_DIRECTEUR_DR',
    ]

    if (!rolesArray.includes(role)) {
        role = 'DEFAULT'
    }
    // Get All Status
    if (
        [
            'ROLE_CITOYEN',
            'ROLE_AGENT_DR1',
            'ROLE_AGENT_DR2',
            'ROLE_AGENT_DR3',
            'ROLE_AGENT_DR4',
            'ROLE_AGENT_CENTRE_FORMATION',
            'ROLE_DIRECTEUR_DR',
            'ROLE_DIRECTEUR_DR',
            'DEFAULT',
        ].includes(role)
    ) {
        referenciels.RefStatut.forEach(i => {
            allStatus[i.id] = intl.formatMessage({ id: i.code })
        })
    }
    // Get All Motifs
    if (
        [
            'ROLE_CITOYEN',
            'ROLE_AGENT_DR2',
            'ROLE_DIRECTEUR_DR',
            'DEFAULT',
        ].includes(role)
    ) {
        referenciels.RefMotif.forEach(i => {
            allMotifs[i.id] = i[intitule]
        })
    }
    // Get All Govs
    if (
        [
            'ROLE_CITOYEN',
            'ROLE_AGENT_DR2',
            'ROLE_DIRECTEUR_DR',
            'DEFAULT',
        ].includes(role)
    ) {
        referenciels.RefGouvernorat.forEach(i => {
            allGovs[i.id] = i[intitule]
        })
    }

    const columns = [
        {
            field: 'citoyen',
            title: intl.formatMessage({ id: 'first&lastName' }),
            roles: [
                'ROLE_AGENT_DR1',
                'ROLE_AGENT_DR2',
                'ROLE_AGENT_DR3',
                'ROLE_AGENT_DR4',
                'ROLE_AGENT_CENTRE_FORMATION',
                'ROLE_DIRECTEUR_DR',
                'DEFAULT',
            ],
        },
        {
            field: 'numIdentity',
            title: intl.formatMessage({ id: 'numIdentity' }),
            roles: [
                'ROLE_AGENT_DR1',
                'ROLE_AGENT_DR2',
                'ROLE_AGENT_DR3',
                'ROLE_AGENT_DR4',
                'ROLE_AGENT_CENTRE_FORMATION',
                'ROLE_DIRECTEUR_DR',
                'DEFAULT',
            ],
        },
        {
            field: 'birthDate',
            title: intl.formatMessage({ id: 'birthDate' }),
            roles: ['ROLE_DIRECTEUR_DR', 'DEFAULT'],
        },
        {
            field: 'gouvernorat',
            title: intl.formatMessage({ id: 'governorate' }),
            lookup: allGovs,
            roles: ['ROLE_AGENT_CENTRE_FORMATION', 'DEFAULT'],
        },
        {
            field: 'code',
            title: intl.formatMessage({ id: 'numberDemands' }),
            roles: [
                'ROLE_CITOYEN',
                'ROLE_AGENT_DR1',
                'ROLE_AGENT_DR2',
                'ROLE_AGENT_DR3',
                'ROLE_AGENT_DR4',
                'ROLE_AGENT_CENTRE_FORMATION',
                'ROLE_DIRECTEUR_DR',
                'ROLE_DIRECTEUR_DR',
                'DEFAULT',
            ],
        },
        {
            field: 'dateDepot',
            title: intl.formatMessage({ id: 'applicationFilingDate' }),
            roles: [
                'ROLE_CITOYEN',
                'ROLE_AGENT_DR1',
                'ROLE_AGENT_DR2',
                'ROLE_AGENT_DR3',
                'ROLE_AGENT_DR4',
                'ROLE_AGENT_CENTRE_FORMATION',
                'ROLE_DIRECTEUR_DR',
                'ROLE_DIRECTEUR_DR',
                'DEFAULT',
            ],
        },
        {
            field: 'status',
            title: intl.formatMessage({ id: 'status' }),
            roles: [
                'ROLE_CITOYEN',
                'ROLE_AGENT_DR1',
                'ROLE_AGENT_DR2',
                'ROLE_AGENT_DR3',
                'ROLE_AGENT_DR4',
                'ROLE_AGENT_CENTRE_FORMATION',
                'ROLE_DIRECTEUR_DR',
                'ROLE_DIRECTEUR_DR',
                'DEFAULT',
            ],
            lookup: allStatus,
        },
        {
            field: 'phone',
            title: intl.formatMessage({ id: 'phone' }),
            roles: ['ROLE_DIRECTEUR_DR', 'DEFAULT'],
        },
        {
            field: 'specialite',
            title: intl.formatMessage({ id: 'speciality' }),
            roles: [
                'ROLE_CITOYEN',
                'ROLE_AGENT_DR2',
                'ROLE_AGENT_DR3',
                'ROLE_AGENT_DR4',
                'ROLE_AGENT_CENTRE_FORMATION',
                'ROLE_DIRECTEUR_DR',
                'DEFAULT',
            ],
        },
        {
            field: 'motif',
            title: intl.formatMessage({ id: 'motive' }),
            lookup: allMotifs,
            roles: [
                'ROLE_CITOYEN',
                'ROLE_AGENT_DR2',
                'ROLE_DIRECTEUR_DR',
                'DEFAULT',
            ],
        },
        {
            field: 'centre',
            title: intl.formatMessage({ id: 'trainingCenter' }),
            roles: [
                'ROLE_CITOYEN',
                'ROLE_AGENT_DR2',
                'ROLE_AGENT_DR3',
                'ROLE_AGENT_DR4',
                'ROLE_DIRECTEUR_DR',
                'DEFAULT',
            ],
        },
        {
            field: 'dateExam',
            title: intl.formatMessage({ id: 'examDate' }),
            roles: ['ROLE_CITOYEN', 'DEFAULT'],
        },
        {
            field: 'invitation',
            title: intl.formatMessage({ id: 'invitation' }),
            roles: ['ROLE_CITOYEN'],
            filter: false,
        },
        {
            field: 'attestation',
            title: intl.formatMessage({ id: 'generatedCertificate' }),
            roles: ['ROLE_CITOYEN', 'ROLE_DIRECTEUR_DR', 'DEFAULT'],
            filter: false,
        },
        {
            field: 'docs',
            title: intl.formatMessage({ id: 'attachments' }),
            roles: [
                'ROLE_AGENT_CENTRE_FORMATION',
                'ROLE_CITOYEN',
                'ROLE_AGENT_DR4',
                'ROLE_DIRECTEUR_DR',
                'DEFAULT',
            ],
            filter: false,
        },
    ]

    const result = columns.filter(item => {
        return item.roles.includes(role)
    })

    return result
}

// eslint-disable-next-line import/prefer-default-export
export { getList, hideActions, hideEdit, getColumns, getPageTitle }
