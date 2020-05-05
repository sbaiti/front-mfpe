import React, { useEffect, useState } from 'react'
import PropType from 'prop-types'
import Form from '../../../components/ui/form'
import { isEmpty } from '../../../shared/utility'

const Informations = props => {
    const { language, intl, onPayloadChange } = props
    // eslint-disable-next-line no-unused-vars
    const [errorsList, setErrorsList] = useState(null)
    const [payload, setPayload] = useState({
        role: '',
        intituleFr: '',
        intituleAr: '',
    })

    const formElements = [
        {
            name: 'role',
            label: intl.formatMessage({ id: 'identifiant' }),
            placeholder: intl.formatMessage({ id: 'identifiant' }),
        },
        {
            name: 'intituleFr',
            label: intl.formatMessage({ id: 'titleFr' }),
            placeholder: intl.formatMessage({ id: 'titleFr' }),
        },
        {
            name: 'intituleAr',
            label: intl.formatMessage({ id: 'titleAr' }),
            placeholder: intl.formatMessage({ id: 'titleAr' }),
        },
    ]

    const fieldChangedHandler = (e, name) => {
        setPayload({ ...payload, [name]: e.target.value })
    }

    const gridProps = {
        direction: 'column',
        justify: 'center',
        alignItems: 'flex-start',
    }

    const formatTitleName = name => {
        return name
            .trim()
            .toUpperCase()
            .split(' ')
            .join('_')
    }

    const setTitleName = () => {
        // eslint-disable-next-line camelcase
        const { intituleFr } = payload
        try {
            setPayload({ ...payload, role: formatTitleName(intituleFr) })
        } catch (e) {
            console.error(e)
        }
    }

    const verifPayload = () => {
        if (
            isEmpty(payload.role.trim()) ||
            isEmpty(payload.intituleFr.trim()) ||
            isEmpty(payload.intituleAr.trim())
        ) {
            return false
        }
        return true
    }

    useEffect(() => {
        setTitleName()
    }, [payload.intituleFr])

    useEffect(() => {
        if (verifPayload) {
            onPayloadChange(payload)
        }
    }, [payload])

    return (
        <Form
            formElements={formElements}
            errorsList={errorsList || {}}
            fieldChangedHandler={fieldChangedHandler}
            language={language}
            payload={payload}
            gridProps={gridProps}
            elementsClassName="col-12"
        />
    )
}

Informations.propTypes = {
    intl: PropType.object.isRequired,
    language: PropType.string.isRequired,
    onPayloadChange: PropType.func.isRequired,
}

export default Informations
