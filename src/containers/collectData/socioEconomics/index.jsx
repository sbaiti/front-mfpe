/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Paper,
    TableRow,
    TableCell,
    TableBody,
    Table,
    TableHead,
} from '@material-ui/core'
import { formatDate } from '../../profile/common'
import getSocioEcoDataActions from '../../../redux/donneesSocioEconomique/getSocioEcoData'
import MuiTable from '../../../components/ui/table'
import generateKey, { getTranslatedAttribute } from '../../../shared/utility'
import setPageTitleActions from '../../../redux/pageTitle'

/**
 * display SocioEcoData list
 *
 * @class SocioEcoData
 * @extends {React.Component}
 */
class SocioEcoData extends React.Component {
    /**
     * Creates an instance of SocioEcoData.
     * @param {*} props
     * @memberof SocioEcoData
     */
    constructor(props) {
        super(props)
        this.state = { isLoading: false }
        const { getSocioEcoData, setPageTitle } = props

        this.columns = this.getColumns()
        setPageTitle('donnéesSocioéconomiques')
        getSocioEcoData()
    }

    getList = data => {
        const { language } = this.props
        const list = (data || []).map(d => {
            return {
                associationNumber: d.associationNumber,
                createdAt: d.createdAt || formatDate(new Date()),
                associationYear: d.associationYear,
                currentProject: d.currentProject,
                description: d.description,
                directionRegional:
                    d.directionRegional[
                        getTranslatedAttribute(language, 'titre')
                    ],
                dropoutSchoolNumber: d.dropoutSchoolNumber,
                dropoutSchoolYear: d.dropoutSchoolYear,
                healthInstitutionNumber: d.healthInstitutionNumber,
                healthInstitutionYear: d.healthInstitutionYear,
                id: d.id,
                institutionUniversityYear: d.institutionUniversityYear,
                needyFamilyNumber: d.needyFamilyNumber,
                needyFamilyYear: d.needyFamilyYear,
                schoolInstitutionNumber: d.schoolInstitutionNumber,
                schoolInstitutionYear: d.schoolInstitutionYear,
                universityInstitutionNumber: d.universityInstitutionNumber,
            }
        })

        return list
    }

    getColumns() {
        const { intl } = this.props

        return [
            {
                field: 'createdAt',
                title: intl.formatMessage({ id: 'createdAt' }),
                type: 'string',
            },
            {
                field: 'directionRegional',
                title: intl.formatMessage({ id: 'directionRegionale' }),
                type: 'string',
            },
            {
                field: 'description',
                title: intl.formatMessage({ id: 'description' }),
                type: 'string',
            },
            {
                field: 'currentProject',
                title: intl.formatMessage({ id: 'current_project' }),
                type: 'string',
            },
        ]
    }

    onAdd = () => {
        const { history } = this.props

        history.push({
            pathname: `/formulaires/gestion-des-données/socioéconomiques/ajouter`,
        })
    }

    getDetails = data => {
        return (
            <Paper className="m-3 p-3">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>
                                <FormattedMessage id="value" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="year" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <FormattedMessage id="healthInstitutionNumber" />
                            </TableCell>
                            <TableCell>
                                {data.healthInstitutionNumber}
                            </TableCell>
                            <TableCell>{data.healthInstitutionYear}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormattedMessage id="school_institution_number" />
                            </TableCell>
                            <TableCell>
                                {data.schoolInstitutionNumber}
                            </TableCell>
                            <TableCell>{data.schoolInstitutionYear}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormattedMessage id="university_institution_number" />
                            </TableCell>
                            <TableCell>
                                {data.universityInstitutionNumber}
                            </TableCell>
                            <TableCell>
                                {data.institutionUniversityYear}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormattedMessage id="dropout_school_number" />
                            </TableCell>
                            <TableCell> {data.dropoutSchoolNumber}</TableCell>
                            <TableCell>{data.dropoutSchoolYear}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormattedMessage id="needy_family_number" />
                            </TableCell>
                            <TableCell>{data.needyFamilyNumber}</TableCell>
                            <TableCell>{data.needyFamilyYear}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormattedMessage id="association_number" />
                            </TableCell>
                            <TableCell>{data.associationNumber}</TableCell>
                            <TableCell>{data.associationYear}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    render() {
        const { socioEcoData, intl, language, loading } = this.props

        const { isLoading } = this.state
        const list = this.getList(socioEcoData)

        return (
            <MuiTable
                key={generateKey()}
                title={intl.formatMessage({ id: 'donnéesSocioéconomiques' })}
                intl={intl}
                columns={this.columns}
                list={list}
                language={language}
                details={this.getDetails}
                add={this.onAdd}
                hideActions
                isLoading={loading || isLoading}
            />
        )
    }
}

SocioEcoData.propTypes = {
    getSocioEcoData: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    socioEcoData: PropTypes.array,
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    loading: PropTypes.bool,
}

SocioEcoData.defaultProps = {
    socioEcoData: [],
    loading: false,
}

const mapStateToProps = ({ SocioData, info }) => {
    const { getSocioEcoData } = SocioData
    return {
        language: info.language,
        socioEcoData: getSocioEcoData.response,
        error: getSocioEcoData.error,
        loading: getSocioEcoData.loading,
    }
}
const mapDispatchToProps = dispatch => ({
    getSocioEcoData: () =>
        dispatch(getSocioEcoDataActions.getSocioEcoDataRequest()),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(SocioEcoData))
