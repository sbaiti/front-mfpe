/* eslint-disable react/no-array-index-key */
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import InputText from '../../../../components/ui/input'
import DateField from '../../../../components/ui/datePicker'

const PublicProjects = ({
    intl,
    isError,
    errorsList,
    handleChange,
    data,
    language,
}) => {
    const formElments1 = [
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
            name: 'expense_extimed',
            label: <FormattedMessage id="expenseEstimed" />,
            placeholder: intl.formatMessage({ id: 'expenseEstimed' }),
            type: 'number',
        },
        {
            name: 'expense_real',
            label: <FormattedMessage id="expenseReal" />,
            placeholder: intl.formatMessage({ id: 'expenseReal' }),
            type: 'number',
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
            required: true,
        },
        {
            name: 'observation',
            label: <FormattedMessage id="observation" />,
            placeholder: intl.formatMessage({ id: 'observation' }),
            required: true,
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
PublicProjects.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorsList: PropTypes.object,
}

PublicProjects.defaultProps = {
    errorsList: null,
    isError: false,
}

export default injectIntl(PublicProjects)
