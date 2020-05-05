/* eslint-disable react/no-array-index-key */
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import InputText from '../../components/ui/input'
import SelectList from '../../components/ui/select'
import { getRefParent } from '../../shared/utility'

const RenderForm = ({
    intl,
    isError,
    errorsList,
    handleChange,
    update,
    allReferenciels,

    data,
    language,
}) => {
    const listParents = (
        allReferenciels.referenciels[getRefParent(data.categorie)] || []
    ).map(i => ({
        label: language === 'ar' ? i.intituleAr : i.intituleFr,
        value: i.id,
    }))
    const listCategories = allReferenciels.categories.map(i => ({
        label: i.replace('Ref', ''),
        value: i,
    }))

    const formElments = [
        {
            name: 'intituleAr',
            label: <FormattedMessage id="titleAr" />,
            placeholder: intl.formatMessage({ id: 'titleAr' }),
        },
        {
            name: 'intituleFr',
            label: <FormattedMessage id="titleFr" />,
            placeholder: intl.formatMessage({ id: 'titleFr' }),
        },
        {
            name: 'code',
            label: <FormattedMessage id="code" />,
            placeholder: intl.formatMessage({ id: 'code' }),
        },
        {
            name: 'categorie',
            label: <FormattedMessage id="category" />,
            list: listCategories,
            isSelect: true,
        },
        {
            name: 'parent',
            label: <FormattedMessage id="parentReference" />,
            list: listParents,
            isSelect: true,
        },
    ]
    return formElments
        .filter(el => el)
        .map((el, index) => {
            return el.isSelect ? (
                <SelectList
                    key={`${el.name}${index} `}
                    onchange={e => {
                        handleChange(e, el.name)
                        update(el.name)
                    }}
                    name={el.name}
                    label={el.label}
                    list={el.list}
                    selectedItem={data[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    attributes={el.props}
                />
            ) : (
                <InputText
                    key={`${el.name}${index}`}
                    onchange={e => {
                        handleChange(e, el.name)
                    }}
                    name={el.name}
                    label={el.label}
                    placeholder={el.placeholder}
                    value={data[el.name]}
                    errorText={errorsList[el.name]}
                    isError={
                        isError && Object.keys(errorsList).includes(el.name)
                    }
                    attributes={el.props}
                    type={el.type}
                    required={el.required}
                />
            )
        })
}
RenderForm.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object.isRequired,
    allSpecialities: PropTypes.array,
    language: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorsList: PropTypes.object,
}

RenderForm.defaultProps = {
    errorsList: null,
    isError: false,
    allSpecialities: [],
}
export default injectIntl(RenderForm)
