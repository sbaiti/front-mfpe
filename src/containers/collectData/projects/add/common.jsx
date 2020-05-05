/* eslint-disable react/no-array-index-key */
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import InputText from '../../../../components/ui/input'
import SelectList from '../../../../components/ui/select'

const Common = ({
    intl,
    isError,
    errorsList,
    handleChange,
    data,
    allReferenciels,
    language,
}) => {
    const intitule = `intitule${language[0].toUpperCase()}r`

    const listSecteur = allReferenciels.referenciels.RefSecteur.map(i => ({
        label: i[intitule],
        value: i.id,
    }))
    let listGov = []
    let listDelegation = []

    try {
        listGov = allReferenciels.referenciels.RefGouvernorat.map(i => ({
            label: i[intitule],
            value: i.id,
        }))
        listDelegation = allReferenciels.referenciels.RefDelegation.filter(
            e => e.parent && e.parent.id === data.governorat
        ).map(i => ({
            label: i[intitule],
            value: i.id,
        }))
    } catch (error) {
        console.log(error)
    }

    const formElments1 = [
        {
            name: 'governorat',
            label: <FormattedMessage id="governorate" />,
            placeholder: intl.formatMessage({ id: 'governorate' }),
            isSelect: true,
            list: listGov,
        },
        {
            name: 'delegation',
            label: <FormattedMessage id="delegation" />,
            placeholder: intl.formatMessage({ id: 'delegation' }),
            isSelect: true,
            list: listDelegation,
        },
        {
            name: 'title_project',
            label: <FormattedMessage id="intituleProjet" />,
            placeholder: intl.formatMessage({ id: 'intituleProjet' }),
        },
        {
            name: 'type_project',
            label: <FormattedMessage id="projectType" />,
            placeholder: intl.formatMessage({ id: 'projectType' }),
        },
        {
            name: 'sector',
            label: <FormattedMessage id="sector" />,
            placeholder: intl.formatMessage({ id: 'sector' }),
            isSelect: true,
            list: listSecteur,
        },
    ]

    return formElments1
        .filter(el => el !== false)
        .map((el, index) => {
            return el.isSelect ? (
                <SelectList
                    key={`${el.name}${index}`}
                    onchange={e => {
                        handleChange(e, el.name)
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
Common.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorsList: PropTypes.object,
}

Common.defaultProps = {
    errorsList: null,
    isError: false,
}
export default injectIntl(Common)
