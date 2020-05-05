/* eslint-disable react/no-array-index-key */
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import InputText from '../../../../components/ui/input'

const CompaniesInDifficulty = ({
    intl,
    isError,
    errorsList,
    handleChange,
    data,
}) => {
    const formElments1 = [
        {
            name: 'activiry_cessation',
            label: <FormattedMessage id="activity_cessation" />,
            placeholder: intl.formatMessage({ id: 'activity_cessation' }),
        },
        {
            name: 'duration',
            label: <FormattedMessage id="duration" />,
            placeholder: intl.formatMessage({ id: 'duration' }),
            type: 'number',
        },
        {
            name: 'number_job_lost',
            label: <FormattedMessage id="number_job_lost" />,
            placeholder: intl.formatMessage({
                id: 'number_job_lost',
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
CompaniesInDifficulty.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorsList: PropTypes.object,
}

CompaniesInDifficulty.defaultProps = {
    errorsList: null,
    isError: false,
}
export default injectIntl(CompaniesInDifficulty)
