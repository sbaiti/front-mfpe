export const generalStatisticsColumns = intl => [
    {
        field: 'governorate',
        title: intl.formatMessage({ id: 'governorate' }),
    },
    {
        field: 'population',
        title: intl.formatMessage({ id: 'population' }),
    },
    {
        field: 'activePopulation',
        title: intl.formatMessage({ id: 'activePopulation' }),
    },
    {
        field: 'occupiedActivePopulation',
        title: intl.formatMessage({ id: 'occupiedActivePopulation' }),
    },
    {
        field: 'unemployment',
        title: intl.formatMessage({ id: 'unemployment' }),
    },
    {
        field: 'unemploymentRate',
        title: intl.formatMessage({ id: 'unemploymentRate' }),
    },
    {
        field: 'numberOfCompanies',
        title: intl.formatMessage({ id: 'numberOfCompanies' }),
    },
]
export const educationalHealthColumns = intl => [
    {
        field: 'governorate',
        title: intl.formatMessage({ id: 'governorate' }),
    },
    {
        field: 'NumberOfHealthEstablishments',
        title: intl.formatMessage({ id: 'NumberOfHealthEstablishments' }),
    },
    {
        field: 'NumberOfEducationalEstablishments',
        title: intl.formatMessage({ id: 'NumberOfEducationalEstablishments' }),
    },
    {
        field: 'NumberOfDropouts',
        title: intl.formatMessage({ id: 'NumberOfDropouts' }),
    },
    {
        field: 'NumberOfUniversityEstablishments',
        title: intl.formatMessage({ id: 'NumberOfUniversityEstablishments' }),
    },
    {
        field: 'NumberOfNeedyFamilies',
        title: intl.formatMessage({ id: 'NumberOfNeedyFamilies' }),
    },
    {
        field: 'NumberOfAssociations',
        title: intl.formatMessage({ id: 'NumberOfAssociations' }),
    },
]
export const regionalProjectsColumns = intl => [
    {
        field: 'governorate',
        title: intl.formatMessage({ id: 'governorate' }),
    },
    {
        field: 'NumberOfProjects',
        title: intl.formatMessage({ id: 'NumberOfProjects' }),
    },
    {
        field: 'NumberOfInfrastructureProjects',
        title: intl.formatMessage({ id: 'NumberOfInfrastructureProjects' }),
    },
    {
        field: 'NumberOfDevelopmentProjects',
        title: intl.formatMessage({ id: 'NumberOfDevelopmentProjects' }),
    },
]
