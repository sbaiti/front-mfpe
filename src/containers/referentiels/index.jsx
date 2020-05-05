/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper, TableRow, TableCell, TableBody, Table } from '@material-ui/core'
import MuiTable from '../../components/ui/table'
import generateKey from '../../shared/utility'
import deleteReferenceActions from '../../redux/referencial/deleteReferencial'
import editReferenceActions from '../../redux/referencial/editReferencial'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import setPageTitleActions from '../../redux/pageTitle'

/**
 * display referentiels list
 *
 * @class ListReferentiels
 * @extends {React.Component}
 */
class ListReferentiels extends React.Component {
    /**
     * Creates an instance of ListReferentiels.
     * @param {*} props
     * @memberof ListReferentiels
     */
    constructor(props) {
        super(props)
        this.state = {}
        const { allReferenciels, getAllReferentiels } = props
        this.columns = this.getColumns()
        if (!allReferenciels || !allReferenciels.referenciels)
            getAllReferentiels()
        props.setPageTitle('referencesList')
    }

    /**
     * onRemove: remove a referentiel
     *
     * @memberof ListReferentiels
     * @param {integer} id
     */

    onRemove = id => {
        const { alertShow, language, removeReferentiel, intl } = this.props
        alertShow(true, {
            onConfirm: () => {
                removeReferentiel({ id, intl })
            },
            warning: true,
            info: false,
            error: false,
            success: false,
            message:
                language === 'ar'
                    ? 'هل تريد حقًا حذف هذا المرجع؟'
                    : 'Voulez vous vraiment supprimer ce reférentiel?',
            title: language === 'ar' ? 'تأكيد' : 'Confirmation',
        })
    }

    /**
     *onAdd: redirect to add referentiel interface
     *
     * @memberof ListReferentiels
     */
    onAdd = () => {
        const { history } = this.props
        history.push({
            pathname: `/referentiels/ajouter/`,
        })
    }

    getColumns = () => {
        const { intl } = this.props
        return [
            {
                field: 'code',
                title: intl.formatMessage({ id: 'number' }),
            },
            {
                field: 'intituleAr',
                title: intl.formatMessage({ id: 'titleAr' }),
            },
            {
                field: 'intituleFr',
                title: intl.formatMessage({ id: 'titleFr' }),
            },
            {
                field: 'categorie',
                title: intl.formatMessage({ id: 'category' }),
            },
            // {
            //     field: 'parent',
            //     title: intl.formatMessage({ id: 'parent' }),
            // },
        ]
    }

    /**
     * renderDetails: details of a referentiel
     *
     * @memberof ListReferentiels
     */
    getDetails = data => {
        return (
            <Paper className="m-3 p-3">
                <Table>
                    <TableBody>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="number" />
                            </TableCell>
                            <TableCell>{data.code}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="titleAr" />
                            </TableCell>
                            <TableCell>{data.intituleAr}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="titleFr" />
                            </TableCell>
                            <TableCell>{data.intituleFr}</TableCell>
                        </TableRow>
                        <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="category" />
                            </TableCell>
                            <TableCell>{data.categorie}</TableCell>
                        </TableRow>
                        {/* <TableRow key={generateKey()}>
                            <TableCell className="font-weight-bold">
                                <FormattedMessage id="parent" />
                            </TableCell>
                            <TableCell>{data.parent}</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    /**
     * render component
     *
     * @returns {JSX}
     * @memberof ListReferentiels
     */

    render() {
        const { intl, language } = this.props
        let list = []
        const { allReferenciels } = this.props
        Object.keys(allReferenciels.referenciels).forEach(key => {
            const items = allReferenciels.referenciels[key].map(d => {
                return {
                    ...d,
                    categorie: key.replace('Ref', ''),
                }
            })
            list = [...list, ...items]
        })
        return (
            <MuiTable
                key={generateKey()}
                intl={intl}
                columns={this.columns}
                list={list}
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
        allReferenciels: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    removeReferentiel: id =>
        dispatch(deleteReferenceActions.deleteReferenceRequest(id)),
    editReferentiel: id =>
        dispatch(editReferenceActions.editReferenceRequest(id)),
    setPageTitle: payload =>
        dispatch(setPageTitleActions.setPageTitleRequest(payload)),
})

ListReferentiels.propTypes = {
    getAllReferentiels: PropTypes.func.isRequired,
    allReferenciels: PropTypes.object,
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    alertShow: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    removeReferentiel: PropTypes.func.isRequired,
}

ListReferentiels.defaultProps = {
    allReferenciels: {},
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(ListReferentiels))
