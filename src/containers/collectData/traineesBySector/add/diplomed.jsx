/* eslint-disable react/no-array-index-key */
import React from 'react'

import { FormattedMessage, injectIntl } from 'react-intl'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import InputText from '../../../../components/ui/input'

const Diplomed = ({ intl, isError, errorsList, handleChange, data }) => {
    const formElments1 = [
        { label: <FormattedMessage id="diplomed" />, isTypog: true },
        {
            name: 'nbr_trained_f_0',
            label: <FormattedMessage id="nbrTrainedWomen" />,
            placeholder: intl.formatMessage({
                id: 'nbrTrainedWomen',
            }),
            type: 'number',
        },
        {
            name: 'nbr_trained_h_0',
            label: <FormattedMessage id="nbrTrainedMen" />,
            placeholder: intl.formatMessage({ id: 'nbrTrainedMen' }),
            type: 'number',
        },
        {
            name: 'nbr_foreigner_0',
            label: <FormattedMessage id="nbrForeigner" />,
            placeholder: intl.formatMessage({ id: 'nbrForeigner' }),
            type: 'number',
        },

        {
            name: 'nbr_total_0',
            label: <FormattedMessage id="nbr_total" />,
            type: 'number',
            props: { disabled: true },
        },
    ]

    return formElments1
        .filter(el => el !== false)
        .map((el, index) => {
            return el.isTypog ? (
                <div style={{ marginLeft: '40%', marginRight: '40%' }}>
                    <Typography
                        key={`${el.name}${index}`}
                        variant="h4"
                        component="h4"
                        className="w-100 mt-5 font-weight-bold text-uppercase text-primary"
                    >
                        {el.label}
                    </Typography>
                </div>
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
                />
            )
        })
}
Diplomed.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorsList: PropTypes.object,
}

Diplomed.defaultProps = {
    errorsList: null,
    isError: false,
}
export default injectIntl(Diplomed)
