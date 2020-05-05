export const proFormationColumns = intl => [
    [
        {
            field: 'ASlashR',
            title: intl.formatMessage({ id: 'AslashR' }),
            rowSpan: 3,
        },
        {
            field: 'center',
            title: intl.formatMessage({ id: 'center' }),
            rowSpan: 3,
        },
        {
            field: 'sector',
            title: intl.formatMessage({ id: 'sector' }),
            rowSpan: 3,
        },
        {
            field: 'subSector',
            title: intl.formatMessage({ id: 'subSector' }),
            rowSpan: 3,
        },
        {
            field: 'speciality',
            title: intl.formatMessage({ id: 'speciality' }),
            rowSpan: 3,
        },
        {
            field: 'certificateLevel',
            title: intl.formatMessage({ id: 'certificateLevel' }),
            rowSpan: 3,
        },
        {
            field: 'legalized',
            title: intl.formatMessage({ id: 'legalized' }),
            rowSpan: 3,
        },
        {
            field: 'numberOfFormed',
            title: intl.formatMessage({ id: 'numberOfFormed' }),
            colSpan: 6,
        },
        {
            field: 'numberOfCertified',
            title: intl.formatMessage({ id: 'numberOfCertified' }),
            colSpan: 3,
            rowSpan: 2,
        },
    ],
    [
        {
            field: 'formedFirstYear',
            title: intl.formatMessage({ id: 'formedFirstYear' }),
            colSpan: 3,
        },
        {
            field: 'FormedSecondYear',
            title: intl.formatMessage({ id: 'FormedSecondYear' }),
            colSpan: 3,
        },
    ],
    [
        {
            field: 'totalFormedFirstYear',
            title: intl.formatMessage({ id: 'total' }),
        },
        {
            field: 'femaleFormedFirstYear',
            title: intl.formatMessage({ id: 'females' }),
        },
        {
            field: 'foreignersFormedFirstYear',
            title: intl.formatMessage({ id: 'foreigners' }),
        },
        {
            field: 'totalFormedSecondYear',
            title: intl.formatMessage({ id: 'total' }),
        },
        {
            field: 'femaleFormedSecondYear',
            title: intl.formatMessage({ id: 'females' }),
        },
        {
            field: 'foreignersFormedSecondYear',
            title: intl.formatMessage({ id: 'foreigners' }),
        },
        {
            field: 'totalCertified',
            title: intl.formatMessage({ id: 'total' }),
        },
        {
            field: 'femaleCertified',
            title: intl.formatMessage({ id: 'females' }),
        },
        {
            field: 'foreignersCertified',
            title: intl.formatMessage({ id: 'foreigners' }),
        },
    ],
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
