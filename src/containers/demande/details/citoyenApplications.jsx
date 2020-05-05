import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'
import MuiTable from '../../../components/ui/table'
import { displayDate, getTranslatedAttribute } from '../../../shared/utility'

const RenderCitoyenApplications = ({
    data,
    allDemandes,
    language,
    intl,
    allReferenciels,
}) => {
    const demande = data
    const allStatus = {}
    allReferenciels.referenciels.RefStatut.forEach(i => {
        allStatus[i.id] = intl.formatMessage({ id: i.code })
    })
    const list = (allDemandes || [])
        .filter(
            d => d.id !== demande.id && d.user && d.user.id === demande.user.id
        )
        .map(d => {
            return {
                code: d.code || d.codedemande,
                specialite: d.specialite
                    ? d.specialite[getTranslatedAttribute(language)]
                    : d.specialiteCitoyen,
                status: d.currentStatut.id,
                dateDepot: displayDate(d.createdAt, language),
            }
        })
    const cols = [
        { field: 'code', title: <FormattedMessage id="number" /> },
        {
            field: 'specialite',
            title: <FormattedMessage id="speciality" />,
        },
        {
            field: 'dateDepot',
            title: <FormattedMessage id="applicationFilingDate" />,
        },
        {
            field: 'status',
            title: <FormattedMessage id="status" />,
            lookup: allStatus,
        },
    ]
    return (
        <MuiTable
            intl={intl}
            columns={cols}
            list={list}
            language={language}
            exportTable={false}
            hideActions
        />
    )
}
RenderCitoyenApplications.propTypes = {
    data: PropTypes.object.isRequired,
    allDemandes: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object.isRequired,
}
export default RenderCitoyenApplications
