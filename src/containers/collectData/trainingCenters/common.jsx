import { formatDate } from '../../profile/common'

/**
 * getList
 * @param allPrivateCenters
 * @param match
 *
 *
 * @returns {{year: *, gouvernorat: *, initialNumber: *, gouvernorat: *, continusNumber: *, initialContiusNumber: *, changeNumber: *, closedTrainingCenterNumber: *}[]}
 */
const getList = (allPrivateCenters, language) => {
    const intitule = language === 'ar' ? 'intituleAr' : 'intituleFr'

    const list = (allPrivateCenters || []).map(d => {
        return {
            id: d.id,
            year: d.year,
            createdAt: d.createdAt || formatDate(new Date()),
            gouvernorat: (d.governorat || {})[intitule],
            initialNumber: d.initialNumber,
            continusNumber: d.continusNumber,
            initialContiusNumber: d.initialContiusNumber,
            closedTrainingCenterNumber: d.closedTrainingCenterNumber,
        }
    })

    return list
}

/**
 *
 * @param intl
 * @returns {[{field: string, title: *, type: string}, {field: string, title: *}, {field: string, title: *}, {field: string, title: *}]}
 */
const getColumns = intl => {
    const columns = [
        {
            field: 'createdAt',
            title: intl.formatMessage({ id: 'createdAt' }),
            type: 'string',
        },
        {
            field: 'gouvernorat',
            title: intl.formatMessage({ id: 'governorate' }),
        },
        {
            field: 'closedTrainingCenterNumber',
            title: intl.formatMessage({ id: 'closedCenter' }),
        },
        {
            field: 'initialNumber',
            title: intl.formatMessage({ id: 'initialNumber' }),
        },
        {
            field: 'continusNumber',
            title: intl.formatMessage({ id: 'continusNumber' }),
        },
        {
            field: 'initialContiusNumber',
            title: intl.formatMessage({ id: 'initialContinusNumber' }),
        },
        {
            field: 'year',
            title: intl.formatMessage({ id: 'year' }),
        },
    ]

    return columns
}

// eslint-disable-next-line import/prefer-default-export
export { getList, getColumns }
