/* eslint-disable react/no-array-index-key */
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import InputText from '../../../../components/ui/input'
import SelectList from '../../../../components/ui/select'
import RadioField from '../../../../components/ui/radio'
import DateField from '../../../../components/ui/datePicker'

const Common = ({
    intl,
    isError,
    errorsList,
    handleChange,
    data,
    allReferenciels,
    allCenters,
    language,
}) => {
    let listSpecialities = []
    const intitule = `intitule${language[0].toUpperCase()}r`
    const listHomologue = [
        { label: language === 'ar' ? 'لا' : 'Non', value: '0' },
        { label: language === 'ar' ? 'نعم' : 'Oui', value: '1' },
    ]

    const listSousSecteur = allReferenciels.referenciels.RefSousSecteur.filter(
        e => e.parent && e.parent.id === data.sector
    ).map(i => ({
        label: i[intitule],
        value: i.id,
    }))
    const listSecteur = allReferenciels.referenciels.RefSecteur.map(i => ({
        label: i[intitule],
        value: i.id,
    }))
    const listCentre = allCenters.map(i => {
        if (i.id === data.training_center)
            listSpecialities = i.specialiteCenters.map(s => ({
                label: s[intitule],
                value: s.id,
            }))

        return {
            label: i[intitule],
            value: i.id,
        }
    })

    const formElments1 = [
        {
            name: 'training_center',
            label: <FormattedMessage id="centername" />,
            placeholder: intl.formatMessage({ id: 'centername' }),
            isSelect: true,
            list: listCentre,
        },
        {
            name: 'sector',
            label: <FormattedMessage id="sector" />,
            placeholder: intl.formatMessage({ id: 'sector' }),
            isSelect: true,
            list: listSecteur,
        },
        {
            name: 'subsector',
            label: <FormattedMessage id="subsector" />,
            placeholder: intl.formatMessage({ id: 'subsector' }),
            isSelect: true,
            list: listSousSecteur,
        },
        {
            name: 'speciality',
            label: <FormattedMessage id="speciality" />,
            placeholder: intl.formatMessage({ id: 'speciality' }),
            isSelect: true,
            list: listSpecialities,
        },
        {
            name: 'niveau_diplome',
            label: <FormattedMessage id="level" />,
            props: { disabled: true },
        },

        {
            name: 'approved',
            label: <FormattedMessage id="approved" />,
            placeholder: intl.formatMessage({ id: 'approved' }),
            list: listHomologue,
            isRadio: true,
        },

        {
            name: 'administrative_year',
            label: <FormattedMessage id="administrativeyear" />,
            placeholder: intl.formatMessage({ id: 'administrativeyear' }),
            isDate: true,
            props: { format: 'yyyy', views: ['year'] },
        },
        {
            name: 'month',
            label: <FormattedMessage id="month" />,
            placeholder: intl.formatMessage({ id: 'month' }),
            isDate: true,
            props: {
                format: 'MMMM',
                views: ['month'],
                disableFuture: false,
            },
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
            ) : el.isRadio ? (
                <RadioField
                    key={`${el.name}${index}`}
                    onchange={e => {
                        handleChange(e, el.name)
                    }}
                    name={el.name}
                    label={el.label}
                    list={el.list}
                    chosenItem={data[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                />
            ) : el.isSelect ? (
                <SelectList
                    key={`${el.name}${index}`}
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
            ) : (
                <InputText
                    key={`${el.name}${index}`}
                    onchange={e => {
                        handleChange(e, el.name)
                    }}
                    name={el.name}
                    label={el.label}
                    placeholder={el.placeholder}
                    type={el.type}
                    value={data[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    attributes={el.props}
                />
            )
        })
}
Common.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object.isRequired,
    allCenters: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorsList: PropTypes.object,
}

Common.defaultProps = {
    errorsList: null,
    isError: false,
}
export default injectIntl(Common)
