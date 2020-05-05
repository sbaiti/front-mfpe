import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import DateExam from './DateExam'
import PaymentOk from './PaymentOk'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(3),
        width: '100%',
    },
}))

export default function DateExamSwitcher(props) {
    const { onGetFile, factoryProps, showButtons, isRefused } = props
    const classes = useStyles()
    const [value, setValue] = React.useState('')
    const [exam, setExam] = React.useState(isRefused || '')
    // eslint-disable-next-line no-unused-vars
    const nextStatus = 'RE_DATE_EXAM_OK'

    function handleChange(event) {
        setValue(event.target.value)
    }

    function handleDateExam() {
        setExam(value)
        showButtons(value)
    }

    const handleUpload = file => {
        onGetFile(file)
    }
    const interf = factoryProps.show === true ? exam : ''
    switch (interf) {
        case '0':
            return <PaymentOk {...factoryProps} nextStatus />

        case '1':
            return <DateExam onGetFileUpload={handleUpload} {...props} />

        default:
            return (
                <FormControl
                    component="fieldset"
                    className={classes.formControl}
                >
                    <FormLabel component="legend">
                        <FormattedMessage id="question1" />
                    </FormLabel>
                    <RadioGroup
                        aria-label="examOk"
                        name="examOk"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label={factoryProps.intl.formatMessage({
                                id: 'question1Yes',
                            })}
                        />
                        <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label={factoryProps.intl.formatMessage({
                                id: 'question1No',
                            })}
                        />
                    </RadioGroup>
                    <Button
                        variant="contained"
                        size="medium"
                        color="secondary"
                        aria-label="add"
                        className="mx-auto rounded-0"
                        onClick={handleDateExam}
                        disabled={value === ''}
                    >
                        <ArrowForwardIosIcon />
                        <FormattedMessage id="next" />
                    </Button>
                </FormControl>
            )
    }
}
DateExamSwitcher.propTypes = {
    factoryProps: PropTypes.object.isRequired,
    onGetFile: PropTypes.func.isRequired,
    showButtons: PropTypes.func.isRequired,
    isRefused: PropTypes.string,
}
DateExamSwitcher.defaultProps = {
    isRefused: '',
}
