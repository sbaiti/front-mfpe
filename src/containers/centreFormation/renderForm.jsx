/* eslint-disable react/no-array-index-key */
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import InputText from '../../components/ui/input'
import SelectList from '../../components/ui/select'
import DateField from '../../components/ui/datePicker'
import InputTel from '../../components/ui/tel'
import formatPhoneNumber from '../../shared/formatPhoneNumber'
import MultiSelectList from '../../components/ui/select/multiSelect'

const RenderForm = ({
    intl,
    isError,
    errorsList,
    handleChange,
    update,
    allReferenciels,
    allSpecialities,
    data,
    language,
}) => {
    const intitule = `intitule${language[0].toUpperCase()}r`
    let listGov = []
    let listDelegation = []
    let listSpecialities = []
    let selectedSector = null
    let listSecteur = []
    const listOrganisme = [
        { value: 'ATFP', label: 'ATFP' },
        { value: 'AVFA', label: 'AVFA' },
        { value: 'ONTT', label: 'ONTT' },
        { value: 'Autres', label: 'Autres' },
    ]

    try {
        listSpecialities = allSpecialities.map(i => ({
            label: i[intitule],
            value: i.id,
        }))
        listGov = allReferenciels.referenciels.RefGouvernorat.map(i => ({
            label: i[intitule],
            value: i.id,
        }))
        listDelegation = allReferenciels.referenciels.RefDelegation.filter(
            e => e.parent && e.parent.id === data.gouvernorat
        ).map(i => ({
            label: i[intitule],
            value: i.id,
        }))
        listSecteur = allReferenciels.referenciels.RefSecteur.map(i => {
            if (i.id === data.secteur_activite) selectedSector = i
            return {
                label: language === 'ar' ? i.intituleAr : i.intituleFr,
                value: i.id,
            }
        })
    } catch (error) {
        console.log('error here', error)
    }

    const formElments = [
        {
            name: 'intitule_ar',
            label: <FormattedMessage id="centernameAr" />,
            placeholder: intl.formatMessage({ id: 'centernameAr' }),
        },
        {
            name: 'intitule_fr',
            label: <FormattedMessage id="centernameFr" />,
            placeholder: intl.formatMessage({ id: 'centernameFr' }),
        },

        {
            name: 'adresse',
            label: <FormattedMessage id="address" />,
            placeholder: intl.formatMessage({ id: 'address' }),
        },

        {
            name: 'tel',
            label: <FormattedMessage id="phone" />,
            placeholder: intl.formatMessage({ id: 'phone' }),
            isTel: true,
        },
        {
            name: 'fax',
            label: <FormattedMessage id="fax" />,
            placeholder: intl.formatMessage({ id: 'fax' }),
            type: 'number',
            isTel: true,
        },
        {
            name: 'email',
            label: <FormattedMessage id="email" />,
            placeholder: intl.formatMessage({ id: 'email' }),
        },
        {
            name: 'nom_directeur_ar',
            label: <FormattedMessage id="nomDirecteurAr" />,
            placeholder: intl.formatMessage({ id: 'nomDirecteurAr' }),
        },
        {
            name: 'nom_directeur_fr',
            label: <FormattedMessage id="nomDirecteurFr" />,
            placeholder: intl.formatMessage({ id: 'nomDirecteurFr' }),
        },
        {
            name: 'annee_creation',
            label: <FormattedMessage id="anneeCreation" />,
            placeholder: intl.formatMessage({ id: 'anneeCreation' }),
            isDate: true,
            props: { format: 'yyyy', views: ['year'] },
        },
        {
            name: 'capacite_acceuil',
            label: <FormattedMessage id="capaciteAccueil" />,
            placeholder: intl.formatMessage({ id: 'capaciteAccueil' }),
            type: 'number',
        },
        {
            name: 'secteur_activite',
            label: <FormattedMessage id="sector" />,
            placeholder: intl.formatMessage({ id: 'sector' }),
            isSelect: true,
            list: listSecteur,
        },

        selectedSector &&
            selectedSector.type === 'public' && {
                name: 'organisme',
                label: <FormattedMessage id="organisme" />,
                isSelect: true,
                list: listOrganisme,
            },
        selectedSector &&
            selectedSector.type === 'private' && {
                name: 'gouvernorat',
                label: <FormattedMessage id="governorate" />,
                isSelect: true,
                list: listGov,
            },
        selectedSector &&
            selectedSector.type === 'private' && {
                name: 'delegation',
                label: <FormattedMessage id="delegation" />,
                isSelect: true,
                list: listDelegation,
            },
        selectedSector &&
            selectedSector.type === 'private' && {
                name: 'numero_enregistrement',
                label: <FormattedMessage id="numeroEnregistrement" />,
                type: 'number',
            },
        {
            name: 'specialites',
            label: <FormattedMessage id="speciality" />,
            isMultiSelect: true,
            list: listSpecialities,
        },
        {
            name: 'nombre_formateur',
            label: <FormattedMessage id="nombreFormateur" />,
            type: 'number',
        },
        {
            name: 'nbre_cadre_administratif',
            label: <FormattedMessage id="nombreCadreAdministratif" />,
            placeholder: intl.formatMessage({
                id: 'nombreCadreAdministratif',
            }),
            type: 'number',
        },
        {
            name: 'capacite_hybergement',
            label: <FormattedMessage id="capaciteHebergement" />,
            placeholder: intl.formatMessage({ id: 'capaciteHebergement' }),
            type: 'number',
        },
        {
            name: 'capacite_resto',
            label: <FormattedMessage id="capaciteRestaurant" />,
            placeholder: intl.formatMessage({ id: 'capaciteRestaurant' }),
            type: 'number',
        },
    ]
    return formElments
        .filter(el => el)
        .map((el, index) => {
            return el.isSelect ? (
                <SelectList
                    key={`${el.name}${index} `}
                    onchange={e => {
                        handleChange(e, el.name)
                        update(el.name)
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
            ) : el.isMultiSelect ? (
                <MultiSelectList
                    key={`${el.name}${index} `}
                    onchange={e => handleChange(e, el.name)}
                    name={el.name}
                    label={el.label}
                    list={el.list}
                    selectedItem={data[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    onClose={() => update(el.name)}
                />
            ) : el.isTel ? (
                <InputTel
                    key={`${el.name}${index}`}
                    onchange={value => {
                        handleChange({ target: { value } }, el.name)
                    }}
                    name={el.name}
                    label={el.label}
                    placeholder={el.placeholder}
                    value={formatPhoneNumber(data[el.name])}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    required={el.required}
                />
            ) : el.isDate ? (
                <DateField
                    key={`${el.name}${index}`}
                    onchange={e => handleChange(e, el.name)}
                    name={el.name}
                    label={el.label}
                    isArabic={language === 'ar'}
                    defaultValue={new Date(data[el.name], 0, 1)}
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
    allReferenciels: PropTypes.object.isRequired,
    allSpecialities: PropTypes.array,
    language: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorsList: PropTypes.object,
}

RenderForm.defaultProps = {
    errorsList: null,
    isError: false,
    allSpecialities: [],
}
export default injectIntl(RenderForm)
