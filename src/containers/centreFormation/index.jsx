/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper, TableRow, TableCell, TableBody, Table } from '@material-ui/core'
import getAllCentersActions from '../../redux/centreFormation/getAllCenters'
import MuiTable from '../../components/ui/table'
import generateKey, { getTranslatedAttribute } from '../../shared/utility'
import setPageTitleActions from '../../redux/pageTitle'

/**
 * display ListCentre list
 *
 * @class ListCentre
 * @extends {React.Component}
 */
class ListCentre extends React.Component {
    /**
     * Creates an instance of ListCentre.
     * @param {*} props
     * @memberof ListCentre
     */
    constructor(props) {
        super(props)
        const { getAllCenters, setPageTitle } = props
        this.columns = this.getColumns()
        getAllCenters()
        setPageTitle('privateCentersList')
    }

    getList = () => {
        const { allcenters, language } = this.props
        const intitule = language === 'ar' ? 'intituleAr' : 'intituleFr'
        const list = (allcenters || []).map(d => {
            return {
                id: d.id,
                nom: language === 'fr' ? d.intituleFr : d.intituleAr,
                sector: d.secteur[getTranslatedAttribute(language)],
                adresse: d.adresse,
                tel: d.tel,
                fax: d.fax,
                email: d.email,
                nomDirecteur:
                    language === 'fr' ? d.nomDirecteurFr : d.nomDirecteurAr,
                anneeCreation: d.anneeCreation,
                capaciteAccueil: d.capaciteAccueil,
                numeroEnregistrement: d.numeroEnregistrement,
                nombreFormateur: d.nombreFormateur,
                nombreCadreAdministratif: d.nombreCadreAdministratif,
                capaciteHebergement: d.capaciteHebergement,
                capaciteRestaurant: d.capaciteRestaurant,
                organisme: d.organisme,
                gouvernorat: (d.gouvernorat || {})[intitule],
                delegation: (d.delegation || {})[intitule],
                nomSpecialite: d.specialiteCenters
                    .map(e => (language === 'ar' ? e.intituleAr : e.intituleFr))
                    .join(', '),
            }
        })
        return list
    }

    getColumns() {
        const { intl } = this.props
        return [
            {
                field: 'nom',
                title: intl.formatMessage({ id: 'centername' }),
                type: 'string',
            },
            {
                field: 'anneeCreation',
                title: intl.formatMessage({ id: 'anneeCreation' }),
            },
            {
                field: 'sector',
                title: intl.formatMessage({ id: 'sector' }),
                type: 'string',
            },
            {
                field: 'nomDirecteur',
                title: intl.formatMessage({ id: 'nomDirecteur' }),
                type: 'string',
            },

            {
                field: 'tel',
                title: intl.formatMessage({ id: 'tel' }),
                type: 'string',
            },
            {
                field: 'fax',
                title: intl.formatMessage({ id: 'fax' }),
                type: 'string',
            },
            {
                field: 'email',
                title: intl.formatMessage({ id: 'email' }),
                type: 'string',
            },
            {
                field: 'adresse',
                title: intl.formatMessage({ id: 'address' }),
                type: 'string',
            },
        ]
    }

    getDetails = data => {
        return (
            <Paper className="m-3 p-3">
                <Table>
                    <TableBody>
                        {data.gouvernorat && (
                            <TableRow key={generateKey()}>
                                <TableCell className="font-weight-bold">
                                    <FormattedMessage id="governorate" />
                                </TableCell>
                                <TableCell>{data.gouvernorat}</TableCell>
                            </TableRow>
                        )}
                        {data.delegation && (
                            <TableRow key={generateKey()}>
                                <TableCell className="font-weight-bold">
                                    <FormattedMessage id="delegation" />
                                </TableCell>
                                <TableCell>{data.delegation}</TableCell>
                            </TableRow>
                        )}
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="capaciteAccueil" />
                            </TableCell>
                            <TableCell>{data.capaciteAccueil}</TableCell>
                        </TableRow>
                        {data.numeroEnregistrement && (
                            <TableRow key={generateKey()}>
                                <TableCell className="font-weight-bold">
                                    <FormattedMessage id="numeroEnregistrement" />
                                </TableCell>
                                <TableCell>
                                    {data.numeroEnregistrement}
                                </TableCell>
                            </TableRow>
                        )}
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="nombreFormateur" />
                            </TableCell>
                            <TableCell>{data.nombreFormateur}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="nombreCadreAdministratif" />
                            </TableCell>
                            <TableCell>
                                {data.nombreCadreAdministratif}
                            </TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="capaciteHebergement" />
                            </TableCell>
                            <TableCell>{data.capaciteHebergement}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="capaciteRestaurant" />
                            </TableCell>
                            <TableCell>{data.capaciteRestaurant}</TableCell>
                        </TableRow>
                        {data.organisme && (
                            <TableRow key={generateKey()}>
                                <TableCell className="font-weight-bold">
                                    <FormattedMessage id="organisme" />
                                </TableCell>
                                <TableCell>{data.organisme}</TableCell>
                            </TableRow>
                        )}
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="speciality" />
                            </TableCell>
                            <TableCell>{data.nomSpecialite}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    onAdd = () => {
        const { history } = this.props
        history.push({
            pathname: `/centre-de-formation/ajouter/`,
        })
    }

    onEdit = id => {
        const { history, allcenters } = this.props
        const center = allcenters.find(d => d.id === id)
        history.push({
            pathname: `/centre-de-formation/modifier/${id}`,
            state: { center },
        })
    }

    render() {
        const { intl, language, loading } = this.props
        return (
            <MuiTable
                key={generateKey()}
                intl={intl}
                columns={this.columns}
                list={this.getList()}
                language={language}
                details={this.getDetails}
                add={this.onAdd}
                edit={e => this.onEdit(e)}
                isLoading={loading}
            />
        )
    }
}

ListCentre.propTypes = {
    getAllCenters: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    allcenters: PropTypes.array.isRequired,
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    loading: PropTypes.bool,
}

ListCentre.defaultProps = {
    loading: false,
}

const mapStateToProps = state => {
    return {
        language: state.info.language,
        response: state.centreFormation.allCenters.response,
        success: state.centreFormation.allCenters.success,
        allcenters: state.centreFormation.allCenters.response,
        error: state.centreFormation.allCenters.error,
        loading: state.centreFormation.allCenters.loading,
    }
}

const mapDispatchToProps = dispatch => ({
    getAllCenters: payload =>
        dispatch(getAllCentersActions.getAllCentersRequest(payload)),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(ListCentre))
