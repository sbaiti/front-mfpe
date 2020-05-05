/* eslint-disable react/no-array-index-key */
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import InputText from '../../../../components/ui/input'
import DateField from '../../../../components/ui/datePicker'

const InternationalCoops = ({
    intl,
    isError,
    errorsList,
    handleChange,
    data,
    language,
}) => {
    const formElments1 = [
        {
            name: 'target_population',
            label: <FormattedMessage id="targetPopulation" />,
            placeholder: intl.formatMessage({ id: 'targetPopulation' }),
        },
        {
            name: 'number_beneficiarie',
            label: <FormattedMessage id="numberBeneficiarie" />,
            placeholder: intl.formatMessage({ id: 'numberBeneficiarie' }),
            type: 'number',
        },
        {
            name: 'project_manager',
            label: <FormattedMessage id="projectManager" />,
            placeholder: intl.formatMessage({ id: 'projectManager' }),
            required: false,
        },
        {
            name: 'project_cost',
            label: <FormattedMessage id="projectCost" />,
            placeholder: intl.formatMessage({
                id: 'projectCost',
            }),
            type: 'number',
        },
        {
            name: 'project_cost_updated',
            label: <FormattedMessage id="projectCostUpdated" />,
            placeholder: intl.formatMessage({ id: 'projectCostUpdated' }),
            type: 'number',
        },
        {
            name: 'finance',
            label: <FormattedMessage id="finance" />,
            placeholder: intl.formatMessage({ id: 'finance' }),
        },
        {
            name: 'type_finance',
            label: <FormattedMessage id="typeFinance" />,
            placeholder: intl.formatMessage({ id: 'typeFinance' }),
        },

        {
            name: 'registration_project_year',
            label: <FormattedMessage id="registrationProjectYear" />,
            placeholder: intl.formatMessage({ id: 'registrationProjectYear' }),
            isDate: true,
            props: { format: 'yyyy', views: ['year'] },
        },
        {
            name: 'project_duration',
            label: <FormattedMessage id="projectDuration" />,
            placeholder: intl.formatMessage({ id: 'projectDuration' }),
            type: 'number',
        },
        {
            name: 'project_component',
            label: <FormattedMessage id="projectComponent" />,
            placeholder: intl.formatMessage({ id: 'projectComponent' }),
            required: false,
        },
        {
            name: 'project_progress_percent',
            label: <FormattedMessage id="projectProgressPercent" />,
            placeholder: intl.formatMessage({ id: 'projectProgressPercent' }),
            type: 'number',
            required: true,
        },
        {
            name: 'project_progress',
            label: <FormattedMessage id="projectProgress" />,
            placeholder: intl.formatMessage({ id: 'projectProgress' }),
            required: false,
        },

        {
            name: 'observation',
            label: <FormattedMessage id="observation" />,
            placeholder: intl.formatMessage({ id: 'observation' }),
            required: false,
        },
    ]

    return formElments1
        .filter(el => el !== false)
        .map((el, index) => {
            return el.isDate ? (
                <DateField
                    key={`${el.name}${index}`}
                    onchange={e => handleChange(e, el.name)}
                    name={el.name}
                    label={el.label}
                    isArabic={language === 'ar'}
                    defaultValue={new Date(data[el.name])}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    attributes={el.props}
                    required={el.required}
                />
            ) : (
                <InputText
                    key={`${el.name}${index}`}
                    onchange={e => {
                        handleChange(e, el.name)
                    }}
                    name={el.name}
                    label={el.label}
                    placeholder={el.placeholder}
                    value={data[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    attributes={el.props}
                    type={el.type}
                    required={el.required}
                />
            )
        })
}
InternationalCoops.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorsList: PropTypes.object,
}

InternationalCoops.defaultProps = {
    errorsList: null,
    isError: false,
}

export default injectIntl(InternationalCoops)
