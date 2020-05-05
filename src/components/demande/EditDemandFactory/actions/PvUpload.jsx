/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react' // , { useEffect, useState }
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import RadioField from '../../../ui/radio'
import SelectList from '../../../ui/select'

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
}
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: '100%',
    height: '100%',
    padding: 4,
    boxSizing: 'border-box',
}
const thumbInner = {
    display: 'flex',
    margin: '0 auto',
    overflow: 'hidden',
    width: '100%',
}
const PvUpload = props => {
    const {
        errorsList,
        isError,
        status,
        allReferentiels,
        fieldChangedHandler,
        forceUpdate,
        files,
        language,
        motif,
        demande,
        update,
    } = props
    const thumbs =
        files && files.length ? (
            files[files.length - 1].type === 'PV' && (
                <div style={thumb} key={files[files.length - 1].name}>
                    <div style={thumbInner}>
                        <iframe
                            id="pdf_doc"
                            title={files[files.length - 1].name}
                            src={`http://${files[files.length - 1].path}`}
                            type="application/pdf"
                            width="400"
                            height="600"
                            style={{ overflow: 'auto', width: '100%' }}
                        ></iframe>
                    </div>
                </div>
            )
        ) : (
            <div />
        )

    const motifs = (allReferentiels.referenciels.RefMotif || [])
        .filter(i => i.parent && i.parent.id === demande.currentStatut.id)
        .map(i => ({
            label: language === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))
    return (
        <Fragment>
            <label className=" mb-0 mt-3 ml-3 mr-3">
                <FormattedMessage id="pv" />
            </label>
            <aside className=" mb-0 mt-3 ml-3 mr-3" style={thumbsContainer}>
                {thumbs}
            </aside>
            <RadioField
                className="col-12"
                onchange={e => {
                    fieldChangedHandler(e, 'status')
                    fieldChangedHandler({ target: { value: '' } }, 'motif')
                    fieldChangedHandler({ target: { value: '' } }, 'resultat')
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
            ) : null}
        </Fragment>
    )
}
export default PvUpload

PvUpload.propTypes = {
    errorsList: PropTypes.object.isRequired,
    isError: PropTypes.bool.isRequired,
    allReferentiels: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    motif: PropTypes.string.isRequired,
    forceUpdate: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    fieldChangedHandler: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
    demande: PropTypes.object.isRequired,
}
