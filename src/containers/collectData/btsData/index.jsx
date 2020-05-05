/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUploadSharp } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import uploadBtsFileActions from '../../../redux/donneesBts/uploadBtsFile'
import ButtonComponent from '../../../components/ui/button'
import SelectList from '../../../components/ui/select'
import Icons from '../../../components/icons'
import setPageTitleActions from '../../../redux/pageTitle'
import alertActions from '../../../redux/alert'

const draggableInput = {
    border: '2px dashed #49a0ae',
    outline: 0,
}

const listItems = [
    { value: 1, label: 'Agence' },
    { value: 2, label: 'Projet' },
    { value: 3, label: 'Libelle' },
    { value: 4, label: 'Niveau instruction' },
    { value: 5, label: 'Secteur' },
]
/**
 *
 *
 * @param {*} props
 * @returns
 */
const UploadBtsFile = props => {
    const [files, setFiles] = useState([])
    const [errors, setErrors] = useState([])
    const [fileDetails, setFileDetails] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [disableButton, setDisableButton] = useState(true)
    const {
        intl,
        history,
        uploadFile,
        loading,
        uploadBtsFileResponse,
        setPageTitle,
        alertShow,
        success,
    } = props

    setPageTitle('donneesBts')

    const handleChange = (e, type) => {
        setSelectedItem(type)
    }

    const initState = () => {
        setErrors([])
        setFileDetails(null)
        setSelectedItem(null)
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
            files.forEach(file => URL.revokeObjectURL(file.preview))
        },
        [files]
    )

    useEffect(() => {
        initState()
    }, [uploadBtsFileResponse, success])

    useEffect(() => {
        if (fileDetails && selectedItem) {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
    }, [fileDetails, selectedItem])

    useEffect(() => {
        if (success) {
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
    }, [success])

    const onsubmit = () => {
        if (fileDetails && !errors) {
            const file = new FormData()
            file.append('doc', fileDetails)
            file.append('type', selectedItem)
            uploadFile(file)
        }
        return false
    }

    const getBackButtonName = () => {
        if (fileDetails || selectedItem) {
            return 'reset'
        }
        return 'cancel'
    }

    const getBackButtonAction = () => {
        if (fileDetails || selectedItem) {
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
                <SelectList
                    key="selectProjectType"
                    className="mx-auto w-50 mx-auto text-center d-flex my-5"
                    onchange={e => {
                        handleChange(e, e.target.value)
                    }}
                    selectedItem={selectedItem}
                    name="selectProjectType"
                    label={intl.formatMessage({
                        id: 'selectProjectType',
                    })}
                    list={listItems}
                />
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

const mapStateToProps = ({ btsData }) => {
    const { uploadBtsFile } = btsData
    return {
        uploadBtsFileResponse: uploadBtsFile.response,
        success: uploadBtsFile.success,
        loading: uploadBtsFile.loading,
    }
}

const mapDispatchToProps = dispatch => ({
    uploadFile: filePayload =>
        dispatch(uploadBtsFileActions.uploadBtsFileRequest(filePayload)),
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

UploadBtsFile.defaultProps = {
    success: false,
    loading: false,
    uploadBtsFileResponse: null,
}

UploadBtsFile.propTypes = {
    intl: PropTypes.object.isRequired,
    success: PropTypes.bool,
    loading: PropTypes.bool,
    history: PropTypes.object.isRequired,
    uploadFile: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    uploadBtsFileResponse: PropTypes.object,
    alertShow: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(UploadBtsFile))
