/* eslint-disable react/no-array-index-key */
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import InputText from '../../../../components/ui/input'
import SelectList from '../../../../components/ui/select'
import DateField from '../../../../components/ui/datePicker'

const RenderForm = ({
    intl,
    isError,
    errorsList,
    handleChange,
    allReferenciels,
    data,
    language,
}) => {
    let listGov = []

    try {
        listGov = allReferenciels.referenciels.RefGouvernorat.map(i => ({
            label: language === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))
    } catch (error) {
        console.log(error)
    }
    const formElments = [
        {
            name: 'year',
            label: <FormattedMessage id="year" />,
            placeholder: intl.formatMessage({ id: 'year' }),
            isDate: true,
            props: { format: 'yyyy', views: ['year'] },
        },
        {
            name: 'month',
            label: <FormattedMessage id="month" />,
            placeholder: intl.formatMessage({ id: 'month' }),
            isDate: true,
            props: { format: 'MMMM', views: ['month'] },
        },
        {
            name: 'gouvernorat',
            label: <FormattedMessage id="governorate" />,
            list: listGov,
            isSelect: true,
        },
        {
            name: 'initial_number',
            label: <FormattedMessage id="initialNumber" />,
            placeholder: intl.formatMessage({ id: 'initialNumber' }),
            type: 'number',
        },
        {
            name: 'continus_number',
            label: <FormattedMessage id="continusNumber" />,
            placeholder: intl.formatMessage({ id: 'continusNumber' }),
            type: 'number',
        },
        {
            name: 'initial_continus_number',
            label: <FormattedMessage id="initialContinusNumber" />,
            placeholder: intl.formatMessage({
                id: 'initialContinusNumber',
            }),
            type: 'number',
        },
        {
            name: 'change_number',
            label: <FormattedMessage id="changeNumber" />,
            placeholder: intl.formatMessage({ id: 'changeNumber' }),
            type: 'number',
        },
        {
            name: 'closed_training_center_number',
            label: <FormattedMessage id="closedCenter" />,
            placeholder: intl.formatMessage({ id: 'closedCenter' }),
            type: 'number',
        },
    ]

    return formElments
        .filter(el => el !== false)
        .map((el, index) => {
            return el.isSelect ? (
                <SelectList
                    key={`${el.name}${index} `}
                    onchange={e => {
                        handleChange(e, el.name)
                    }}
                    name={el.name}
                    label={el.label}
                    list={el.list}
                    selectedItem={data[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    attributes={el.props}
                />
            ) : el.isDate ? (
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
RenderForm.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    allReferenciels: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorsList: PropTypes.object,
}

RenderForm.defaultProps = {
    errorsList: null,
    isError: false,
}
export default injectIntl(RenderForm)
