import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import MaterialTable from 'material-table'
import Input from '@material-ui/core/Input'
import DatePickerField from './datePickerField'
import { dateValidator, editable, formatDate } from './common'

class CitizenshipInfo extends Component {
    constructor(props) {
        super(props)
        this.dateDelivranceCin = null
        this.dateDelivrancePassport = null
    }

    payload = () => {
        const {
            intl,
            nationalite,
            numCin,
            dateDelivranceCin,
            numPassport,
            dateDelivrancePassport,
            numCarteSejour,
            dateValiditeSejour,
            language,
            isCitizen,
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
                    editComponent: props => {
                        if (props.rowData.type === 'date') {
                            return (
                                <DatePickerField
                                    isArabic={language === 'ar'}
                                    date={props.value || formatDate(Date())}
                                    onChange={e => {
                                        switch (props.rowData.name) {
                                            case 'dateDelivranceCin':
                                                this.dateDelivranceCin = formatDate(
                                                    e
                                                )
                                                break
                                            case 'dateDelivrancePassport':
                                                this.dateDelivrancePassport = formatDate(
                                                    e
                                                )
                                                break
                                            default:
                                            // TODO: alert error
                                        }
                                    }}
                                />
                            )
                        }
                        return (
                            <Input
                                value={props.value}
                                onChange={e => props.onChange(e.target.value)}
                                IProps={{
                                    'aria-label': 'description',
                                }}
                            />
                        )
                    },
                },
            ],

            data: [
                {
                    name: 'nationalite',
                    text: intl.formatMessage({ id: 'nationality' }),
                    value: isCitizen ? nationalite : null,
                },
                {
                    name: 'numCin',
                    text: intl.formatMessage({ id: 'cin' }),
                    value: numCin,
                },
                {
                    name: 'dateDelivranceCin',
                    text: intl.formatMessage({ id: 'issueDate' }),
                    value: numCin ? dateDelivranceCin : null,
                    type: 'date',
                },
                {
                    name: 'numPassport',
                    text: intl.formatMessage({ id: 'passport' }),
                    value: numPassport,
                    type: 'date',
                },
                {
                    name: 'dateDelivrancePassport',
                    text: intl.formatMessage({ id: 'issueDate' }),
                    value: numPassport ? dateDelivrancePassport : null,
                    type: 'date',
                },
                {
                    name: 'numCarteSejour',
                    text: intl.formatMessage({ id: 'residenceCardNumber' }),
                    value: numPassport ? numCarteSejour : null,
                },
                {
                    name: 'dateValiditeSejour',
                    text: intl.formatMessage({ id: 'validityStayDate' }),
                    value: numPassport ? dateValiditeSejour : null,
                    type: 'date',
                },
            ],
        }
    }

    render() {
        const { role, loading, editInfo, intl } = this.props
        let edit = {}
        if (editInfo !== false)
            edit = {
                editable: {
                    isEditable: currentField => {
                        return editable(currentField.name, role)
                    },
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                const payload = newData
                                switch (payload.name) {
                                    case 'dateDelivranceCin':
                                        payload.value = this.dateDelivranceCin
                                        break
                                    case 'dateDelivrancePassport':
                                        payload.value = this.dateDelivrancePassport
                                        break
                                    default:
                                        break
                                }
                                if (
                                    dateValidator(payload.value) &&
                                    payload.value !== oldData.value
                                ) {
                                    editInfo(payload)
                                }
                                resolve()
                            }, 1000)
                        }),
                },
            }
        return (
            <Paper>
                <MaterialTable
                    title={intl.formatMessage({ id: 'citizenship' })}
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
                    {...edit}
                    isLoading={loading}
                />
            </Paper>
        )
    }
}

CitizenshipInfo.defaultProps = {
    language: 'fr',
    nationalite: null,
    numCin: null,
    dateDelivranceCin: null,
    numPassport: null,
    dateDelivrancePassport: null,
    numCarteSejour: null,
    dateValiditeSejour: null,
    role: null,
    loading: false,
    isCitizen: false,
}

CitizenshipInfo.propTypes = {
    intl: PropTypes.object.isRequired,
    language: PropTypes.string,
    nationalite: PropTypes.string,
    numCin: PropTypes.string,
    dateDelivranceCin: PropTypes.string,
    numPassport: PropTypes.string,
    dateDelivrancePassport: PropTypes.string,
    numCarteSejour: PropTypes.string,
    dateValiditeSejour: PropTypes.string,
    role: PropTypes.string,
    loading: PropTypes.bool,
    editInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
    isCitizen: PropTypes.bool,
}

export default injectIntl(CitizenshipInfo)
