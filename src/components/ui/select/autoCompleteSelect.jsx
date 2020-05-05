/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Downshift from 'downshift'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import { Close, Delete, FilterList } from '@material-ui/icons'

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    )
}

renderInput.propTypes = {
    classes: PropTypes.object.isRequired,
    InputProps: PropTypes.object,
}

function renderSuggestion(suggestionProps) {
    const {
        suggestion,
        index,
        itemProps,
        highlightedIndex,
        selectedItem,
    } = suggestionProps
    const isHighlighted = highlightedIndex === index
    const isSelected = (selectedItem || '').indexOf(suggestion.id) > -1
    return (
        !isSelected && (
            <MenuItem
                {...itemProps}
                key={suggestion.id}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {suggestion.label}
            </MenuItem>
        )
    )
}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.number,
    ]).isRequired,
    index: PropTypes.number.isRequired,
    itemProps: PropTypes.object.isRequired,
    selectedItem: PropTypes.string.isRequired,
    suggestion: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }).isRequired,
}

function getSuggestions(value, suggestions, { showEmpty = true } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0 && !showEmpty
        ? []
        : suggestions.filter(suggestion => {
              const keep =
                  suggestion.label.slice(0, inputLength).toLowerCase() ===
                  inputValue
              return keep
          })
}

function DownshiftMultiple(props) {
    const { classes, suggestions, onListChanged, value, intl } = props

    const [inputValue, setInputValue] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState(value || [])
    const handleKeyDown = event => {
        if (
            selectedItem.length &&
            !inputValue.length &&
            event.key === 'Backspace'
        ) {
            setSelectedItem(selectedItem.slice(0, selectedItem.length - 1))
            onListChanged(selectedItem.slice(0, selectedItem.length - 1))
        }
        if (event.key === 'Escape') setOpen(false)
    }

    const handleInputChange = event => {
        setInputValue(event.target.value)
    }

    const handleChange = item => {
        if (item === null) return
        let newSelectedItem = [...selectedItem]
        if (newSelectedItem.indexOf(item) === -1) {
            newSelectedItem = [...newSelectedItem, item]
        }
        setInputValue('')
        setSelectedItem(newSelectedItem)
        onListChanged(newSelectedItem)
    }

    const handleDelete = item => () => {
        const newSelectedItem = [...selectedItem]
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
        setSelectedItem(newSelectedItem)
        onListChanged(newSelectedItem)
    }
    const displayItem = label => {
        return label ? `${label.slice(0, 3)}...` : ''
    }
    const reset = e => {
        e.preventDefault()
        setSelectedItem([])
        onListChanged([])
    }
    return (
        <Downshift
            id="downshift-multiple"
            inputValue={inputValue}
            onChange={handleChange}
            selectedItem={selectedItem}
        >
            {({
                getInputProps,
                getItemProps,
                getLabelProps,
                isOpen,
                inputValue: inputValue2,
                selectedItem: selectedItem2,
                highlightedIndex,
            }) => {
                const {
                    onBlur,
                    onChange,
                    onFocus,
                    ...inputProps
                } = getInputProps({
                    onKeyDown: handleKeyDown,
                })

                return (
                    <div className={classes.container}>
                        <div className="d-flex">
                            {renderInput({
                                fullWidth: false,
                                classes,
                                InputLabelProps: getLabelProps(),
                                InputProps: {
                                    startAdornment: (
                                        <div className="d-flex flex-nowrap">
                                            <div>
                                                {selectedItem.map(item => {
                                                    const element = suggestions.find(
                                                        e => e.id === item
                                                    )
                                                    return (
                                                        element && (
                                                            <Chip
                                                                size="small"
                                                                title={
                                                                    element.label
                                                                }
                                                                key={item}
                                                                tabIndex={-1}
                                                                label={
                                                                    <span
                                                                        style={{
                                                                            margin:
                                                                                '-2px -3px 0 -5px',
                                                                        }}
                                                                    >
                                                                        {displayItem(
                                                                            element.label
                                                                        )}
                                                                    </span>
                                                                }
                                                                className={`rounded-0 ${classes.chip}`}
                                                                onDelete={handleDelete(
                                                                    item
                                                                )}
                                                                deleteIcon={
                                                                    <Close
                                                                        style={{
                                                                            margin: 0,
                                                                            color:
                                                                                'red',
                                                                        }}
                                                                    />
                                                                }
                                                            />
                                                        )
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ),
                                    onBlur: () => {
                                        setOpen(false)
                                    },
                                    onChange: event => {
                                        handleInputChange(event)
                                        onChange(event)
                                    },
                                    onFocus: () => {
                                        setOpen(true)
                                    },
                                },
                                inputProps,
                            })}
                            {selectedItem && selectedItem.length > 0 && (
                                <a
                                    href=""
                                    className={`position-absolute ${classes.reset}`}
                                    title={intl.formatMessage({
                                        id: 'cancel',
                                    })}
                                    onClick={e => reset(e)}
                                >
                                    <Delete
                                        style={{ height: 16 }}
                                        color="error"
                                    />
                                </a>
                            )}
                        </div>
                        {isOpen || open ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(inputValue2, suggestions).map(
                                    (suggestion, index) =>
                                        renderSuggestion({
                                            suggestion,
                                            index,
                                            itemProps: getItemProps({
                                                item: suggestion.id,
                                            }),
                                            highlightedIndex,
                                            selectedItem: selectedItem2,
                                        })
                                )}
                            </Paper>
                        ) : null}
                    </div>
                )
            }}
        </Downshift>
    )
}

DownshiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired,
    suggestions: PropTypes.array.isRequired,
    onListChanged: PropTypes.func.isRequired,
    value: PropTypes.array,
    intl: PropTypes.object.isRequired,
}
DownshiftMultiple.defaultProps = {
    value: [],
}

const useStyles = makeStyles(theme => ({
    reset: {
        bottom: 0,
        right: theme.direction === 'ltr' ? 12 : 'auto',
        left: theme.direction === 'rtl' ? 12 : 'auto',
    },
    root: {
        flexGrow: 1,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
        top: 30,
        maxHeight: 350,
        overflowY: 'scroll',
        width: 'fit-content',
    },
    chip: {
        margin: theme.spacing(0.25, 0.25),
        height: 'auto',
    },
    inputRoot: {
        flexWrap: 'wrap',
        minWidth: 170, // 160
        overflow: 'auto',
        height: 40, // 32,
    },
    inputInput: {
        width: '50%', // 'auto',
        flexGrow: 1,
    },
}))

export default function ACSelect({ suggestions, onChange, value, intl }) {
    const classes = useStyles()
    return (
        <div
            className={`${classes.root} d-flex flex-nowrap align-items-center`}
        >
            <FilterList />
            <DownshiftMultiple
                classes={classes}
                suggestions={suggestions}
                onListChanged={onChange}
                value={value}
                intl={intl}
            />
        </div>
    )
}
ACSelect.propTypes = {
    suggestions: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    value: PropTypes.array,
}
ACSelect.defaultProps = {
    value: [],
}
