/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropType from 'prop-types'
import Grid from '@material-ui/core/Grid'
import SelectList from '../select'
import RadioField from '../radio'
import DateField from '../datePicker'
import InputTel from '../tel'
import InputText from '../input'
import formatPhoneNumber from '../../../shared/formatPhoneNumber'
import MultiSelectList from '../select/multiSelect'

const Form = ({
    formElements,
    errorsList,
    payload,
    fieldChangedHandler,
    language,
    gridProps,
    elementsClassName,
}) => {
    return (
        <Grid container {...gridProps}>
            {formElements
                .filter(el => el)
                .map((el, index) => {
                    switch (el.type) {
                        case 'select':
                            return (
                                <SelectList
                                    key={`${el.name}${index}`}
                                    onchange={e => {
                                        fieldChangedHandler(e, el.name)
                                    }}
                                    name={el.name}
                                    label={el.label}
                                    list={el.list}
                                    selectedItem={payload[el.name]}
                                    errorText={errorsList[el.name]}
                                    isError={Object.keys(errorsList).includes(
                                        el.name
                                    )}
                                    className={elementsClassName}
                                    required={el.required}
                                />
                            )
                        case 'date':
                            return (
                                <DateField
                                    key={`${el.name}${index}`}
                                    onchange={e =>
                                        fieldChangedHandler(e, el.name)
                                    }
                                    name={el.name}
                                    label={el.label}
                                    placeholder={el.placeholder}
                                    isArabic={language === 'ar'}
                                    defaultValue={new Date(payload[el.name])}
                                    errorText={errorsList[el.name]}
                                    isError={Object.keys(errorsList).includes(
                                        el.name
                                    )}
                                    attributes={el.props}
                                    className={elementsClassName}
                                    required={el.required}
                                />
                            )
                        case 'tel':
                            return (
                                <InputTel
                                    key={`${el.name}${index}`}
                                    onchange={value => {
                                        fieldChangedHandler(
                                            { target: { value } },
                                            el.name
                                        )
                                    }}
                                    name={el.name}
                                    label={el.label}
                                    placeholder={el.placeholder}
                                    value={formatPhoneNumber(payload[el.name])}
                                    errorText={errorsList[el.name]}
                                    isError={Object.keys(errorsList).includes(
                                        el.name
                                    )}
                                    className={elementsClassName}
                                    required={el.required}
                                />
                            )
                        case 'multiSelect':
                            return (
                                <MultiSelectList
                                    key={`${el.name}${index}`}
                                    onchange={e =>
                                        fieldChangedHandler(e, el.name)
                                    }
                                    name={el.name}
                                    label={el.label}
                                    list={el.list}
                                    selectedItem={payload[el.name]}
                                    errorText={errorsList[el.name]}
                                    isError={Object.keys(errorsList).includes(
                                        el.name
                                    )}
                                    className={elementsClassName}
                                />
                            )
                        case 'radio':
                            return (
                                <RadioField
                                    key={`${el.name}${index}`}
                                    onchange={e => {
                                        fieldChangedHandler(e, el.name)
                                    }}
                                    name={el.name}
                                    label={el.label}
                                    list={el.list}
                                    chosenItem={payload[el.name]}
                                    errorText={errorsList[el.name]}
                                    isError={Object.keys(errorsList).includes(
                                        el.name
                                    )}
                                    className={elementsClassName}
                                />
                            )
                        case 'div':
                            return <div className="d-block w-100"></div>

                        default:
                            return (
                                <InputText
                                    key={`${el.name}${index}`}
                                    onchange={e =>
                                        fieldChangedHandler(e, el.name)
                                    }
                                    name={el.name}
                                    label={el.label}
                                    placeholder={el.placeholder}
                                    type={el.type}
                                    value={payload[el.name]}
                                    errorText={errorsList[el.name]}
                                    isError={Object.keys(errorsList).includes(
                                        el.name
                                    )}
                                    required={el.required}
                                    disabled={el.disabled}
                                    className={elementsClassName}
                                />
                            )
                    }
                })}
        </Grid>
    )
}

Form.defaultProps = {
    gridProps: {
        direction: 'row',
        justify: 'space-between',
        alignItems: 'flex-start',
    },
    elementsClassName: 'col-12 col-lg-6',
}
Form.propTypes = {
    formElements: PropType.array,
    errorsList: PropType.object.isRequired,
    payload: PropType.object.isRequired,
    fieldChangedHandler: PropType.func.isRequired,
    language: PropType.string.isRequired,
    gridProps: PropType.shape({
        direction: PropType.string,
        justify: PropType.string,
        alignItems: PropType.string,
    }),
    elementsClassName: PropType.string,
}
Form.defaultProps = {
    formElements: [],
}
export default Form
