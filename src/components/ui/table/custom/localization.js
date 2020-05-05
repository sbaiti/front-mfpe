import PropTypes from 'prop-types'

const localization = ({ intl }) => ({
    body: {
        emptyDataSourceMessage: intl.formatMessage({ id: 'noResult' }),
        toolTip: intl.formatMessage({ id: 'sort' }),
        editTooltip: intl.formatMessage({ id: 'edit' }),
        editRow: {
            cancelTooltip: intl.formatMessage({ id: 'cancel' }),
            saveTooltip: intl.formatMessage({ id: 'yes' }),
        },
    },
    pagination: {
        labelDisplayedRows: `{from}-{to} ${intl.formatMessage({
            id: 'of',
        })} {count}`,
        firstAriaLabel: intl.formatMessage({
            id: 'firstPage',
        }),
        firstTooltip: intl.formatMessage({
            id: 'firstPage',
        }),
        lastAriaLabel: intl.formatMessage({
            id: 'lastPage',
        }),
        lastTooltip: intl.formatMessage({
            id: 'lastPage',
        }),
        nextAriaLabel: intl.formatMessage({
            id: 'next',
        }),
        nextTooltip: intl.formatMessage({
            id: 'next',
        }),
        previousAriaLabel: intl.formatMessage({
            id: 'previous',
        }),
        previousTooltip: intl.formatMessage({
            id: 'previous',
        }),
        labelRowsPerPage: intl.formatMessage({
            id: 'lignesPerPage',
        }),
        labelRowsSelect: intl.formatMessage({
            id: 'rowsSelect',
        }),
    },
    toolbar: {
        searchTooltip: intl.formatMessage({ id: 'search' }),
        searchPlaceholder: intl.formatMessage({
            id: 'search',
        }),
        downloadCsv: 'Télécharger CSV',
        print: 'Imprimer',
        // viewColumns: 'Afficher les colonnes',
        // filterTable: 'Filtrer',
    },
    header: {
        actions: intl.formatMessage({
            id: 'actions',
        }),
    },
})
localization.propTypes = {
    intl: PropTypes.object.isRequired,
}
export default localization
