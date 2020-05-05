/* eslint-disable radix */
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { TableCell, TableRow, Paper, Table, TableBody } from '@material-ui/core'
import PropType from 'prop-types'
import { getTranslatedAttribute, displayDate } from '../../../shared/utility'

const formSummary = ({
    language,
    allReferenciels,
    allUniteRegionales,
    intl,
    loggedUser,
    payload,
}) => {
    const GOV = allReferenciels.referenciels.RefGouvernorat.find(
        i => i.id === parseInt(loggedUser.gouvernorat.id)
    )
    const DELEG = allReferenciels.referenciels.RefDelegation.find(
        e => e.id === parseInt(loggedUser.delegation.id)
    )

    const GOVPROJ = allReferenciels.referenciels.RefGouvernorat.find(
        i => i.id === parseInt(payload.gouvernorat_projet)
    )
    const DELEGPROJ = allReferenciels.referenciels.RefDelegation.find(
        e => e.id === parseInt(payload.delegation_projet)
    )
    const DOMAINE = allReferenciels.referenciels.RefDomaine.find(
        i => i.id === parseInt(payload.domaine)
    )
    const SEC = allReferenciels.referenciels.RefSecteur.find(
        i => i.id === payload.secteur
    )
    const JUSTIF = payload.justificatif_experience
        .map(j => intl.formatMessage({ id: j }))
        .join(', ')
    const DIREC = allUniteRegionales.find(
        i => i.id === parseInt(payload.direction_regionale)
    )

    return (
        <Paper id="divToPrint" style={{ width: '100%' }}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="applicationFilingDate" />
                        </TableCell>
                        <TableCell>
                            {displayDate(payload.date, language)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="domaine" />
                        </TableCell>
                        <TableCell>
                            {DOMAINE[getTranslatedAttribute(language)]}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="sector" />
                        </TableCell>
                        <TableCell>
                            {SEC[getTranslatedAttribute(language)]}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="speciality" />
                        </TableCell>
                        <TableCell>{payload.specialite_citoyen}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="experienceProof" />
                        </TableCell>
                        <TableCell>{JUSTIF}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="certificate" />
                        </TableCell>
                        <TableCell>
                            {parseInt(payload.attestation_formation) === 0 ? (
                                <FormattedMessage id="no" />
                            ) : (
                                <FormattedMessage id="yes" />
                            )}
                        </TableCell>
                    </TableRow>
                    {parseInt(payload.attestation_formation) !== 0
                        ? [
                              <TableRow key="a">
                                  <TableCell>
                                      <FormattedMessage id="employer" />
                                  </TableCell>
                                  <TableCell>{payload.nom_employeur}</TableCell>
                              </TableRow>,
                              <TableRow key="b">
                                  <TableCell>
                                      <FormattedMessage id="companyAddress" />
                                  </TableCell>
                                  <TableCell>
                                      {payload.adresse_entreprise}
                                  </TableCell>
                              </TableRow>,
                          ]
                        : null}

                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="currentAddress" />
                        </TableCell>
                        <TableCell>
                            {payload.adresse_residence_actuelle}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="governorate" />
                        </TableCell>
                        <TableCell>
                            {GOV[getTranslatedAttribute(language)]}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="delegation" />
                        </TableCell>
                        <TableCell>
                            {DELEG[getTranslatedAttribute(language)]}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="project" />
                        </TableCell>
                        <TableCell>
                            {parseInt(payload.projet) === 0 ? (
                                <FormattedMessage id="no" />
                            ) : (
                                <FormattedMessage id="yes" />
                            )}
                        </TableCell>
                    </TableRow>
                    {parseInt(payload.projet) !== 0
                        ? [
                              <TableRow key="a">
                                  <TableCell>
                                      <FormattedMessage id="projectAddress" />
                                  </TableCell>
                                  <TableCell>
                                      {payload.adresse_projet}
                                  </TableCell>
                              </TableRow>,
                              <TableRow key="b">
                                  <TableCell>
                                      <FormattedMessage id="projectGovernorate" />
                                  </TableCell>
                                  <TableCell>
                                      {
                                          GOVPROJ[
                                              getTranslatedAttribute(language)
                                          ]
                                      }
                                  </TableCell>
                              </TableRow>,
                              <TableRow key="c">
                                  <TableCell>
                                      <FormattedMessage id="projectDelegation" />
                                  </TableCell>
                                  <TableCell>
                                      {
                                          DELEGPROJ[
                                              getTranslatedAttribute(language)
                                          ]
                                      }
                                  </TableCell>
                              </TableRow>,
                          ]
                        : null}
                    <TableRow key="d">
                        <TableCell>
                            <FormattedMessage id="regionalDirectorate" />
                        </TableCell>
                        <TableCell>
                            {DIREC[getTranslatedAttribute(language, 'titre')]}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    )
}

formSummary.propTypes = {
    language: PropType.string.isRequired,
    allReferenciels: PropType.object.isRequired,
    allUniteRegionales: PropType.array.isRequired,
    intl: PropType.object.isRequired,
    loggedUser: PropType.object.isRequired,
    payload: PropType.object.isRequired,
}

export default formSummary
