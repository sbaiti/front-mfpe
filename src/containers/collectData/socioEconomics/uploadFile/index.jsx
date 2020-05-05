/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUploadSharp } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import uploadSocioEcoFileActions from '../../../../redux/donneesSocioEconomique/uploadSocioEcoFile'
import ButtonComponent from '../../../../components/ui/button'
import Icons from '../../../../components/icons'
import setPageTitleActions from '../../../../redux/pageTitle'
import alertActions from '../../../../redux/alert'

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
const UploadFile = props => {
    const [files, setFiles] = useState([])
    const [errors, setErrors] = useState([])
    const [fileDetails, setFileDetails] = useState(null)
    const [disableButton, setDisableButton] = useState(true)
    const {
        intl,
        history,
        uploadFile,
        loading,
        socioDataFileResponse,
        setPageTitle,
        alertShow,
        isSuccess,
    } = props

    setPageTitle('donnéesSocioéconomiques')

    const initState = () => {
        setErrors([])
        setFileDetails(null)
    }

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: ['.csv', '.xls', '.xlsx'],
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
            // handleUploadFile(acceptedFiles[0])
            setFileDetails(acceptedFiles[0])
        },
        maxSize: 10485760,
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

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview))
        },
        [files]
    )

    useEffect(() => {
        initState()
    }, [socioDataFileResponse, isSuccess])

    useEffect(() => {
        if (fileDetails) {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
    }, [fileDetails, errors])

    useEffect(() => {
        if (isSuccess) {
            alertShow(true, {
                onConfirm: false,
                warning: false,
                info: false,
                error: false,
                success: true,
                message: intl.formatMessage({
                    id: 'successSagaMessage',
                }),
                title: intl.formatMessage({
                    id: 'successSagaTitle',
                }),
            })
        }
    }, [isSuccess])

    const onsubmit = () => {
        if (fileDetails && !errors) {
            const fileData = new FormData()
            fileData.append('document', fileDetails)
            uploadFile(fileData)
        }
        return false
    }

    const getBackButtonName = () => {
        if (fileDetails) {
            return 'reset'
        }
        return 'cancel'
    }

    const getBackButtonAction = () => {
        if (fileDetails) {
            initState()
            return
        }
        history.goBack()
    }

    const getButtons = () => {
        return (
            <div className="d-flex justify-content-center my-5">
                <ButtonComponent
                    color="secondary"
                    type="outlined"
                    label={intl.formatMessage({
                        id: getBackButtonName(),
                    })}
                    size="large"
                    clicked={getBackButtonAction}
                />
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="large"
                    label={intl.formatMessage({
                        id: 'save',
                    })}
                    clicked={onsubmit}
                    disabled={disableButton}
                />
            </div>
        )
    }

    return (
        <Fragment>
            {loading && <LinearProgress color="secondary" />}
            <div className="container mx-auto my-5">
                <div
                    {...getRootProps({ className: 'dropzone' })}
                    className={`w-50 mx-auto p-4 text-center ${
                        isDragAccept ? 'border-success' : null
                    } ${isDragReject ? 'border-danger' : null}`}
                    style={draggableInput}
                >
                    {fileDetails ? (
                        <Fragment>
                            <Icons
                                name="spreadSheet"
                                viewBox="0 0 600 600"
                                width="150"
                                height="150"
                            />
                            <p className="text-primary">
                                <b>
                                    {intl.formatMessage({
                                        id: 'fileName',
                                    })}
                                    :{' '}
                                </b>
                                {fileDetails.name}
                            </p>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <input {...getInputProps()} />
                            <p>
                                <FormattedMessage id="dragDropDescription" />
                            </p>

                            <CloudUploadSharp
                                color="secondary"
                                fontSize="large"
                            />
                        </Fragment>
                    )}
                </div>
                {getButtons()}
            </div>
        </Fragment>
    )
}

const mapStateToProps = ({ SocioData }) => {
    const { uploadSocioEcoFile: uploadSocioData } = SocioData

    return {
        socioDataFileResponse: uploadSocioData.response,
        loading: uploadSocioData.loading,
        isSuccess: uploadSocioData.success,
    }
}

const mapDispatchToProps = dispatch => ({
    uploadFile: filePayload =>
        dispatch(
            uploadSocioEcoFileActions.uploadSocioEcoFileRequest(filePayload)
        ),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
    alertShow: (show, info) =>
        dispatch(
            alertActions.alertShow(show, {
                onConfirm: info.onConfirm,
                warning: info.warning,
                info: info.info,
                error: info.error,
                success: info.success,
                message: info.message,
                title: info.title,
            })
        ),
})

UploadFile.defaultProps = {
    loading: false,
    isSuccess: false,
    socioDataFileResponse: null,
}

UploadFile.propTypes = {
    intl: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    isSuccess: PropTypes.bool,
    history: PropTypes.object.isRequired,
    uploadFile: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    socioDataFileResponse: PropTypes.object,
    alertShow: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(UploadFile))
