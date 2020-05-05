const getPayload = (currentStatut, { demande, status, motif, observation }) => {
    const result = {
        url: `demande/${demande.id}`,
        method: 'PATCH',
        response: {},
    }
    const examDate = new Date(demande.date_exam).toJSON()
    switch (currentStatut) {
        case 'ATTENTE_DR':
            result.response =
                status === '1'
                    ? {
                          id: demande.id,
                          domaine: { id: demande.domaine.id },
                          secteur: { id: demande.secteur.id },
                          specialite: demande.specialite || '',
                          statut: 'SPECIALITE_CHOISIE',
                          action: status,
                          preview: 'true',
                      }
                    : {
                          id: demande.id,
                          statut: 'REFUSE_DR',
                          motif,
                          action: status,
                      }
            break
        case 'REFUS_CENTRE':
        case 'SPECIALITE_CHOISIE':
            result.response.centre_formation = demande.centre_formation
            result.response.statut = 'CENTRE_OK'
            result.response.action = status
            if (demande.centre_formation.id && demande['file[]']) {
                result.url2 = `paper/upload/${demande.id}`
                result.response2 = {
                    'file[]': demande['file[]'] || {},
                    file: demande.file,
                }
            }
            break
        case 'CENTRE_OK':
            result.url = `paper/upload/${demande.id}`
            result.method = 'POST'
            result.response = {
                'file[]': demande['file[]'] || {},
                file: demande.file,
            }
            break
        case 'SCAN_OK':
            result.response =
                status === '0'
                    ? {
                          statut: 'REFUS_CENTRE',
                          motif: motif || { id: '' },
                          action: '0',
                      }
                    : { statut: 'ATTENTE_PAIEMENT', action: '1' }
            break
        case 'ATTENTE_PAIEMENT':
            result.response =
                status === '0'
                    ? {
                          statut: 'PAIEMENT_KO',
                          motif: motif || { id: '' },
                          action: '0',
                      }
                    : { statut: 'PAIEMENT_OK', action: '1' }
            break
        case 'PAIEMENT_OK':
            result.method = 'PATCH'
            result.response = {
                date_exam: examDate,
                action: '1',
                material: demande.material,
                statut: demande.nextStatus ? 'RE_DATE_EXAM_OK' : 'DATE_EXAM_OK',
            }
            break
        case 'DATE_EXAM_OK':
            if (demande.nextStatus) {
                result.method = 'PATCH'
                result.response = {
                    date_exam: examDate,
                    action: '1',
                    material: demande.material,
                    statut: demande.nextStatus
                        ? 'RE_DATE_EXAM_OK'
                        : 'DATE_EXAM_OK',
                }
            } else {
                result.method = 'POST'
                result.url = `paper/upload-pv/${demande.id}`
                result.response = { file: demande.file }
            }
            break
        case 'PV_REFUSE':
        case 'RE_DATE_EXAM_OK':
            if (demande.nextStatus) {
                result.method = 'PATCH'
                result.response = {
                    date_exam: examDate,
                    material: demande.material,
                    action: '1',
                    statut: 'RE_DATE_EXAM_OK',
                }
            } else {
                result.method = 'POST'
                result.url = `paper/upload-pv/${demande.id}`
                result.response = { file: demande.file }
            }
            break
        case 'PV_UPLOAD':
            result.response =
                status === '0'
                    ? {
                          statut: 'PV_REFUSE',
                          action: status,
                          motif: motif || { id: '' },
                      }
                    : {
                          action: status,
                          statut: 'PV_ACCEPTE',
                      }
            break
        case 'PV_ACCEPTE':
            result.response =
                status === '0'
                    ? {
                          statut: 'ATTESTATION_KO',
                          action: status,
                          motif: motif || { id: '' },
                      }
                    : {
                          action: status,
                          statut: 'ATTESTATION_OK',
                          observation,
                      }
            break
        default:
            break
    }
    return result
}

// eslint-disable-next-line import/prefer-default-export
export { getPayload }
