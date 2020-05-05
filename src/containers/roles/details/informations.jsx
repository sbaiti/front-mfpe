import Paper from '@material-ui/core/Paper'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MaterialTable from 'material-table'

const Informations = props => {
    const { intl, data, getRole, language, roles, isLoading } = props
    const [informations, setInformations] = useState(null)

    useEffect(() => {
        const rolesData = {
            name:
                language === 'fr'
                    ? (roles || {}).intituleFr
                    : (roles || {}).intituleAr,
            identifiant: (roles || {}).role,
            nbUsersAffected: ((roles || {}).users || {}).length,
        }
        setInformations(data || rolesData)
    }, [roles])

    if (!informations && !data && !isLoading) {
        const {
            match: { params },
        } = props
        getRole(params.id)
    }

    const payload = () => {
        return {
            columns: [
                {
                    title: 'text',
                    field: 'text',
                    editable: 'never',
                    cellStyle: { textAlign: 'inherit', fontWeight: 'bold' },
                },
                {
                    title: 'value',
                    field: 'value',
                    editable: 'never',
                    cellStyle: { textAlign: 'inherit' },
                },
            ],

            data: [
                {
                    name: 'role',
                    text: `${intl.formatMessage({ id: 'code' })}`,
                    value: (informations || {}).identifiant || '-',
                },
                {
                    name: 'name',
                    text: `${intl.formatMessage({ id: 'roleName' })}`,
                    value: (informations || {}).name || '-',
                },
                {
                    name: 'nbUsersAffected',
                    text: `${intl.formatMessage({ id: 'nbUsersAffected' })}`,
                    value: (informations || {}).nbUsersAffected || '-',
                },
            ],
        }
    }

    return (
        <Paper>
            <MaterialTable
                columns={payload().columns || []}
                data={payload().data || []}
                options={{
                    toolbar: false,
                    showTitle: false,
                    search: false,
                    sorting: false,
                    paging: false,
                    header: false,
                    detailPanelColumnAlignment: 'right',
                    actionsColumnIndex: -1,
                    rowStyle: rowData => ({
                        display: rowData.value ? '' : 'none',
                    }),
                }}
                isLoading={isLoading}
            />
        </Paper>
    )
}

Informations.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    match: PropTypes.object.isRequired,
    getRole: PropTypes.func.isRequired,
    roles: PropTypes.object,
    language: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
}

Informations.defaultProps = {
    data: null,
    roles: null,
    isLoading: null,
}

export default Informations
