/* eslint-disable react/no-array-index-key */
/* eslint-disable radix */
import { FormattedMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'
import SelectList from '../../components/ui/select'
import RadioField from '../../components/ui/radio'
import DateField from '../../components/ui/datePicker'
import InputTel from '../../components/ui/tel'
import formatPhoneNumber from '../../shared/formatPhoneNumber'
import InputText from '../../components/ui/input'

const Form = ({
    allReferenciels,
    intl,
    language,
    payload,
    isError,
    errorsList,
    fieldChangedHandler,
}) => {
    let listGov = []
    let listDeleg = []
    let listNiv = []
    let listNature = []
    let listNatio = []
    let tunNatioId

    try {
        listGov = allReferenciels.referenciels.RefGouvernorat.map(i => ({
            label: language === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))
        listDeleg = allReferenciels.referenciels.RefDelegation.filter(
            e => e.parent && e.parent.id === payload.gouvernorat
        ).map(i => ({
            label: language === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))
        listNiv = allReferenciels.referenciels.RefNiveauEtude.map(i => ({
            label: language === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))
        listNature = allReferenciels.referenciels.RefNatureBesoinSpecifique.map(
            i => ({
                label: language === 'ar' ? i.intituleAr : i.intituleFr,
                value: i.id,
            })
        )
        listNatio = allReferenciels.referenciels.RefNationalite.map(i => {
            if (
                i.intituleFr
                    .toLowerCase()
                    .trim()
                    .indexOf('tun') === 0
            )
                tunNatioId = i.id
            return {
                label: language === 'ar' ? i.intituleAr : i.intituleFr,
                value: i.id,
            }
        })
    } catch (error) {
        console.log(error)
    }

    const listSexe = [
        { label: language === 'ar' ? 'ذكر' : 'homme', value: 'homme' },
        { label: language === 'ar' ? 'انثي' : 'femme', value: 'femme' },
    ]
    const listBesoin = [
        { label: language === 'ar' ? 'نعم' : 'Oui', value: '1' },
        { label: language === 'ar' ? 'لا' : 'Non', value: '0' },
    ]
    const formElments = [
        {
            name: 'nationalite',
            label: <FormattedMessage id="nationality" />,
            list: listNatio,
            isSelect: true,
        },
        payload.nationalite === tunNatioId && {
            name: 'num_cin',
            label: <FormattedMessage id="cin" />,
            placeholder: intl.formatMessage({ id: 'cin' }),
            type: 'number',
        },
        payload.nationalite === tunNatioId && {
            name: 'date_delivrance_cin',
            label: <FormattedMessage id="issueDate" />,
            isDate: true,
        },
        payload.nationalite &&
            payload.nationalite !== tunNatioId && {
                name: 'num_passport',
                label: <FormattedMessage id="passport" />,
                placeholder: intl.formatMessage({
                    id: 'passport',
                }),
                // type: 'number',
            },
        payload.nationalite &&
            payload.nationalite !== tunNatioId && {
                name: 'date_delivrance_passport',
                label: <FormattedMessage id="issueDate" />,
                isDate: true,
            },
        payload.nationalite &&
            payload.nationalite !== tunNatioId && {
                name: 'num_carte_sejour',
                label: <FormattedMessage id="residenceCardNumber" />,
                placeholder: intl.formatMessage({
                    id: 'residenceCardNumber',
                }),
                type: 'number',
                required: false,
            },
        payload.nationalite &&
            payload.nationalite !== tunNatioId && {
                name: 'date_validite_sejour',
                label: <FormattedMessage id="validityStayDate" />,
                isDate: true,
                props: {
                    disableFuture: false,
                },
                required: false,
            },
        {
            name: 'prenom',
            label: <FormattedMessage id="lastName" />,
            placeholder: intl.formatMessage({ id: 'lastName' }),
        },
        {
            name: 'nom',
            label: <FormattedMessage id="firstName" />,
            placeholder: intl.formatMessage({ id: 'firstName' }),
        },
        {
            name: 'sexe',
            label: <FormattedMessage id="sex" />,
            list: listSexe,
            isRadio: true,
        },
        {
            name: 'date_naissance',
            label: <FormattedMessage id="birthDate" />,
            isDate: true,
        },
        {
            name: 'lieu_naissance',
            label: <FormattedMessage id="birthPlace" />,
            placeholder: intl.formatMessage({ id: 'birthPlace' }),
        },
        {
            name: 'gouvernorat',
            label: <FormattedMessage id="governorate" />,
            list: listGov,
            isSelect: true,
        },
        {
            name: 'delegation',
            label: <FormattedMessage id="delegation" />,
            list: listDeleg,
            isSelect: true,
        },
        {
            name: 'tel',
            label: <FormattedMessage id="phone" />,
            placeholder: intl.formatMessage({ id: 'phone' }),
            isTel: true,
        },
        {
            name: 'email',
            label: <FormattedMessage id="email" />,
            placeholder: intl.formatMessage({ id: 'email' }),
            type: 'email',
        },
        {
            name: 'niveau_etude',
            label: <FormattedMessage id="studyLevel" />,
            list: listNiv,
            isSelect: true,
        },
        {
            name: 'personne_besoin_specifique',
            label: <FormattedMessage id="personWithSpecialNeeds" />,
            list: listBesoin,
            isRadio: true,
        },

        parseInt(payload.personne_besoin_specifique) === 1 && {
            name: 'nature_besoin_specifique',
            label: <FormattedMessage id="specialNeedsNature" />,
            list: listNature,
            isSelect: true,
        },
    ]
    return formElments
        .filter(el => el)
        .map((el, index) =>
            el.isSelect ? (
                <SelectList
                    key={`${el.name}${index}`}
                    onchange={e => {
                        fieldChangedHandler(e, el.name)
                    }}
                    name={el.name}
                    label={el.label}
                    list={el.list}
                    selectedItem={payload[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                />
            ) : el.isRadio ? (
                <RadioField
                    key={`${el.name}${index}`}
                    onchange={e => {
                        fieldChangedHandler(e, el.name)
                    }}
                    name={el.name}
                    label={el.label}
                    list={el.list}
                    chosenItem={payload[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                />
            ) : el.isDate ? (
                <DateField
                    key={`${el.name}${index}`}
                    onchange={e => fieldChangedHandler(e, el.name)}
                    name={el.name}
                    label={el.label}
                    placeholder={el.placeholder}
                    isArabic={language === 'ar'}
                    defaultValue={new Date(payload[el.name])}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    attributes={el.props}
                    required={el.required}
                />
            ) : el.isTel ? (
                <InputTel
                    key={`${el.name}${index}`}
                    onchange={value => {
                        fieldChangedHandler({ target: { value } }, el.name)
                    }}
                    name={el.name}
                    label={el.label}
                    placeholder={el.placeholder}
                    value={formatPhoneNumber(payload[el.name])}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    required
                />
            ) : (
                <InputText
                    key={`${el.name}${index}`}
                    onchange={e => fieldChangedHandler(e, el.name)}
                    name={el.name}
                    label={el.label}
                    placeholder={el.placeholder}
                    type={el.type}
                    value={payload[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    required={el.required}
                />
            )
        )
}

export default Form

Form.propTypes = {
    language: PropTypes.string.isRequired,
    allReferenciels: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
}
