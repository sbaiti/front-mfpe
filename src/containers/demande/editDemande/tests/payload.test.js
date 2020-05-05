import '../../../../config/test-config'
import { assert } from 'chai'
import { getPayload } from '../payload'

describe('getPayload', () => {
    it('current status should be valid', () => {
        const validCurrentStatut = [
            'ATTENTE_DR',
            'REFUS_CENTRE',
            'SPECIALITE_CHOISIE',
            'CENTRE_OK',
            'SCAN_OK',
            'ATTENTE_PAIEMENT',
            'PAIEMENT_OK',
            'DATE_EXAM_OK',
            'PV_REFUSE',
            'RE_DATE_EXAM_OK',
            'PV_UPLOAD',
            'PV_ACCEPTE',
        ]
        assert.include(
            validCurrentStatut,
            'ATTENTE_DR',
            'the Valid Current Status contain this status'
        )
        assert.notInclude(
            validCurrentStatut,
            'LOREM',
            "the Valid Current Status don't contain this status"
        )
    })

    it('ATTENTE_DR', () => {
        const currentStatut = 'ATTENTE_DR'
        const demande = {
            id: 5,
            domaine: { id: 1 },
            secteur: { id: 2 },
            specialite: 'specialite',
            motif: { id: '' },
        }
        let status = '1'
        const motif = { id: 5 }
        assert.deepEqual(
            getPayload(currentStatut, { demande, status }),
            {
                url: 'demande/5',
                method: 'PATCH',
                response: {
                    id: demande.id,
                    domaine: { id: demande.domaine.id },
                    secteur: { id: demande.secteur.id },
                    specialite: demande.specialite || '',
                    statut: 'SPECIALITE_CHOISIE',
                    action: status,
                    preview: 'true',
                },
            },
            'equal to result in the case of status = 1'
        )
        status = '0'
        assert.deepEqual(
            getPayload(currentStatut, { demande, status, motif }),
            {
                url: 'demande/5',
                method: 'PATCH',
                response: {
                    id: demande.id,
                    statut: 'REFUSE_DR',
                    motif,
                    action: status,
                },
            },
            'equal to result in the case of status = 0'
        )
    })

    it('SPECIALITE_CHOISIE', () => {
        const currentStatut = 'SPECIALITE_CHOISIE'
        const demande = {
            id: 5,
            centre_formation: { id: 1 },
            secteur: { id: 2 },
            specialite: 'specialite',
            motif: { id: '' },
            'file[]': {},
            file: 'lorem',
        }
        const status = '1'
        const result = {
            url: 'demande/5',
            method: 'PATCH',
            response: {
                centre_formation: { id: 1 },
                statut: 'CENTRE_OK',
                action: '1',
            },
            url2: 'paper/upload/5',
            response2: { 'file[]': {}, file: 'lorem' },
        }
        assert.deepEqual(
            getPayload(currentStatut, { demande, status }),
            result,
            'equal to result'
        )
    })
})
