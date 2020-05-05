/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react' // , { useEffect, useState }
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import RadioField from '../../../ui/radio'
import InputText from '../../../ui/input'
import SelectList from '../../../ui/select'

const ScanOk = props => {
    const {
        errorsList,
        isError,
        allReferentiels,
        status,
        motif,
        fieldChangedHandler,
        forceUpdate,
        demande,
        update,
        language,
    } = props
    const allMotifs = (allReferentiels.referenciels.RefMotif || [])
        .filter(i => i.parent && i.parent.id === demande.currentStatut.id)
        .map(i => ({
            label: language === 'fr' ? i.intituleFr : i.intituleAr,
            value: i.id,
        }))

    return (
        <Fragment>
            <RadioField
                className="col-12"
                onchange={e => {
                    fieldChangedHandler(e, 'status')
                    fieldChangedHandler({ target: { value: '' } }, 'motif')
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
                    list={allMotifs}
                    selectedItem={motif.id}
                    errorText={errorsList.motif}
                    isError={
                        isError && Object.keys(errorsList).includes('motif')
                    }
                />
            ) : (
                <InputText
                    className="col-12"
                    label={<FormattedMessage id="examFees" />}
                    rows={3}
                    value={(demande.specialite || {}).fraisSpecialiteExam || ''}
                    attributes={{ disabled: true }}
                />
            )}
        </Fragment>
    )
}
export default ScanOk

ScanOk.propTypes = {
    errorsList: PropTypes.object.isRequired,
    isError: PropTypes.bool.isRequired,
    allReferentiels: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    motif: PropTypes.string.isRequired,
    forceUpdate: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    fieldChangedHandler: PropTypes.func.isRequired,
    demande: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
}
