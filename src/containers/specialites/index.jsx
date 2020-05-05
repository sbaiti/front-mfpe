/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper, TableRow, TableCell, TableBody, Table } from '@material-ui/core'
import MuiTable from '../../components/ui/table'
import generateKey from '../../shared/utility'
import setPageTitleActions from '../../redux/pageTitle'
import deleteSpecialiteActions from '../../redux/specialite/deleteSpecialite'
import getAllSpecialitesActions from '../../redux/specialite/getAllSpecialites'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import alertActions from '../../redux/alert'

/**
 * display speialities list
 *
 * @class ListSpecialites
 * @extends {React.Component}
 */
class ListSpecialites extends React.Component {
    static propTypes = {
        getAllSpecialites: PropTypes.func.isRequired,
        allSpecialites: PropTypes.array,
        intl: PropTypes.object.isRequired,
        language: PropTypes.string.isRequired,
        removeSpecialite: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        setPageTitle: PropTypes.func.isRequired,
    }

    static defaultProps = {
        allSpecialites: [],
    }

    /**
     * Creates an instance of ListSpecialites.
     * @param {*} props
     * @memberof ListSpecialites
     */
    constructor(props) {
        super(props)
        this.specialite = {}
        const { allSpecialites, getAllSpecialites, setPageTitle } = props
        this.columns = this.getColumns()
        if (!allSpecialites) getAllSpecialites()
        setPageTitle('specialitiesList')
    }

    getList = () => {
        const { allSpecialites, language } = this.props
        const list = (allSpecialites || []).map(i => {
            return {
                ...i,
                nomSpecialite: language === 'ar' ? i.intituleAr : i.intituleFr,
                natureFormation:
                    language === 'ar'
                        ? i.natureFormation.intituleAr
                        : i.natureFormation.intituleFr,
                niveauDiplome:
                    language === 'ar'
                        ? i.niveauDiplome.intituleAr
                        : i.niveauDiplome.intituleFr,
                secteur:
                    language === 'ar'
                        ? i.secteur.intituleAr
                        : i.secteur.intituleFr,
                sousSecteur:
                    language === 'ar'
                        ? i.sousSecteur.intituleAr
                        : i.sousSecteur.intituleFr,
            }
        })
        return list
    }

    getColumns() {
        const { intl } = this.props
        return [
            {
                field: 'nomSpecialite',
                title: intl.formatMessage({ id: 'speciality' }),
            },
            {
                field: 'secteur',
                title: intl.formatMessage({ id: 'sector' }),
            },
            {
                field: 'sousSecteur',
                title: intl.formatMessage({ id: 'subsector' }),
            },
            {
                field: 'natureFormation',
                title: intl.formatMessage({ id: 'FormationNature' }),
            },
            {
                field: 'niveauDiplome',
                title: intl.formatMessage({ id: 'Diplomalevel' }),
            },
        ]
    }

    /**
     * onRemove: remove a speciality
     *
     * @memberof ListSpecialites
     * @param {integer} id
     */
    onRemove = id => {
        const { alertShow, language, removeSpecialite, intl } = this.props
        alertShow(true, {
            onConfirm: () => {
                removeSpecialite({ id, intl })
            },
            warning: true,
            info: false,
            error: false,
            success: false,
            message:
                language === 'ar'
                    ? 'هل تريد حقًا حذف هذا  التخصص   ؟'
                    : 'Voulez vous vraiment supprimer cette spécialité ?',
            title: language === 'ar' ? 'تأكيد' : 'Confirmation',
        })
    }

    /**
     *onAdd: redirect to add speciality interface
     *
     * @memberof ListSpecialites
     */
    onAdd = () => {
        const { history } = this.props
        history.push({
            pathname: `/specialites/ajouter/`,
        })
    }

    onEdit = id => {
        const { history, allSpecialites } = this.props
        const specialite = allSpecialites.find(d => d.id === id)
        history.push({
            pathname: `/specialite/modifier/${id}`,
            state: { specialite },
        })
    }

    /**
     * renderDetails: details of a speciality
     *
     * @memberof ListSpecialites
     */

    getDetails = data => {
        return (
            <Paper className="m-3 p-3">
                <Table>
                    <TableBody>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="speciality" />
                            </TableCell>
                            <TableCell>{data.nomSpecialite}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="code" />
                            </TableCell>
                            <TableCell>{data.codeSpecialite}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="ExamFees" />
                            </TableCell>
                            <TableCell>{data.fraisSpecialiteExam}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="FormationNature" />
                            </TableCell>
                            <TableCell>{data.natureFormation}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="Diplomalevel" />
                            </TableCell>
                            <TableCell>{data.niveauDiplome}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="sector" />
                            </TableCell>
                            <TableCell>{data.secteur}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="subsector" />
                            </TableCell>
                            <TableCell>{data.sousSecteur}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    /**
     * render component
     *
     * @returns {JSX}
     * @memberof ListSpecialites
     */

    render() {
        const { intl, language } = this.props
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
                remove={e => this.onRemove(e)}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedUser: state.login.response.User.details,
        language: state.info.language,
        allSpecialites: state.specialite.allSpecialites.response,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    getAllSpecialites: () =>
        dispatch(getAllSpecialitesActions.getAllSpecialitesRequest()),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    removeSpecialite: id =>
        dispatch(deleteSpecialiteActions.deleteSpecialiteRequest(id)),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
    alertShow: (show, info) =>
        dispatch(
            alertActions.alertShow(show, {
                onConfirm: info.onConfirm,
                warning: info.warning,
                info: info.info,
                error: info.error,
                success: info.success,
                message: info.message,
                title: info.title,
            })
        ),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(ListSpecialites))
