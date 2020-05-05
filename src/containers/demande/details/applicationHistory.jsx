import PropTypes from 'prop-types'
import React from 'react'
import { displayDateTime } from '../../../shared/utility'
import MuiTable from '../../../components/ui/table'

/**
 * getActor
 *
 * @memberof DemandeList
 * @param {string} userId
 * @returns {string} returns user name & role
 */
const getActor = (userId, allUsers, intl) => {
    const user = (allUsers || []).find(u => u.id === parseInt(userId, 10))
    return user
        ? `${intl.formatMessage({ id: user.userRoles[0].role })} ${
              user.prenomFr
          } ${user.nomFr}`
        : ''
}

const RenderApplicationHistory = ({
    data,
    language,
    intl,
    allReferenciels,
    allUsers,
}) => {
    const demande = data
    // TODO: reform displaying history (grid)
    const lang = language === 'ar' ? 'intituleAr' : 'intituleFr'
    const b = [...demande.applicationHistorys]
    const creation = b.reduce(
        (max, p) => (p.createdAt > max ? p.createdAt : max),
        b[0]
    )
    const allStatus = {}
    allReferenciels.referenciels.RefStatut.forEach(i => {
        allStatus[i.id] = intl.formatMessage({ id: i.code })
    })
    let list = (demande.applicationHistorys || [])
        .filter(h => h.id !== creation.id)
        .map(h => ({
            oper: intl.formatMessage({ id: 'changing' }),
            actor: getActor(h.updatedBy, allUsers, intl),
            status: (h.statut || {}).id,
            date: displayDateTime(h.createdAt, language),
            motif:
                h.statut && h.motif && h.statut.code.indexOf('REFU') > -1
                    ? h.motif[lang]
                    : '',
        }))
    list = [
        {
            oper: intl.formatMessage({ id: 'creation' }),
            actor: getActor(demande.createdBy, allUsers, intl),
            status: allReferenciels.referenciels.RefStatut.find(
                s => s.code === 'ATTENTE_DR'
            ).id,
            motif: '',
            date: demande.createdAt,
        },
        ...list,
    ]
    const cols = [
        { field: 'oper', title: intl.formatMessage({ id: 'operation' }) },
        {
            field: 'actor',
            title: intl.formatMessage({ id: 'actor' }),
        },
        {
            field: 'date',
            title: intl.formatMessage({ id: 'date' }),
        },
        {
            field: 'motif',
            title: intl.formatMessage({ id: 'motive' }),
        },
        {
            field: 'status',
            title: intl.formatMessage({ id: 'status' }),
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
RenderApplicationHistory.propTypes = {
    data: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object.isRequired,
    allUsers: PropTypes.array.isRequired,
}
export default RenderApplicationHistory
