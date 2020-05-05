/* eslint-disable react/no-array-index-key */
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import InputText from '../../../../components/ui/input'

const Api = ({ intl, isError, errorsList, handleChange, data }) => {
    const formElments1 = [
        {
            name: 'object',
            label: <FormattedMessage id="object" />,
            placeholder: intl.formatMessage({ id: 'object' }),
        },
        {
            name: 'regime',
            label: <FormattedMessage id="regime" />,
            placeholder: intl.formatMessage({ id: 'regime' }),
        },
        {
            name: 'job_estimed',
            label: <FormattedMessage id="job_estimed" />,
            placeholder: intl.formatMessage({ id: 'job_estimed' }),
            type: 'number',
        },
        {
            name: 'investment_cost',
            label: <FormattedMessage id="investment_cost" />,
            placeholder: intl.formatMessage({
                id: 'investment_cost',
            }),
            type: 'number',
        },
    ]

    return formElments1
        .filter(el => el !== false)
        .map((el, index) => {
            return (
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
Api.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorsList: PropTypes.object,
}

Api.defaultProps = {
    errorsList: null,
    isError: false,
}
export default injectIntl(Api)
