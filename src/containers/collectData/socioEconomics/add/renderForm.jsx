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
    allUniteRegionales,
    data,
    language,
}) => {
    const titre = `titre${language[0].toUpperCase()}r`

    let listDirectionRegionale = []

    try {
        listDirectionRegionale = allUniteRegionales.map(i => ({
            label: i[titre],
            value: i.id,
        }))
    } catch (error) {
        console.log(error)
    }

    const formElments = [
        {
            name: 'direction_regionale',
            label: <FormattedMessage id="directionRegionale" />,
            placeholder: intl.formatMessage({ id: 'directionRegionale' }),
            isSelect: true,
            list: listDirectionRegionale,
        },

        {
            name: 'health_institution_number',
            label: <FormattedMessage id="healthInstitutionNumber" />,
            placeholder: intl.formatMessage({
                id: 'healthInstitutionNumber',
            }),
            type: 'number',
        },
        {
            name: 'health_institution_year',
            label: <FormattedMessage id="year" />,
            isDate: true,
            props: { format: 'yyyy', views: ['year'] },
        },
        {
            name: 'school_institution_number',
            label: <FormattedMessage id="school_institution_number" />,
            placeholder: intl.formatMessage({
                id: 'school_institution_number',
            }),
            type: 'number',
        },
        {
            name: 'school_institution_year',
            label: <FormattedMessage id="year" />,
            isDate: true,
            props: { format: 'yyyy', views: ['year'] },
        },
        {
            name: 'university_institution_number',
            label: <FormattedMessage id="university_institution_number" />,
            placeholder: intl.formatMessage({
                id: 'university_institution_number',
            }),
            type: 'number',
        },
        {
            name: 'institution_university_year',
            label: <FormattedMessage id="year" />,
            isDate: true,
            props: { format: 'yyyy', views: ['year'] },
        },
        {
            name: 'dropout_school_number',
            label: <FormattedMessage id="dropout_school_number" />,
            placeholder: intl.formatMessage({
                id: 'dropout_school_number',
            }),
            type: 'number',
        },
        {
            name: 'dropout_school_year',
            label: <FormattedMessage id="year" />,
            isDate: true,
            props: { format: 'yyyy', views: ['year'] },
        },
        {
            name: 'needy_family_number',
            label: <FormattedMessage id="needy_family_number" />,
            placeholder: intl.formatMessage({
                id: 'needy_family_number',
            }),
            type: 'number',
        },
        {
            name: 'needy_family_year',
            label: <FormattedMessage id="year" />,
            isDate: true,
            props: { format: 'yyyy', views: ['year'] },
        },
        {
            name: 'association_number',
            label: <FormattedMessage id="association_number" />,
            placeholder: intl.formatMessage({
                id: 'association_number',
            }),
            type: 'number',
        },
        {
            name: 'association_year',
            label: <FormattedMessage id="year" />,
            isDate: true,
            props: { format: 'yyyy', views: ['year'] },
        },
        {
            name: 'current_project',
            label: <FormattedMessage id="current_project" />,
            placeholder: intl.formatMessage({
                id: 'current_project',
            }),
        },
        {
            name: 'description',
            label: <FormattedMessage id="description" />,
            placeholder: intl.formatMessage({
                id: 'description',
            }),
        },
    ]

    return formElments
        .filter(el => el !== false)
        .map((el, index) => {
            return el.isSelect ? (
                <div className="MuiFormControl-root col-12">
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
                </div>
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
    allUniteRegionales: PropTypes.array.isRequired,
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
