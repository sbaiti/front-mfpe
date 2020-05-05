/* eslint-disable radix */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Grid } from '@material-ui/core'

class RadioField extends React.Component {
    state = {
        selectedValue: '',
    }

    handleChange = event => {
        const { onchange, list } = this.props

        const chosen = list.find(
            i =>
                parseInt(i.value) === parseInt(event.target.value) ||
                i.value === event.target.value
        )
        onchange(event)
        this.setState({ selectedValue: chosen.value })
    }

    render() {
        const {
            label,
            list,
            chosenItem,
            isError,
            errorText,
            className,
        } = this.props
        const { selectedValue } = this.state
        const errorStyle = {
            fontSize: '0.75rem',
        }
        return (
            <FormControl component="fieldset" className={className}>
                <label className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary">
                    {label} <span className="text-danger"> * </span>
                </label>
                <RadioGroup
                    aria-label="position"
                    name="position"
                    value={selectedValue.toString() || chosenItem.toString()}
                    onChange={e => this.handleChange(e)}
                    row
                    className={`mt-1 pl-3 pr-3 ${isError && 'text-danger'}`}
                >
                    <Grid item xs={6} sm={6}>
                        <FormControlLabel
                            value={list[0].value.toString()}
                            control={<Radio color="primary" />}
                            label={list[0].label}
                            labelPlacement="end"
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <FormControlLabel
                            value={list[1].value.toString()}
                            control={<Radio color="primary" />}
                            label={list[1].label}
                            labelPlacement="end"
                        />
                    </Grid>
                </RadioGroup>
                {isError && (
                    <label
                        className="text-danger font-weight-normal ml-3 mr-3"
                        style={errorStyle}
                    >
                        {errorText}
                    </label>
                )}
            </FormControl>
        )
    }
}

RadioField.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    errorText: PropTypes.string,
    chosenItem: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    list: PropTypes.array.isRequired,
    onchange: PropTypes.func.isRequired,
    className: PropTypes.string,
    isError: PropTypes.bool,
}

RadioField.defaultProps = {
    label: '',
    chosenItem: '',
    isError: false,
    className: 'col-12 col-lg-6',
    errorText: '',
}

export default RadioField
