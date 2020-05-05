import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'
import { displayDate, formatDate } from '../../../shared/utility'

const RenderCitoyenDetails = ({ data, language }) => {
    const lang = language === 'ar' ? 'intituleAr' : 'intituleFr'
    const demande = data

    const tableStyle = {
        boxShadow: ' 0 0 3px 1px #e0e0e0',
        direction: language === 'ar' ? 'rtl' : 'ltr',
    }

    return (
        <Table style={tableStyle}>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="citizen" />
                    </TableCell>
                    <TableCell>
                        {`${demande.user.prenomFr} ${demande.user.nomFr}`}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="registrationDate" />
                    </TableCell>
                    <TableCell>
                        {demande.user.dateInscription
                            ? formatDate(demande.user.dateInscription)
                                  .split('-')
                                  .reverse()
                                  .join('-')
                            : "date d'inscription invalide"}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="nationality" />
                    </TableCell>
                    <TableCell>
                        {(demande.user.nationalite || {})[lang]}
                    </TableCell>
                </TableRow>
                {demande.user.nationalite
                    ? demande.user.nationalite.intituleFr
                          .toLowerCase()
                          .includes('tun')
                        ? [
                              <TableRow key="a">
                                  <TableCell>
                                      <FormattedMessage id="cin" />
                                  </TableCell>
                                  <TableCell>{demande.user.numCin}</TableCell>
                              </TableRow>,
                              <TableRow key="b">
                                  <TableCell>
                                      <FormattedMessage id="issueDate" />
                                  </TableCell>
                                  <TableCell>
                                      {displayDate(
                                          demande.user.dateDelivranceCin,
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
                                      {demande.user.numPassport}
                                  </TableCell>
                              </TableRow>,
                              <TableRow key="b">
                                  <TableCell>
                                      <FormattedMessage id="issueDate" />
                                  </TableCell>
                                  <TableCell>
                                      {displayDate(
                                          demande.user.dateDelivrancePassport,
                                          language
                                      )}
                                  </TableCell>
                              </TableRow>,
                              <TableRow key="c">
                                  <TableCell>
                                      <FormattedMessage id="residenceCardNumber" />
                                  </TableCell>
                                  <TableCell>
                                      {demande.user.numCarteSejour}
                                  </TableCell>
                              </TableRow>,
                              <TableRow key="d">
                                  <TableCell>
                                      <FormattedMessage id="validityStayDate" />
                                  </TableCell>
                                  <TableCell>
                                      {displayDate(
                                          demande.user.dateValiditeSejour,
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
                        {displayDate(demande.user.dateNaissance, language)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="birthPlace" />
                    </TableCell>
                    <TableCell>{demande.user.lieuNaissance}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="governorate" />
                    </TableCell>
                    <TableCell>{demande.user.gouvernorat[lang]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="delegation" />
                    </TableCell>
                    <TableCell>{demande.user.delegation[lang]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="phone" />
                    </TableCell>
                    <TableCell>{demande.user.tel}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="email" />
                    </TableCell>
                    <TableCell>{demande.user.email}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="sex" />
                    </TableCell>
                    <TableCell>{demande.user.sexe}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="studyLevel" />
                    </TableCell>
                    <TableCell>
                        {(demande.user.niveauEtude || {})[lang]}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="personWithSpecialNeeds" />
                    </TableCell>
                    <TableCell>
                        {demande.user.personneBesoinSpecifique ? (
                            <FormattedMessage id="yes" />
                        ) : (
                            <FormattedMessage id="no" />
                        )}
                    </TableCell>
                </TableRow>
                {demande.user.personneBesoinSpecifique && (
                    <TableRow key="a">
                        <TableCell>
                            <FormattedMessage id="specialNeedsNature" />
                        </TableCell>
                        <TableCell>
                            {demande.user.natureBesoinSpecifique[lang]}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
RenderCitoyenDetails.propTypes = {
    data: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
}
export default RenderCitoyenDetails
