/* eslint-disable react/no-array-index-key */
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import InputText from '../../components/ui/input'
import SelectList from '../../components/ui/select'

const RenderForm = ({
    intl,
    isError,
    errorsList,
    handleChange,
    update,
    allReferenciels,
    data,
    language,
}) => {
    const listSecteur = allReferenciels.referenciels.RefSecteur.map(i => ({
        label: language === 'ar' ? i.intituleAr : i.intituleFr,
        value: i.id,
    }))

    const listSousSecteur = allReferenciels.referenciels.RefSousSecteur.filter(
        e => e.parent && e.parent.id === data.secteur_activite
    ).map(i => ({
        label: language === 'ar' ? i.intituleAr : i.intituleFr,
        value: i.id,
    }))

    const listFormation = allReferenciels.referenciels.RefNiveauEtude.map(
        i => ({
            label: language === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        })
    )
    const listDiplome = allReferenciels.referenciels.RefNiveauDiplome.map(
        i => ({
            label: language === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        })
    )

    const formElments = [
        {
            name: 'secteur_activite',
            label: <FormattedMessage id="sector" />,
            placeholder: intl.formatMessage({ id: 'sector' }),
            isSelect: true,
            list: listSecteur,
        },

        {
            name: 'sous_secteur_activite',
            label: <FormattedMessage id="subsector" />,
            placeholder: intl.formatMessage({ id: 'subsector' }),
            isSelect: true,
            list: listSousSecteur,
        },
        {
            name: 'niveau_etude',
            label: <FormattedMessage id="FormationNature" />,
            placeholder: intl.formatMessage({ id: 'FormationNature' }),
            isSelect: true,
            list: listFormation,
        },
        {
            name: 'niveau_diplome',
            label: <FormattedMessage id="Diplomalevel" />,
            placeholder: intl.formatMessage({ id: 'Diplomalevel' }),
            isSelect: true,
            list: listDiplome,
        },

        {
            name: 'intitule_ar',
            label: <FormattedMessage id="specialityNameAr" />,
            placeholder: intl.formatMessage({ id: 'speciality' }),
        },

        {
            name: 'intitule_fr',
            label: <FormattedMessage id="specialityNameFr" />,
            placeholder: intl.formatMessage({ id: 'speciality' }),
        },
        {
            name: 'code_specialite',
            label: <FormattedMessage id="code" />,
            placeholder: intl.formatMessage({ id: 'code' }),
        },
        {
            name: 'frais_specialite_exam',
            label: <FormattedMessage id="ExamFees" />,
            placeholder: intl.formatMessage({ id: 'ExamFees' }),
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
