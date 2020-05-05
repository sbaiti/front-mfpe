/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

const TextArea = props => {
    const {
        value,
        label,
        placeholder,
        onchange,
        isError,
        errorText,
        required,
        className,
    } = props
    const errorStyle = {
        fontSize: '0.75rem',
    }
    return (
        <FormControl className={className}>
            <label className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary">
                {label}
                {required && <span className="text-danger"> * </span>}
            </label>
            <TextareaAutosize
                rows="3"
                aria-label="empty textarea"
                className={`${
                    isError ? 'border-danger' : 'border-secondary'
                } p-3 ml-2 mr-2 mt-1`}
                placeholder={placeholder}
                value={value}
                onChange={e => onchange(e)}
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

TextArea.defaultProps = {
    value: '',
    label: '',
    placeholder: '',
    isError: false,
    required: true,
    errorText: '',
    onchange: () => {},
    className: 'col-12 col-lg-6',
}

TextArea.propTypes = {
    value: PropTypes.string,
    isError: PropTypes.bool,
    required: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    placeholder: PropTypes.string,
    onchange: PropTypes.func,
    errorText: PropTypes.string,
    className: PropTypes.string,
}
export default TextArea
