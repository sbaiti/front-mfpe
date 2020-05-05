/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUploadSharp } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'

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
/**
 *
 *
 * @param {*} props
 * @returns
 */
const DateExam = props => {
    const [files, setFiles] = useState([])
    const [errors, setErrors] = useState([])
    const { onGetFileUpload, isError, errorsList, intl } = props
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
            onGetFileUpload(acceptedFiles[0])
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
    const fileError =
        (isError && Object.keys(errorsList).includes('file')) ||
        Object.keys(errors).length > 0
    return (
        <Fragment>
            <div
                {...getRootProps({ className: 'dropzone' })}
                className={`p-4 text-center ${
                    isDragAccept ? 'border-success' : null
                } ${isDragReject || fileError ? 'border-danger' : null}`}
                style={draggableInput}
            >
                <input {...getInputProps()} />
                <p>
                    <FormattedMessage id="dragDropDescription" />
                </p>

                <CloudUploadSharp color="secondary" fontSize="large" />
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
            {fileError && (
                <div className="alert alert-danger text-left" role="alert">
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
            )}
        </Fragment>
    )
}
export default injectIntl(DateExam)

DateExam.propTypes = {
    intl: PropTypes.object.isRequired,
    onGetFileUpload: PropTypes.func.isRequired,
    errorsList: PropTypes.object.isRequired,
    isError: PropTypes.bool.isRequired,
}
