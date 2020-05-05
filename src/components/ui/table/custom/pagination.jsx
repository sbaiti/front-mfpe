import { MTablePagination } from 'material-table'
import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import saveToPDF, { saveToCSV } from './common'
import PDF from '../../../../assets/icons/pdf.svg'
import CSV from '../../../../assets/icons/excel.svg'
import localization from './localization'

const CustomPagination = ({
    properties,
    exportTable,
    intl,
    columns,
    language,
    title,
    filteredData,
}) => {
    const { classes, ...others } = properties
    return (
        <td className="d-flex bd-highlight">
            <div className="p-2 bd-highlight flex-shrink-1 flex-grow-1">
                <MTablePagination
                    localization={localization({ intl }).pagination}
                    {...others}
                />
            </div>
            {exportTable && (
                <div className="p-2 bd-highlight flex-shrink-1 d-flex">
                    <Button
                        variant="text"
                        size="small"
                        color="primary"
                        style={{ minWidth: 34 }}
                        onClick={() =>
                            saveToCSV({
                                filteredData,
                                intl,
                                columns,
                                language,
                                docTitle: title,
                            })
                        }
                    >
                        <img alt="CSV" style={{ width: 32 }} src={CSV} />
                    </Button>
                    <Button
                        variant="text"
                        size="small"
                        color="primary"
                        style={{ minWidth: 34 }}
                        onClick={() =>
                            saveToPDF({
                                filteredData,
                                intl,
                                columns,
                                language,
                                docTitle: title,
                            })
                        }
                    >
                        <img alt="PDF" style={{ width: 32 }} src={PDF} />
                    </Button>
                </div>
            )}
        </td>
    )
}
CustomPagination.propTypes = {
    properties: PropTypes.any.isRequired,
    exportTable: PropTypes.bool.isRequired,
    intl: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    filteredData: PropTypes.array.isRequired,
}

export default CustomPagination
