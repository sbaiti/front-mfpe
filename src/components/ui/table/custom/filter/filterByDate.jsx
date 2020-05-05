/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */

import React, { Fragment, useState } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import SearchIcon from '@material-ui/icons/Search'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import frLocale from 'date-fns/locale/fr'
import arLocale from 'date-fns/locale/ar-DZ'
import { isDate } from 'lodash'
import FormControl from '@material-ui/core/FormControl'
import { formatDate } from '../../../../../shared/utility'

function FilterByDate(props) {
    const {
        language,
        onHandleFilterSearch,
        minDate,
        maxDate,
        selectedMinDate,
        selectedMaxDate,
        intl,
        reset,
        isOpen,
    } = props

    const [selectedMin, handleMinDateChange] = useState(selectedMinDate)
    const [selectedMax, handleMaxDateChange] = useState(selectedMaxDate)
    const [open, handleOpen] = useState(isOpen)

    const handleSearchFilter = () => {
        let min = new Date()
        let max = new Date()

        if (!isDate(selectedMin) && !isDate(selectedMax)) {
            min = minDate
            max = maxDate
        } else if (!isDate(selectedMin)) {
            min = minDate
            max = selectedMax
        } else if (!isDate(selectedMax)) {
            max = maxDate
            min = selectedMin
        } else {
            min = selectedMin
            max = selectedMax
        }
        onHandleFilterSearch(min, max)
    }

    const resetSearchFilter = () => {
        handleMinDateChange(minDate)
        handleMaxDateChange(maxDate)
        reset()
    }

    const localeMap = {
        fr: frLocale,
        ar: arLocale,
    }

    return (
        <div className="w-75 my-3 mx-auto">
            <ExpansionPanel onChange={() => handleOpen(!open)} expanded={open}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <h5>
                        <FormattedMessage id="filterByDate" />
                    </h5>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="d-flex justify-content-around w-100">
                        <Fragment>
                            <FormControl>
                                <label className="font-weight-bold text-uppercase text-primary">
                                    {intl.formatMessage({
                                        id: 'dateFrom',
                                    })}{' '}
                                    :
                                </label>
                                <MuiPickersUtilsProvider
                                    utils={DateFnsUtils}
                                    locale={localeMap[language]}
                                >
                                    <KeyboardDatePicker
                                        value={selectedMin}
                                        placeholder={formatDate(minDate)}
                                        onChange={date =>
                                            handleMinDateChange(date)
                                        }
                                        format="dd/MM/yyyy"
                                        minDate={minDate}
                                        maxDate={selectedMax || maxDate}
                                        orientation="landscape"
                                        okLabel={intl.formatMessage({
                                            id: 'select',
                                        })}
                                        cancelLabel={intl.formatMessage({
                                            id: 'cancel',
                                        })}
                                        todayLabel={intl.formatMessage({
                                            id: 'today',
                                        })}
                                    />
                                </MuiPickersUtilsProvider>
                            </FormControl>
                            <FormControl>
                                <MuiPickersUtilsProvider
                                    utils={DateFnsUtils}
                                    locale={localeMap[language]}
                                >
                                    <label className="font-weight-bold text-uppercase text-primary">
                                        {intl.formatMessage({
                                            id: 'dateTo',
                                        })}{' '}
                                        :
                                    </label>
                                    <KeyboardDatePicker
                                        placeholder={formatDate(maxDate)}
                                        value={selectedMax}
                                        onChange={date =>
                                            handleMaxDateChange(date)
                                        }
                                        format="dd/MM/yyyy"
                                        minDate={selectedMin || minDate}
                                        maxDate={maxDate}
                                        orientation="landscape"
                                        okLabel={intl.formatMessage({
                                            id: 'select',
                                        })}
                                        cancelLabel={intl.formatMessage({
                                            id: 'cancel',
                                        })}
                                        todayLabel={intl.formatMessage({
                                            id: 'today',
                                        })}
                                    />
                                </MuiPickersUtilsProvider>
                            </FormControl>
                        </Fragment>
                    </div>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button
                        size="small"
                        variant="text"
                        startIcon={<ClearAllIcon />}
                        onClick={resetSearchFilter}
                    >
                        <FormattedMessage id="cancel" />
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        startIcon={<SearchIcon />}
                        onClick={handleSearchFilter}
                    >
                        <FormattedMessage id="search" />
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </div>
    )
}

FilterByDate.propTypes = {
    language: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    onHandleFilterSearch: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    minDate: PropTypes.instanceOf(Date).isRequired,
    maxDate: PropTypes.instanceOf(Date).isRequired,
    selectedMinDate: PropTypes.instanceOf(Date),
    selectedMaxDate: PropTypes.instanceOf(Date),
}

FilterByDate.defaultProps = {
    selectedMinDate: null,
    selectedMaxDate: null,
    isOpen: false,
}
export default FilterByDate
