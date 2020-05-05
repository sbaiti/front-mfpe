import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import MaterialTable from 'material-table'
import Input from '@material-ui/core/Input'
import { isNil } from 'lodash'
import { editable, emailValidator } from './common'
import InputTel from '../../components/ui/tel'

class ContactInfo extends Component {
    payload = () => {
        const { intl, identifiant, email, tel } = this.props
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
                    cellStyle: { textAlign: 'inherit', direction: 'ltr' },
                    editComponent: props => {
                        if (props.rowData.name === 'tel') {
                            return (
                                <InputTel
                                    variant="standard"
                                    onchange={(value, status) => {
                                        this.tel = status ? value : null
                                    }}
                                    value={props.value}
                                    required={false}
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
                    name: 'identifiant',
                    text: `${intl.formatMessage({ id: 'identifiant' })}`,
                    value: identifiant,
                },
                {
                    name: 'email',
                    text: intl.formatMessage({ id: 'email' }),
                    value: email,
                },
                {
                    name: 'tel',
                    text: intl.formatMessage({ id: 'phone' }),
                    value: `${tel}`,
                },
            ],
        }
    }

    /**
     * @param {payload}
     * @param oldData
     */
    validator = ({ name, value }, oldData) => {
        switch (name) {
            case 'email':
                return (
                    !isNil(value) &&
                    value !== oldData.value &&
                    emailValidator(value)
                )
            case 'tel':
                return !isNil(value) && value !== oldData.value
            default:
                return false
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

                                if (payload.name === 'tel') {
                                    payload.value = this.tel
                                }
                                if (this.validator(payload, oldData)) {
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
                    title={intl.formatMessage({ id: 'contactInfo' })}
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

ContactInfo.defaultProps = {
    email: null,
    tel: null,
    role: null,
    identifiant: null,
    loading: false,
}

ContactInfo.propTypes = {
    intl: PropTypes.object.isRequired,
    email: PropTypes.string,
    tel: PropTypes.string,
    identifiant: PropTypes.string,
    role: PropTypes.string,
    loading: PropTypes.bool,
    editInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
}

export default injectIntl(ContactInfo)
