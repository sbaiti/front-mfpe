/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropType from 'prop-types'
import { getTranslatedAttribute } from '../../../shared/utility'
import CheckboxField from '../../../components/ui/checkBox'
import MultiSelectList from '../../../components/ui/select/multiSelect'
import SelectList from '../../../components/ui/select'
import RadioField from '../../../components/ui/radio'
import InputText from '../../../components/ui/input'

const renderForm = ({
    allReferenciels,
    allUniteRegionales,
    intl,
    language,
    loggedUser,
    payload,
    isError,
    errorsList,
    fieldChangedHandler,
    getLoggedUserDR,
}) => {
    const listJustif = [
        {
            label: intl.formatMessage({ id: 'ATTESTATION_TRAVAIL' }),
            value: 'ATTESTATION_TRAVAIL',
        },
        {
            label: intl.formatMessage({ id: 'DEUX_TEMOINS' }),
            value: 'DEUX_TEMOINS',
        },
    ]
    const newPayload = payload
    const listDirection = (allUniteRegionales || [])
        .filter(
            u =>
                u.gouvernorat.id === newPayload.gouvernorat_projet ||
                u.gouvernorat.id === loggedUser.gouvernorat.id
        )
        .map(i => ({
            label: i[getTranslatedAttribute(language, 'titre')],
            value: i.id,
        }))
    if (!newPayload.gouvernorat_projet)
        newPayload.direction_regionale = getLoggedUserDR()

    const listGov = allReferenciels.referenciels.RefGouvernorat.map(i => ({
        label: i[getTranslatedAttribute(language)],
        value: i.id,
    }))
    const listDelegProj = allReferenciels.referenciels.RefDelegation.filter(
        e => e.parent && e.parent.id === newPayload.gouvernorat_projet
    ).map(i => ({
        label: i[getTranslatedAttribute(language)],
        value: i.id,
    }))
    const listDom = allReferenciels.referenciels.RefDomaine.map(i => ({
        label: i[getTranslatedAttribute(language)],
        value: i.id,
    }))
    const listSecteur = allReferenciels.referenciels.RefSecteur.filter(
        e => e.parent && e.parent.id === newPayload.domaine
    ).map(i => ({
        label: i[getTranslatedAttribute(language)],
        value: i.id,
    }))
    const listProj = [
        { label: language === 'ar' ? 'نعم' : 'Oui', value: 1 },
        { label: language === 'ar' ? 'لا' : 'Non', value: 0 },
    ]
    const listAttestation = [
        { label: language === 'ar' ? 'نعم' : 'Oui', value: 1 },
        { label: language === 'ar' ? 'لا' : 'Non', value: 0 },
    ]
    const formElments = [
        {
            name: 'domaine',
            label: intl.formatMessage({ id: 'domaine' }),
            list: listDom,
            isSelect: true,
        },
        {
            name: 'secteur',
            label: intl.formatMessage({ id: 'sector' }),
            list: listSecteur,
            isSelect: true,
        },
        {
            name: 'specialite_citoyen',
            label: intl.formatMessage({ id: 'speciality' }),
            placeholder: intl.formatMessage({ id: 'speciality' }),
        },
        {
            name: 'justificatif_experience',
            label: intl.formatMessage({ id: 'experienceProof' }),
            list: listJustif,
            isMultiSelect: true,
        },
        {
            name: 'attestation_formation',
            label: intl.formatMessage({ id: 'certificate' }),
            list: listAttestation,
            isCheckBox: true,
        },
        newPayload.attestation_formation &&
        parseInt(newPayload.attestation_formation) !== 0
            ? {
                  name: 'nom_employeur',
                  label: intl.formatMessage({ id: 'employer' }),
                  placeholder: intl.formatMessage({ id: 'employer' }),
              }
            : null,
        newPayload.attestation_formation &&
        parseInt(newPayload.attestation_formation) !== 0
            ? {
                  name: 'adresse_entreprise',
                  label: intl.formatMessage({ id: 'companyAddress' }),
                  placeholder: intl.formatMessage({
                      id: 'companyAddress',
                  }),
              }
            : null,
        {
            name: 'adresse_residence_actuelle',
            label: intl.formatMessage({ id: 'currentAddress' }),
            placeholder: intl.formatMessage({
                id: 'currentAddress',
            }),
        },
        {
            name: 'gouvernorat',
            label: intl.formatMessage({ id: 'governorate' }),
            props: { disabled: true },
        },
        {
            name: 'delegation',
            label: intl.formatMessage({ id: 'delegation' }),
            props: { disabled: true },
        },
        {
            name: 'projet',
            label: intl.formatMessage({ id: 'project' }),
            list: listProj,
            isRadio: true,
        },
        newPayload.projet && parseInt(newPayload.projet) !== 0
            ? {
                  name: 'adresse_projet',
                  label: intl.formatMessage({ id: 'projectAddress' }),
                  placeholder: intl.formatMessage({
                      id: 'projectAddress',
                  }),
              }
            : null,
        newPayload.projet && parseInt(newPayload.projet) !== 0
            ? {
                  name: 'gouvernorat_projet',
                  label: intl.formatMessage({ id: 'projectGovernorate' }),
                  list: listGov,
                  isSelect: true,
              }
            : null,
        newPayload.projet && parseInt(newPayload.projet) !== 0
            ? {
                  name: 'delegation_projet',
                  label: intl.formatMessage({ id: 'projectDelegation' }),
                  list: listDelegProj,
                  isSelect: true,
              }
            : null,
        {
            name: 'direction_regionale',
            label: intl.formatMessage({ id: 'regionalDirectorate' }),
            list: listDirection,
            isSelect: true,
            props: { disabled: listDirection.length === 1 },
        },
    ]

    return formElments
        .filter(el => el)
        .map((el, index) =>
            el.isCheckBox ? (
                <CheckboxField
                    key={`${el.name}${index}`}
                    onchange={e => fieldChangedHandler(e, el.name)}
                    name={el.name}
                    label={el.label}
                    list={el.list}
                    selectedItem={newPayload[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                />
            ) : el.isMultiSelect ? (
                <MultiSelectList
                    key={`${el.name}${index}`}
                    onchange={e => fieldChangedHandler(e, el.name)}
                    name={el.name}
                    label={el.label}
                    list={el.list}
                    selectedItem={newPayload[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                />
            ) : el.isSelect ? (
                <SelectList
                    key={`${el.name}${index}`}
                    onchange={e => {
                        fieldChangedHandler(e, el.name)
                    }}
                    name={el.name}
                    label={el.label}
                    list={el.list}
                    selectedItem={newPayload[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    attributes={el.props}
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
                    chosenItem={newPayload[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                />
            ) : (
                <InputText
                    key={`${el.name}${index}`}
                    onchange={e => fieldChangedHandler(e, el.name)}
                    name={el.name}
                    label={el.label}
                    placeholder={el.placeholder}
                    type={el.type}
                    value={newPayload[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    attributes={el.props}
                />
            )
        )
}

renderForm.propTypes = {
    allUniteRegionales: PropType.array.isRequired,
    allReferenciels: PropType.object.isRequired,
    intl: PropType.object.isRequired,
    language: PropType.string.isRequired,
    loggedUser: PropType.object.isRequired,
    payload: PropType.object.isRequired,
    isError: PropType.bool.isRequired,
    errorsList: PropType.object.isRequired,
    fieldChangedHandler: PropType.func.isRequired,
    getLoggedUserDR: PropType.func.isRequired,
}
export default renderForm
