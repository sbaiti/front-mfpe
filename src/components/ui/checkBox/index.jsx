/* eslint-disable radix */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

class CheckboxField extends React.Component {
    constructor(props) {
        super(props)
        this.state = { checked: props.value }
    }

    handleChange = e => {
        const { onchange } = this.props
        this.setState({
            checked: e.target.checked,
        })
        const event = { target: { value: e.target.checked ? 1 : 0 } }
        onchange(event)
    }

    render() {
        const { label, isError, errorText, className } = this.props
        const { checked } = this.state
        const errorStyle = {
            fontSize: '0.75rem',
        }

        return (
            <FormControl className={className}>
                <label className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary">
                    {label}
                </label>
                <FormControlLabel
                    className="mx-1"
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={this.handleChange}
                        />
                    }
                    label={label}
                />
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
CheckboxField.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onchange: PropTypes.func.isRequired,
    errorText: PropTypes.string,
    isError: PropTypes.bool,
    value: PropTypes.bool,
    className: PropTypes.string,
}

CheckboxField.defaultProps = {
    label: '',
    isError: false,
    errorText: '',
    value: false,
    className: 'col-12 col-lg-6',
}
export default CheckboxField
