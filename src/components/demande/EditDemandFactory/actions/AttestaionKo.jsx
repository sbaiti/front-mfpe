import React from 'react'
import PropType from 'prop-types'

const AttestationKo = props => {
    const { language, motif, intl } = props
    return (
        <div className="text-center">
            <p className="text-primary h3 p-5">
                {language === 'fr'
                    ? 'Votre Attestation a été refusé'
                    : 'لقد تم رفض شهادتكم'}
            </p>
            <b>{intl.formatMessage({ id: 'motive' })} :</b>{' '}
            {language === 'fr' ? motif.intituleFr : motif.intituleAr}
        </div>
    )
}

export default AttestationKo

AttestationKo.propTypes = {
    language: PropType.string.isRequired,
    motif: PropType.object.isRequired,
    intl: PropType.object.isRequired,
}
