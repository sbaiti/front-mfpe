/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react' // , { useEffect, useState }
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import RadioField from '../../../ui/radio'
import SelectList from '../../../ui/select'
import TextArea from '../../../ui/textarea'

const PvAccepte = props => {
    const {
        errorsList,
        isError,
        status,
        allReferentiels,
        fieldChangedHandler,
        forceUpdate,
        language,
        demande,
        intl,
        motif,
        update,
        observation,
    } = props

    const motifs = (allReferentiels.referenciels.RefMotif || [])
        .filter(i => i.parent && i.parent.id === demande.currentStatut.id)
        .map(i => ({
            label: language === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))
    return (
        <Fragment>
            <RadioField
                className="col-12"
                onchange={e => {
                    fieldChangedHandler(e, 'status')
                    fieldChangedHandler({ target: { value: '' } }, 'motif')
                    fieldChangedHandler(
                        { target: { value: '' } },
                        'observation'
                    )
                    forceUpdate()
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
            {status === '0' ? (
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
                        update('motif')
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
            ) : (
                <TextArea
                    className="col-12"
                    onchange={e => {
                        fieldChangedHandler(
                            {
                                target: {
                                    value: e.target.value,
                                },
                            },
                            'observation'
                        )
                        forceUpdate()
                    }}
                    label={<FormattedMessage id="observation" />}
                    placeholder={intl.formatMessage({ id: 'observation' })}
                    value={observation}
                    errorText={errorsList.observation}
                    isError={
                        isError &&
                        Object.keys(errorsList).includes('observation')
                    }
                    required={false}
                />
            )}
        </Fragment>
    )
}
export default PvAccepte

PvAccepte.propTypes = {
    errorsList: PropTypes.object.isRequired,
    isError: PropTypes.bool.isRequired,
    allReferentiels: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    motif: PropTypes.object.isRequired,
    observation: PropTypes.string.isRequired,
    forceUpdate: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    fieldChangedHandler: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    demande: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
}
