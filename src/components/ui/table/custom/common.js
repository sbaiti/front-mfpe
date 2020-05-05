import Html2Pdf from 'js-html2pdf'
import { addDays } from 'date-fns'
import { getDate } from '../../../../shared/utility'

const saveToPDF = ({ filteredData, intl, columns, language, docTitle }) => {
    const cols = columns
        .filter(c => c.filter !== false)
        .map(c => {
            const { title } = c
            return `<th style="padding:2px">${title}</th>`
        })

    const rows = filteredData.map((d, i) => {
        return `<tr ${i % 2 !== 0 && 'style="background:#eee;"'}>${columns
            .filter(c => c.filter !== false)
            .map(c => {
                let value = d[c.field]
                if (c.lookup && Object.keys(c.lookup).length)
                    value = c.lookup[d[c.field]]
                return `<td style="text-align: center;padding:2px; ${
                    value && value.length <= 10
                        ? 'white-space:nowrap;'
                        : 'word-break: break-word;'
                }">${value || '-'}</td>`
            })
            .join('')}</tr>`
    })
    const head = `<thead style="background:#eee;text-align: center;"><tr>${cols.join(
        ''
    )}</tr></thead>`
    const body = `<tbody>${rows.join('')}</tbody>`
    const title = `<h4 style="text-align:${
        language === 'ar' ? 'right' : 'left'
    };">${docTitle || intl.formatMessage({ id: 'applicationsList' })}</h4>`
    const element = `${title}<table style="font-size:8px; width:100%" border="1">${head}${body}</table>`

    const options = {
        margin: 5,
        filename: 'myfile.pdf',
        pagebreak: {
            mode: 'css',
        },
        image: { type: 'jpeg', quality: 1 },
        jsPDF: { orientation: 'landscape' },
    }
    options.source = element
    options.download = true
    Html2Pdf.getPdf(options)
}

export const saveToCSV = ({
    filteredData,
    intl,
    columns,
    language,
    docTitle,
}) => {
    let cols = columns
        .filter(c => c.filter !== false)
        .map(c => {
            const { title } = c
            return `<th style="padding:2px">${title}</th>`
        })

    const rows = filteredData.map((d, i) => {
        let cls = columns
            .filter(c => c.filter !== false)
            .map(c => {
                let value = d[c.field]
                if (c.lookup && Object.keys(c.lookup).length)
                    value = c.lookup[d[c.field]]
                return `<td style="text-align: center;padding:2px; ">${value ||
                    '-'}</td>`
            })
        if (language === 'ar') cls = cls.reverse()
        return `<tr ${i % 2 !== 0 && 'style="background:#eee;"'}>${cls.join(
            ''
        )}</tr>`
    })
    if (language === 'ar') {
        cols = [...cols].reverse()
    }
    const head = `<thead style="background:#eee;text-align: center;"><tr>${cols.join(
        ''
    )}</tr></thead>`
    const body = `<tbody>${rows.join('')}</tbody>`
    const title = `<h4 style="text-align:${
        language === 'ar' ? 'right' : 'left'
    };">${docTitle || intl.formatMessage({ id: 'applicationsList' })}</h4>`
    const element = `${title}<table border="1">${head}${body}</table>`

    // eslint-disable-next-line no-use-before-define
    tableToExcel(element, title)
}

/* eslint-disable */
var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template =
            '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
        base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p]
            })
        }
    return function(html, name) {
        var ctx = { worksheet: name || 'Worksheet', table: html }
        window.location.href = uri + base64(format(template, ctx))
    }
})()
/* eslint-enable */

/**
 * filter table
 *
 * @memberof MuiTable
 * @param list
 * @param columns
 * @param query
 * @param filterValues
 * @returns array of objects
 */
export const filterTable = (list, columns, query, filterValues) => {
    let newFilterData = [...list]
    Object.keys(filterValues).forEach(key => {
        newFilterData = newFilterData.filter(m => {
            if (typeof filterValues[key] === 'string') {
                return (
                    filterValues[key] === '' ||
                    (m[key] || '')
                        .toString()
                        .toLowerCase()
                        .includes((filterValues[key] || '').toLowerCase())
                )
            }
            if (key === 'dateDepotPeriod') {
                return (
                    getDate(m.createdAt) >= filterValues[key].min &&
                    getDate(m.createdAt) < addDays(filterValues[key].max, 1)
                )
            }
            return (
                !filterValues[key] ||
                filterValues[key].length === 0 ||
                filterValues[key].includes((m[key] || '').toString())
            )
        })
    })
    if (query) {
        const filtrableColumns = columns.reduce((acc, c) => {
            acc[acc.field] = acc.lookup
            acc[c.field] = c.lookup
            return acc
        })
        newFilterData = newFilterData.filter(d => {
            let found = false
            Object.keys(filtrableColumns).forEach(c => {
                if (!d[c]) return
                const regx = new RegExp(query.toLowerCase())
                let searchableString = ''
                if (typeof d[c] === 'number' && filtrableColumns[c]) {
                    searchableString = filtrableColumns[c][d[c]]
                } else {
                    searchableString = d[c]
                }
                if (!searchableString || typeof searchableString !== 'string')
                    return

                const test = regx.test(searchableString.toLowerCase())
                if (test) {
                    found = true
                }
            })
            return found
        })
    }
    return newFilterData
}

export default saveToPDF
