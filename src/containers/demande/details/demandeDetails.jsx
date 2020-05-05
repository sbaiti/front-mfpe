import { FormattedMessage } from 'react-intl'
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import generateKey, { displayDate } from '../../../shared/utility'

const RenderDemandeDetails = ({ data, language }) => {
    const lang = language === 'ar' ? 'intituleAr' : 'intituleFr'
    const titre = language === 'ar' ? 'titreAr' : 'titreFr'
    const demande = data
    const details = [
        {
            key: <FormattedMessage id="number" />,
            value: demande.code,
        },
        {
            key: <FormattedMessage id="applicationFilingDate" />,
            value: displayDate(demande.createdAt, language),
        },
        {
            key: <FormattedMessage id="speciality" />,
            value: demande.specialite
                ? demande.specialite[lang]
                : demande.specialiteCitoyen,
        },
        {
            key: <FormattedMessage id="status" />,
            value: <FormattedMessage id={demande.currentStatut.code} />,
        },
        {
            key: <FormattedMessage id="trainingCenter" />,
            value: demande.centreFormation
                ? demande.centreFormation[lang]
                : 'non défini',
        },
        demande.motif && {
            key: <FormattedMessage id="motive" />,
            value: demande.motif ? demande.motif[lang] : '',
        },
        {
            key: <FormattedMessage id="domaine" />,
            value: demande.domaine[lang],
        },
        {
            key: <FormattedMessage id="sector" />,
            value: demande.secteur[lang],
        },
        {
            key: <FormattedMessage id="governorate" />,
            value: demande.gouvernorat[lang],
        },
        {
            key: <FormattedMessage id="delegation" />,
            value: demande.delegation[lang],
        },
        {
            key: <FormattedMessage id="experienceProof" />,
            value: <FormattedMessage id={demande.justificatifExperience} />,
        },
        {
            key: <FormattedMessage id="currentAddress" />,
            value: demande.adresseResidenceActuelle,
        },
        demande.attestationFormation && {
            key: <FormattedMessage id="companyAddress" />,
            value: demande.adresseEntreprise,
        },
        demande.attestationFormation && {
            key: <FormattedMessage id="employer" />,
            value: demande.nomEmployeur,
        },
        demande.projet && {
            key: <FormattedMessage id="projectAddress" />,
            value: demande.adresseProjet,
        },

        demande.projet && {
            key: <FormattedMessage id="projectGovernorate" />,
            value: demande.gouvernoratProjet[lang],
        },
        demande.projet && {
            key: <FormattedMessage id="projectDelegation" />,
            value: demande.delegationProjet[lang],
        },
        {
            key: <FormattedMessage id="regionalDirectorate" />,
            value: demande.uniteRegionale ? demande.uniteRegionale[titre] : '',
        },
        demande.dateExams && demande.dateExams.length
            ? {
                  key: <FormattedMessage id="examDate" />,
                  value: [...demande.dateExams].pop().dateExam || '',
              }
            : null,
        demande.dateExams && demande.dateExams.length
            ? {
                  key: <FormattedMessage id="observationCenter" />,
                  value: [...demande.dateExams].pop().material || '',
              }
            : null,
        demande.currentStatut.code.includes('ATTESTATION') && {
            key: <FormattedMessage id="observationDr" />,
            value: demande.observation,
        },
    ]
    const tableStyle = {
        boxShadow: ' 0 0 3px 1px #e0e0e0',
        direction: language === 'ar' ? 'rtl' : 'ltr',
    }

    return (
        <Table style={tableStyle}>
            <TableBody>
                {details.map(
                    d =>
                        d && (
                            <TableRow key={generateKey()}>
                                <TableCell>{d.key}</TableCell>
                                <TableCell>{d.value}</TableCell>
                            </TableRow>
                        )
                )}
            </TableBody>
        </Table>
    )
}
RenderDemandeDetails.propTypes = {
    data: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
}
export default RenderDemandeDetails
