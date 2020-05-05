/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import {
    MenuItem,
    Select,
    Input,
    ListItemText,
    Checkbox,
} from '@material-ui/core'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}
class MultiSelectList extends React.Component {
    constructor(props) {
        super(props)
        const { selectedItem } = props
        this.state = {
            selectedValue: selectedItem || [],
        }
    }

    static getDerivedStateFromProps(props) {
        return { selectedValue: props.selectedItem || [] }
    }

    handleChange = event => {
        const { onchange } = this.props
        onchange(event)
        this.setState({ selectedValue: event.target.value })
    }

    render() {
        const {
            label,
            list,
            isError,
            errorText,
            onClose,
            className,
        } = this.props

        const { selectedValue } = this.state
        const style = {
            backgroundColor: 'transparent',
            border: '1px solid #49a0ae',
            borderRadius: 0,
            marginRight: '8px',
            marginLeft: '8px',
            width: 'auto',
            height: '47px',
        }
        const errorStyle = {
            color: '#f44336',
            fontSize: '12px',
            margin: '2px 16px',
            fontFamily: '"Open Sans", sans-serif',
        }

        return (
            <FormControl className={className}>
                <label
                    className="mt-3 mr-2 ml-2 font-weight-bold text-uppercase text-primary"
                    style={{ marginBottom: '-6px' }}
                >
                    {label} <span className="text-danger"> * </span>
                </label>
                <Select
                    style={{
                        ...style,
                        borderColor: isError ? '#f44336' : '#49a0ae',
                    }}
                    multiple
                    value={selectedValue}
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => {
                        const res = list
                            .filter(i => selected.includes(i.value))
                            .map(i => i.label)
                            .join(', ')
                        return res
                    }}
                    MenuProps={MenuProps}
                    onClose={onClose}
                >
                    {list.map(item => (
                        <MenuItem key={item.value} value={item.value}>
                            <Checkbox
                                checked={selectedValue.indexOf(item.value) > -1}
                            />
                            <ListItemText primary={item.label} />
                        </MenuItem>
                    ))}
                </Select>
                {isError && <label style={errorStyle}>{errorText}</label>}
            </FormControl>
        )
    }
}

MultiSelectList.propTypes = {
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    list: PropTypes.array.isRequired,
    selectedItem: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onchange: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    errorText: PropTypes.string,
    className: PropTypes.string,
    isError: PropTypes.bool,
}

MultiSelectList.defaultProps = {
    label: '',
    className: 'col-12 col-lg-6',
    selectedItem: 0,
    errorText: '',
    isError: false,
    onClose: () => {},
}

export default MultiSelectList
