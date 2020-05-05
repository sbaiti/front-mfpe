/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { useDropzone } from 'react-dropzone'
import { CloudUploadSharp } from '@material-ui/icons'
import { getTranslatedAttribute } from '../../../../shared/utility'
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

const draggableInput = {
    border: '2px dashed #49a0ae',
    outline: 0,
}
const SpecialiteChoisie = props => {
    const [files, setFiles] = useState([])
    const [errors, setErrors] = useState('')

    const { onGetFile, intl } = props
    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: 'application/pdf',
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
            onGetFile(acceptedFiles[0])
        },
        maxSize: 1048576,
        onDropRejected: () => {
            setErrors(
                intl.formatMessage({
                    id: 'WRONG_ALERT',
                })
            )
        },
        onDropAccepted: () => {
            setErrors('')
        },
    })
    const thumbs =
        files && files.length ? (
            <div style={thumb} key={files[files.length - 1].name}>
                <div style={thumbInner}>
                    <iframe
                        id="pdf_doc"
                        title={files[files.length - 1].name}
                        src={files[files.length - 1].preview}
                        type="application/pdf"
                        width="400"
                        height="600"
                        style={{ overflow: 'auto', width: '100%' }}
                    ></iframe>
                </div>
            </div>
        ) : (
            <div />
        )

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview))
        },
        [files]
    )
    const {
        errorsList,
        isError,
        fieldChangedHandler,
        allCenters,
        demande,
        loggedUser,
        update,
    } = props

    const centres = (allCenters || []).map(i => ({
        label: i[getTranslatedAttribute(intl.locale)],
        value: i.id,
    }))
    const fileError =
        (isError && Object.keys(errorsList).includes('file[]')) ||
        Object.keys(errors).length > 0
    const disableCentreFormation =
        demande.currentStatut.code === 'CENTRE_OK' &&
        (demande.centreFormation || {}).id &&
        true
    return (
        <Fragment>
            <SelectList
                className="col-12"
                onchange={e => {
                    fieldChangedHandler(
                        {
                            target: {
                                value: { id: e.target.value },
                            },
                        },
                        'centre_formation'
                    )
                    update('centre_formation')
                }}
                name="centre_formation"
                label={<FormattedMessage id="trainingCenter" />}
                list={centres}
                selectedItem={demande.centre_formation.id}
                errorText={errorsList.centre_formation}
                isError={
                    isError &&
                    Object.keys(errorsList).includes('centre_formation')
                }
                attributes={{ disabled: disableCentreFormation }}
            />
            {loggedUser.User.details.userRoles.find(r =>
                [
                    'ROLE_AGENT_DR3',
                    'ROLE_ADMIN',
                    'ROLE_CYNAPSYS',
                    'ROLE_SUPER_ADMIN',
                ].includes(r.role)
            ) && [
                <label className="pull-left ml-3 mr-3" key="glk2Fgn8lM">
                    <FormattedMessage id="attachments" />
                </label>,
                <Grid item className=" p-2 text-center" key="jk1Gg89dm">
                    <div
                        {...getRootProps({ className: 'dropzone' })}
                        className={`p-4 ${
                            isDragAccept ? 'border-success' : null
                        } ${
                            isDragReject || fileError ? 'border-danger' : null
                        }`}
                        style={draggableInput}
                    >
                        <input {...getInputProps()} />
                        <p>
                            <FormattedMessage id="dragDropDescription" />
                        </p>

                        <CloudUploadSharp color="secondary" fontSize="large" />
                    </div>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                </Grid>,
                fileError ? (
                    <div
                        className="alert alert-danger text-left"
                        role="alert"
                        key="hjFs523dFg"
                    >
                        {errors}
                        <ul>
                            <li>
                                <FormattedMessage id="fileTypeInfo" />
                            </li>
                            <li>
                                <FormattedMessage id="fileMaxSizeInfo" />
                            </li>
                        </ul>
                    </div>
                ) : null,
            ]}
        </Fragment>
    )
}
export default SpecialiteChoisie

SpecialiteChoisie.propTypes = {
    errorsList: PropTypes.object.isRequired,
    allCenters: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    intl: PropTypes.object.isRequired,
    loggedUser: PropTypes.object.isRequired,
    demande: PropTypes.object.isRequired,
    fieldChangedHandler: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    onGetFile: PropTypes.func.isRequired,
}
