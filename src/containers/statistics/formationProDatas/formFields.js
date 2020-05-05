/* eslint-disable import/prefer-default-export */
import { getTranslatedAttribute } from '../../../shared/utility'

export const formElements = (
    allReferentiels,
    centersList,
    language,
    intl,
    index
) => {
    const allGovernorates = allReferentiels.referenciels.RefGouvernorat.map(
        i => ({
            label: i[getTranslatedAttribute(language)],
            value: i.id,
        })
    )
    const allDelegations = allReferentiels.referenciels.RefDelegation.map(
        i => ({
            label: i[getTranslatedAttribute(language)],
            value: i.id,
        })
    )
    const allCenters = (centersList || []).map(i => ({
        label: i[getTranslatedAttribute(language)],
        value: i.id,
    }))
    const sectorTypes = [
        { label: intl.formatMessage({ id: 'private' }), value: 1 },
        { label: intl.formatMessage({ id: 'public' }), value: 2 },
    ]
    const agencies = [
        { label: 'ATFP', value: 'ATFP' },
        { label: 'AVFA', value: 'AVFA' },
        { label: 'ONTT', value: 'ONTT' },
        { label: intl.formatMessage({ id: 'others' }), value: 0 },
    ]
    switch (index) {
        case '0':
            return [
                {
                    name: 'governorate',
                    label: intl.formatMessage({ id: 'governorate' }),
                    list: allGovernorates || [],
                    type: 'select',
                    required: false,
                },
                {
                    name: 'delegation',
                    label: intl.formatMessage({ id: 'delegation' }),
                    list: allDelegations || [],
                    type: 'select',
                    required: false,
                },
                {
                    name: 'year',
                    label: intl.formatMessage({ id: 'year' }),
                    props: { format: 'yyyy', views: ['year'] },
                    type: 'date',
                    required: false,
                },
                {
                    name: 'month',
                    label: intl.formatMessage({ id: 'month' }),
                    props: { format: 'MMMM', views: ['month'] },
                    type: 'date',
                    required: false,
                },
                {
                    name: 'center',
                    label: intl.formatMessage({ id: 'center' }),
                    list: allCenters || [],
                    type: 'select',
                    required: false,
                },
                {
                    name: 'sectorType',
                    label: intl.formatMessage({ id: 'sector' }),
                    list: sectorTypes || [],
                    type: 'select',
                    required: false,
                },
                {
                    name: 'agency',
                    label: intl.formatMessage({ id: 'agency' }),
                    list: agencies || [],
                    type: 'select',
                    required: false,
                },
                {
                    type: 'div',
                },
                {
                    name: 'dateFrom',
                    label: intl.formatMessage({ id: 'dateStart' }),
                    type: 'date',
                    required: false,
                },
                {
                    name: 'dateTo',
                    label: intl.formatMessage({ id: 'dateEnd' }),
                    type: 'date',
                    required: false,
                },
            ]
        case '1':
            return [
                {
                    name: 'governorate',
                    label: intl.formatMessage({ id: 'governorate' }),
                    list: allGovernorates || [],
                    type: 'select',
                    required: false,
                },
                {
                    name: 'agency',
                    label: intl.formatMessage({ id: 'agency' }),
                    list: agencies || [],
                    type: 'select',
                    required: false,
                },
                {
                    name: 'year',
                    label: intl.formatMessage({ id: 'year' }),
                    props: { format: 'yyyy', views: ['year'] },
                    type: 'date',
                    required: false,
                },
                {
                    name: 'month',
                    label: intl.formatMessage({ id: 'month' }),
                    props: { format: 'MMMM', views: ['month'] },
                    type: 'date',
                    required: false,
                },
                {
                    type: 'div',
                },
                {
                    name: 'dateFrom',
                    label: intl.formatMessage({ id: 'dateStart' }),
                    type: 'date',
                    required: false,
                },
                {
                    name: 'dateTo',
                    label: intl.formatMessage({ id: 'dateEnd' }),
                    type: 'date',
                    required: false,
                },
            ]
        case '2':
            return [
                {
                    name: 'governorate',
                    label: intl.formatMessage({ id: 'governorate' }),
                    list: allGovernorates || [],
                    type: 'select',
                    required: false,
                },
                {
                    type: 'div',
                },
                {
                    name: 'year',
                    label: intl.formatMessage({ id: 'year' }),
                    props: { format: 'yyyy', views: ['year'] },
                    type: 'date',
                    required: false,
                },

                {
                    name: 'month',
                    label: intl.formatMessage({ id: 'month' }),
                    props: { format: 'MMMM', views: ['month'] },
                    type: 'date',
                    required: false,
                },
            ]
        default:
            return []
    }
}
