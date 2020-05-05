/* eslint-disable radix */
import React from 'react'
import { Paper, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import formatPhoneNumber from '../../shared/formatPhoneNumber'
import { displayDate } from '../../shared/utility'

const FormSummary = ({ language, allReferenciels, payload }) => {
    const lang = language === 'ar' ? 'intituleAr' : 'intituleFr'

    const GOV =
        allReferenciels.referenciels.RefGouvernorat.find(
            i => i.id === parseInt(payload.gouvernorat)
        ) || {}
    const DELEG =
        allReferenciels.referenciels.RefDelegation.find(
            e => e.id === parseInt(payload.delegation)
        ) || {}
    const NIV =
        allReferenciels.referenciels.RefNiveauEtude.find(
            i => i.id === parseInt(payload.niveau_etude)
        ) || {}
    const NATURE =
        allReferenciels.referenciels.RefNatureBesoinSpecifique.find(
            i => i.id === payload.nature_besoin_specifique
        ) || {}
    const NATIO =
        allReferenciels.referenciels.RefNationalite.find(
            i => i.id === payload.nationalite
        ) || {}
    const tunNatio =
        allReferenciels.referenciels.RefNationalite.find(
            i =>
                i.intituleFr
                    .toLowerCase()
                    .trim()
                    .indexOf('tun') === 0
        ) || {}

    return (
        <Paper id="divToPrint" style={{ width: '100%' }}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="citizen" />
                        </TableCell>
                        <TableCell>
                            {`${payload.prenom} ${payload.nom}`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="nationality" />
                        </TableCell>
                        <TableCell>{NATIO[lang]}</TableCell>
                    </TableRow>
                    {parseInt(payload.nationalite)
                        ? parseInt(payload.nationalite) ===
                          parseInt(tunNatio.id)
                            ? [
                                  <TableRow key="a">
                                      <TableCell>
                                          <FormattedMessage id="cin" />
                                      </TableCell>
                                      <TableCell>{payload.num_cin}</TableCell>
                                  </TableRow>,
                                  <TableRow key="b">
                                      <TableCell>
                                          <FormattedMessage id="issueDate" />
                                      </TableCell>
                                      <TableCell>
                                          {displayDate(
                                              payload.date_delivrance_cin,
                                              language
                                          )}
                                      </TableCell>
                                  </TableRow>,
                              ]
                            : [
                                  <TableRow key="a">
                                      <TableCell>
                                          <FormattedMessage id="passport" />
                                      </TableCell>
                                      <TableCell>
                                          {payload.num_passport}
                                      </TableCell>
                                  </TableRow>,
                                  <TableRow key="b">
                                      <TableCell>
                                          <FormattedMessage id="issueDate" />
                                      </TableCell>
                                      <TableCell>
                                          {displayDate(
                                              payload.date_delivrance_passport,
                                              language
                                          )}
                                      </TableCell>
                                  </TableRow>,
                                  <TableRow key="c">
                                      <TableCell>
                                          <FormattedMessage id="residenceCardNumber" />
                                      </TableCell>
                                      <TableCell>
                                          {payload.num_carte_sejour}
                                      </TableCell>
                                  </TableRow>,
                                  <TableRow key="d">
                                      <TableCell>
                                          <FormattedMessage id="validityStayDate" />
                                      </TableCell>
                                      <TableCell>
                                          {displayDate(
                                              payload.date_validite_sejour,
                                              language
                                          )}
                                      </TableCell>
                                  </TableRow>,
                              ]
                        : null}
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="birthDate" />
                        </TableCell>
                        <TableCell>
                            {displayDate(payload.date_naissance, language)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="birthPlace" />
                        </TableCell>
                        <TableCell>{payload.lieu_naissance}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="governorate" />
                        </TableCell>
                        <TableCell>{GOV[lang]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="delegation" />
                        </TableCell>
                        <TableCell>{DELEG[lang]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="phone" />
                        </TableCell>
                        <TableCell style={{ direction: 'ltr' }}>
                            {formatPhoneNumber(payload.tel)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="email" />
                        </TableCell>
                        <TableCell>{payload.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="sex" />
                        </TableCell>
                        <TableCell>
                            <FormattedMessage id={payload.sexe} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="studyLevel" />
                        </TableCell>
                        <TableCell>{NIV[lang]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <FormattedMessage id="personWithSpecialNeeds" />
                        </TableCell>
                        <TableCell>
                            {parseInt(payload.personne_besoin_specifique) !==
                            0 ? (
                                <FormattedMessage id="yes" />
                            ) : (
                                <FormattedMessage id="no" />
                            )}
                        </TableCell>
                    </TableRow>
                    {parseInt(payload.personne_besoin_specifique) !== 0 && (
                        <TableRow key="a">
                            <TableCell>
                                <FormattedMessage id="specialNeedsNature" />
                            </TableCell>
                            <TableCell>{NATURE[lang]}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default FormSummary

FormSummary.propTypes = {
    language: PropTypes.string.isRequired,
    allReferenciels: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
}
