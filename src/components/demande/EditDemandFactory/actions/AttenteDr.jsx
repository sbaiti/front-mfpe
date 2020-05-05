/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { getTranslatedAttribute } from '../../../../shared/utility'
import InputText from '../../../ui/input'
import RadioField from '../../../ui/radio'
import SelectList from '../../../ui/select'

const AttentedDr = props => {
    const {
        status,
        fieldChangedHandler,
        update,
        intl,
        allReferentiels,
        language,
        demande,
        isError,
        errorsList,
        allSpecialites,
        motif,
    } = props

    const [action, setAction] = useState(1)
    const domaines = (allReferentiels.referenciels.RefDomaine || []).map(i => ({
        label: language === 'ar' ? i.intituleAr : i.intituleFr,
        value: i.id,
    }))
    const secteurs = (allReferentiels.referenciels.RefSecteur || [])
        .filter(s => s.parent && s.parent.id === demande.domaine.id)
        .map(i => ({
            label: language === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))
    const spec = (allSpecialites || [])
        .filter(s => s.secteur && s.secteur.id === demande.secteur.id)
        .map(i => ({
            label: i[getTranslatedAttribute(language)],
            value: i.id,
        }))
    const motifs = (allReferentiels.referenciels.RefMotif || [])
        .filter(i => i.parent && i.parent.id === demande.currentStatut.id)
        .map(i => ({
            label: language === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))
    return (
        <Fragment>
            <InputText
                className="col-12"
                label={<FormattedMessage id="speciality" />}
                placeholder={intl.formatMessage({
                    id: 'speciality',
                })}
                value={demande.specialiteCitoyen}
                attributes={{ disabled: true }}
            />
            <SelectList
                className="col-12"
                onchange={e => {
                    fieldChangedHandler(
                        {
                            target: {
                                value: { id: e.target.value },
                            },
                        },
                        'domaine'
                    )
                    update('domaine')
                }}
                name="domaine"
                label={<FormattedMessage id="domaine" />}
                list={domaines}
                selectedItem={demande.domaine.id}
                errorText={errorsList.domaine}
                isError={isError && Object.keys(errorsList).includes('domaine')}
            />
            <SelectList
                className="col-12"
                onchange={e => {
                    fieldChangedHandler(
                        {
                            target: {
                                value: { id: e.target.value },
                            },
                        },
                        'secteur'
                    )
                    update('secteur')
                }}
                name="secteur"
                label={<FormattedMessage id="sector" />}
                list={secteurs}
                selectedItem={demande.secteur.id}
                errorText={errorsList.secteur}
                isError={isError && Object.keys(errorsList).includes('secteur')}
            />
            <SelectList
                className="col-12"
                onchange={e => {
                    fieldChangedHandler(
                        {
                            target: {
                                value: { id: e.target.value },
                            },
                        },
                        'specialite'
                    )
                    update('specialite')
                }}
                name="specialite"
                label={<FormattedMessage id="relatedSpeciality" />}
                list={spec}
                selectedItem={(demande.specialite || {}).id}
                errorText={errorsList.specialite}
                isError={
                    isError && Object.keys(errorsList).includes('specialite')
                }
            />
            <RadioField
                className="col-12"
                onchange={e => {
                    fieldChangedHandler(e, 'status')
                    setAction(e.target.value)
                }}
                label={<FormattedMessage id="action" />}
                list={[
                    {
                        label: <FormattedMessage id="accept" />,
                        value: 1,
                    },
                    {
                        label: <FormattedMessage id="refuse" />,
                        value: 0,
                    },
                ]}
                chosenItem={status}
            />

            {action === '0' && (
                <SelectList
                    className="col-12"
                    onchange={e => {
                        fieldChangedHandler(
                            {
                                target: {
                                    value: { id: e.target.value },
                                },
                            },
                            'motif'
                        )
                    }}
                    name="motif"
                    label={<FormattedMessage id="motive" />}
                    list={motifs}
                    selectedItem={(motif || {}).id}
                    errorText={errorsList.motif}
                    isError={
                        isError && Object.keys(errorsList).includes('motif')
                    }
                />
            )}
        </Fragment>
    )
}
export default AttentedDr

AttentedDr.propTypes = {
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    allReferentiels: PropTypes.object,
    status: PropTypes.string,
    motif: PropTypes.string.isRequired,
    fieldChangedHandler: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    demande: PropTypes.object.isRequired,
    isError: PropTypes.bool.isRequired,
    errorsList: PropTypes.object.isRequired,
    allSpecialites: PropTypes.array,
}

AttentedDr.defaultProps = {
    allReferentiels: {},
    status: '1',
    allSpecialites: {},
}
