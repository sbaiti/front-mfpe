/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import addDays from 'date-fns/addDays'
import { FormControl } from '@material-ui/core'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import DateField from '../../../ui/datePicker'
import InputText from '../../../ui/input'

const PaymentOk = props => {
    const {
        errorsList,
        isError,
        language,
        demande,
        fieldChangedHandler,
        nextStatus,
        intl,
    } = props

    demande.nextStatus = nextStatus

    const examDate =
        new Date(demande.date_exam).getDate() >=
        addDays(new Date(), 10).getDate()
            ? new Date(demande.date_exam)
            : addDays(new Date(), 10)

    fieldChangedHandler({ target: { value: examDate } }, 'date_exam')
    const [selectedDate, handleDateChange] = useState(new Date(examDate))
    const [observations, setObservation] = useState(
        demande.material ? demande.material : ''
    )

    useEffect(() => {
        demande.material = observations
    }, [observations])

    return (
        <Fragment>
            <DateField
                className="col-12"
                label={<FormattedMessage id="examDate" />}
                onchange={e => {
                    const selected = {
                        target: {
                            value: `${e.target.value}T${
                                examDate.toJSON().split('T')[1]
                            }`,
                        },
                    }
                    handleDateChange(selected.target.value)
                    fieldChangedHandler(selected, 'date_exam')
                }}
                name="date_exam"
                isArabic={language === 'ar'}
                defaultValue={examDate}
                errorText={errorsList.date_exam}
                isError={
                    isError && Object.keys(errorsList).includes('date_exam')
                }
                attributes={{
                    disableFuture: false,
                    minDate: addDays(new Date(), 10),
                }}
            />
            <FormControl className="w-100">
                <label className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary">
                    {intl.formatMessage({ id: 'examTime' })}
                    {' * '}
                </label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                        ampm={false}
                        value={selectedDate}
                        views={['hours', 'minutes']}
                        onChange={e => {
                            const selected = {
                                target: {
                                    value: e.toJSON(),
                                },
                            }
                            handleDateChange(e.toJSON())
                            fieldChangedHandler(selected, 'date_exam')
                        }}
                        cancelLabel={language === 'ar' ? 'الغاء' : 'Annuler'}
                        okLabel={language === 'ar' ? 'موافق' : 'Ok'}
                        InputProps={{
                            disableUnderline: true,
                            margin: 'dense',
                        }}
                        className="pl-3 pr-3 mb-0 mt-1 ml-2 mr-2 "
                        style={{
                            height: '46px',
                            border: '1px solid rgb(73, 160, 174)',
                            paddingTop: 9,
                        }}
                    />
                </MuiPickersUtilsProvider>
            </FormControl>
            <FormControl className="w-100">
                <InputText
                    name="observations"
                    className="col-12"
                    label={<FormattedMessage id="observation" />}
                    rows={3}
                    value={observations}
                    onchange={e => {
                        setObservation(e.target.value)
                    }}
                />
            </FormControl>
        </Fragment>
    )
}
export default injectIntl(PaymentOk)

PaymentOk.defaultProps = {
    nextStatus: null,
}

PaymentOk.propTypes = {
    errorsList: PropTypes.object.isRequired,
    isError: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    demande: PropTypes.object.isRequired,
    fieldChangedHandler: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    nextStatus: PropTypes.string,
}
