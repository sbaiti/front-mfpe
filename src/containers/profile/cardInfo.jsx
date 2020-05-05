import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import MaterialTable from 'material-table'

class CardInfo extends Component {
    constructor(props) {
        super(props)
        this.dateNaissance = null
    }

    payload = () => {
        const {
            intl,
            nom,
            prenom,
            sexe,
            dateNaissance,
            niveauEtude,
            gouvernorat,
            delegation,
        } = this.props
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
                    cellStyle: { textAlign: 'inherit' },
                },
            ],

            data: [
                {
                    name: 'fullName',
                    text: `${intl.formatMessage({ id: 'first&lastName' })}`,
                    value: `${nom}   ${prenom}`,
                },
                {
                    name: 'sexe',
                    text: `${intl.formatMessage({ id: 'sex' })}`,
                    value: `${intl.formatMessage({ id: sexe || 'undefined' })}`,
                },
                {
                    name: 'dateNaissance',
                    text: intl.formatMessage({ id: 'birthDate' }),
                    type: 'date',
                    value: dateNaissance,
                },
                {
                    name: 'gouvernorat',
                    text: intl.formatMessage({ id: 'governorate' }),
                    value: gouvernorat,
                },
                {
                    name: 'delegation',
                    text: intl.formatMessage({ id: 'delegation' }),
                    value: delegation,
                },
                {
                    name: 'niveauEtude',
                    text: intl.formatMessage({ id: 'studyLevel' }),
                    value: niveauEtude,
                },
            ],
        }
    }

    getTableTitle = () => {
        const { isCitizen, intl } = this.props
        const candidate = intl.formatMessage({ id: 'candidate' })
        const agent = intl.formatMessage({ id: 'agent' })
        return isCitizen ? candidate : agent
    }

    render() {
        const { loading } = this.props

        return (
            <Paper>
                <MaterialTable
                    title={this.getTableTitle()}
                    columns={this.payload().columns}
                    data={this.payload().data}
                    options={{
                        toolbar: true,
                        showTitle: true,
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
                    isLoading={loading}
                />
            </Paper>
        )
    }
}

CardInfo.defaultProps = {
    nom: null,
    prenom: null,
    sexe: null,
    dateNaissance: null,
    niveauEtude: null,
    loading: false,
    gouvernorat: null,
    delegation: null,
    isCitizen: false,
}

CardInfo.propTypes = {
    intl: PropTypes.object.isRequired,
    nom: PropTypes.string,
    prenom: PropTypes.string,
    sexe: PropTypes.string,
    dateNaissance: PropTypes.string,
    niveauEtude: PropTypes.string,
    loading: PropTypes.bool,
    gouvernorat: PropTypes.string,
    delegation: PropTypes.string,
    isCitizen: PropTypes.bool,
}

export default injectIntl(CardInfo)
