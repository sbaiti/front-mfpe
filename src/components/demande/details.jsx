/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import {
    TableRow,
    TableCell,
    Paper,
    Table,
    TableBody,
    Divider,
} from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import generateKey, { displayDate } from '../../shared/utility'

export default function Details(props) {
    const { demande, lang, intl } = props
    const [expanded, setExpanded] = React.useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }
    const titre = lang === 'intituleAr' ? 'titreAr' : 'titreFr'
    return (
        <div>
            <Paper>
                <Typography variant="h5" component="h3" className="p-3">
                    <FormattedMessage id="applicationInfos" />
                </Typography>
                <Divider />
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <FormattedMessage id="code" />
                            </TableCell>
                            <TableCell>{demande.code}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormattedMessage id="citizen" />
                            </TableCell>
                            <TableCell>
                                {(demande.user &&
                                    `${demande.user.prenomFr} ${demande.user.nomFr}`) ||
                                    'non défini'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormattedMessage id="status" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage
                                    id={
                                        ((demande || {}).currentStatut || {})
                                            .code
                                    }
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormattedMessage id="applicationFilingDate" />
                            </TableCell>
                            <TableCell>
                                {displayDate(demande.createdAt, lang)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>

            <Paper className="my-3">
                <ExpansionPanel
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography>
                            <FormattedMessage id="domaine" />
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <FormattedMessage id="domaine" />
                                    </TableCell>
                                    <TableCell>
                                        {demande.domaine[lang]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <FormattedMessage id="sector" />
                                    </TableCell>
                                    <TableCell>
                                        {demande.secteur[lang]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <FormattedMessage id="speciality" />
                                    </TableCell>
                                    <TableCell>
                                        {demande.specialite
                                            ? demande.specialite[lang]
                                            : demande.specialiteCitoyen}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>

            <Paper className="my-3">
                <ExpansionPanel
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography>
                            <FormattedMessage id="address" />
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <FormattedMessage id="governorate" />
                                    </TableCell>
                                    <TableCell>
                                        {demande.gouvernorat[lang]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <FormattedMessage id="delegation" />
                                    </TableCell>
                                    <TableCell>
                                        {demande.delegation[lang]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <FormattedMessage id="currentAddress" />
                                    </TableCell>
                                    <TableCell>
                                        {demande.adresseResidenceActuelle}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>
            {/* Formation */}
            <Paper className="my-3">
                <ExpansionPanel
                    expanded={expanded === 'panel4'}
                    onChange={handleChange('panel4')}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography>
                            <FormattedMessage id="formation" />
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <FormattedMessage id="experienceProof" />
                                    </TableCell>
                                    <TableCell>
                                        {demande.justificatifExperience
                                            .split(',')
                                            .map(j =>
                                                intl.formatMessage({
                                                    id: j,
                                                })
                                            )
                                            .join(', ')}
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <FormattedMessage id="certificate" />
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage
                                            id={
                                                !demande.attestationFormation
                                                    ? 'no'
                                                    : 'yes'
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                                {demande.attestationFormation && [
                                    <TableRow key={generateKey()}>
                                        <TableCell>
                                            <FormattedMessage id="employer" />
                                        </TableCell>
                                        <TableCell>
                                            {demande.nomEmployeur}
                                        </TableCell>
                                    </TableRow>,
                                    <TableRow key={generateKey()}>
                                        <TableCell>
                                            <FormattedMessage id="companyAddress" />
                                        </TableCell>
                                        <TableCell>
                                            {demande.adresseEntreprise}
                                        </TableCell>
                                    </TableRow>,
                                ]}
                                {demande.dateExams && demande.dateExams.length
                                    ? [
                                          <TableRow key={generateKey()}>
                                              <TableCell>
                                                  <FormattedMessage id="examDate" />
                                              </TableCell>
                                              <TableCell>
                                                  {[...demande.dateExams].pop()
                                                      .dateExam || ''}
                                              </TableCell>
                                          </TableRow>,
                                          <TableRow key={generateKey()}>
                                              <TableCell>
                                                  <FormattedMessage id="observationCenter" />
                                              </TableCell>
                                              <TableCell>
                                                  {[...demande.dateExams].pop()
                                                      .material || ''}
                                              </TableCell>
                                          </TableRow>,
                                      ]
                                    : null}

                                {demande.currentStatut.code.includes(
                                    'ATTESTATION'
                                ) && (
                                    <TableRow>
                                        <TableCell>
                                            <FormattedMessage id="observationDr" />
                                        </TableCell>
                                        <TableCell>
                                            {demande.observation}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>

            {/* Projet */}
            {demande.projet && (
                <Paper className="my-3">
                    <ExpansionPanel
                        expanded={expanded === 'panel3'}
                        onChange={handleChange('panel3')}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography>
                                <FormattedMessage id="project" />
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Table>
                                <TableBody>
                                    <TableRow key={generateKey()}>
                                        <TableCell>
                                            <FormattedMessage id="projectAddress" />
                                        </TableCell>
                                        <TableCell>
                                            {demande.adresseProjet}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={generateKey()}>
                                        <TableCell>
                                            <FormattedMessage id="projectGovernorate" />
                                        </TableCell>
                                        <TableCell>
                                            {demande.gouvernoratProjet[lang]}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={generateKey()}>
                                        <TableCell>
                                            <FormattedMessage id="projectDelegation" />
                                        </TableCell>
                                        <TableCell>
                                            {demande.delegationProjet[lang]}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={generateKey()}>
                                        <TableCell>
                                            <FormattedMessage id="regionalDirectorate" />
                                        </TableCell>
                                        <TableCell>
                                            {
                                                (demande.uniteRegionale || {})[
                                                    titre
                                                ]
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Paper>
            )}
        </div>
    )
}

Details.propTypes = {
    lang: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    demande: PropTypes.object.isRequired,
}
