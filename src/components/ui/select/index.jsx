/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import { MenuItem } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

class SelectList extends React.Component {
    state = {
        selectedValue: '',
    }

    static getDerivedStateFromProps(props) {
        return { selectedValue: props.selectedItem }
    }

    handleChange = event => {
        const { onchange } = this.props
        onchange(event)
        this.setState({ selectedValue: event.target.value })
    }

    render() {
        const {
            label,
            placeholder,
            list,
            selectedItem,
            selectAll,
            isError,
            errorText,
            attributes,
            className,
            required,
        } = this.props

        const { selectedValue } = this.state
        return (
            <FormControl className={className}>
                <label className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary">
                    {label}
                    {required && <span className="text-danger"> * </span>}
                </label>
                <TextField
                    className="mt-1"
                    error={isError}
                    id="outlined-select-currency"
                    select
                    style={{ marginLeft: 8, marginRight: 8 }}
                    label={placeholder}
                    value={selectedValue || selectedItem || ''}
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    variant="outlined"
                    helperText={isError && <span>{errorText}</span>}
                    {...attributes}
                >
                    {selectAll ? (
                        <MenuItem key={0} value={0}>
                            <FormattedMessage id="all" />
                        </MenuItem>
                    ) : (
                        <MenuItem key="" value="">
                            <FormattedMessage id="select" />
                        </MenuItem>
                    )}
                    {(list || []).map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
        )
    }
}

SelectList.propTypes = {
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    placeholder: PropTypes.string,
    list: PropTypes.array.isRequired,
    selectedItem: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    selectAll: PropTypes.bool,
    onchange: PropTypes.func.isRequired,
    errorText: PropTypes.string,
    className: PropTypes.string,
    isError: PropTypes.bool,
    attributes: PropTypes.object,
    required: PropTypes.bool,
}
SelectList.defaultProps = {
    label: '',
    placeholder: '',
    className: 'col-12 col-lg-6',
    selectedItem: 0,
    selectAll: false,
    errorText: '',
    isError: false,
    attributes: {},
    required: true,
}

export default SelectList
