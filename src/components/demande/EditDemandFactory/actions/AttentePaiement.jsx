/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react' // , { useEffect, useState }
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import InputAdornment from '@material-ui/core/InputAdornment'
import RadioField from '../../../ui/radio'
import InputText from '../../../ui/input'
import SelectList from '../../../ui/select'

const AttentePaiment = props => {
    const {
        status,
        fieldChangedHandler,
        language,
        allReferentiels,
        errorsList,
        isError,
        demande,
        forceUpdate,
        update,
        motif,
    } = props
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
                label={<FormattedMessage id="amount" />}
                value="250"
                attributes={{ disabled: true }}
                disabled
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <FormattedMessage id="currency" />
                        </InputAdornment>
                    ),
                }}
            />

            <RadioField
                className="col-12"
                onchange={e => {
                    fieldChangedHandler(e, 'status')
                    fieldChangedHandler(
                        { target: { value: '' } },
                        'acceptPayment'
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
            {status === '0' && (
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
            )}
        </Fragment>
    )
}
export default AttentePaiment

AttentePaiment.propTypes = {
    errorsList: PropTypes.object.isRequired,
    isError: PropTypes.bool.isRequired,
    allReferentiels: PropTypes.object.isRequired,
    motif: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    fieldChangedHandler: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    demande: PropTypes.object.isRequired,
    forceUpdate: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
}
