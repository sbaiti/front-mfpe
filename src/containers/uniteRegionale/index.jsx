/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import MaterialTable from 'material-table'
import alertActions from '../../redux/alert'
import MuiTable from '../../components/ui/table'
import deleteReferenceActions from '../../redux/referencial/deleteReferencial'
import editReferenceActions from '../../redux/referencial/editReferencial'
import getAllReferenceActions from '../../redux/referencial/getAllReferencial'
import getAllUniteRegionalesActions from '../../redux/uniteRegionale/getAllUniteRegionales'
import setPageTitleActions from '../../redux/pageTitle'

/**
 * ListUniteRegionale
 *
 * @class ListUniteRegionale
 * @extends {React.Component}
 */
class ListUniteRegionale extends React.Component {
    static propTypes = {
        getAllReferentiels: PropTypes.func.isRequired,
        // getAllUnits: PropTypes.func.isRequired,
        allUnits: PropTypes.array,
        allReferenciels: PropTypes.object,
        history: PropTypes.object.isRequired,
        intl: PropTypes.object.isRequired,
        language: PropTypes.string.isRequired,
        alertShow: PropTypes.func.isRequired,
        removeUnit: PropTypes.func.isRequired,
        editUnit: PropTypes.func.isRequired,
        setPageTitle: PropTypes.func.isRequired,
    }

    static defaultProps = {
        allReferenciels: {},
        allUnits: [],
    }

    /**
     * Creates an instance of ListUniteRegionale.
     * @param {*} props
     * @memberof ListUniteRegionale
     */
    constructor(props) {
        super(props)
        this.state = {}
        const {
            allReferenciels,
            getAllReferentiels,
            setPageTitle,
            // , getAllUnits
        } = props
        if (!allReferenciels || !allReferenciels.referenciels)
            getAllReferentiels()
        // getAllUnits()
        this.columns = [
            {
                field: 'code_unite',
                title: <FormattedMessage id="number" />,
            },
            {
                field: 'titre',
                title: <FormattedMessage id="title" />,
            },
            {
                field: 'premier_responsable',
                title: <FormattedMessage id="firstResponsible" />,
            },
            {
                field: 'email',
                title: <FormattedMessage id="email" />,
            },
            {
                field: 'gouvernorat',
                title: <FormattedMessage id="governorate" />,
            },
            {
                field: 'tel',
                title: <FormattedMessage id="phone" />,
            },
            {
                field: 'fax',
                title: <FormattedMessage id="fax" />,
            },
            {
                field: 'fonction',
                title: <FormattedMessage id="function" />,
            },
            // {
            //     field: 'parent',
            //     title: <FormattedMessage id="speciality" />,
            // },
        ]
        setPageTitle('ruList')
    }

    onRemove = id => {
        const { alertShow, language, removeUnit } = this.props
        alertShow(true, {
            onConfirm: () => {
                removeUnit(id)
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

    onAdd = () => {
        const { history } = this.props

        history.push({
            pathname: `/unite-regionale/ajouter/`,
        })
    }

    renderDetails = item => {
        const { intl, editUnit } = this.props
        const columns = [
            {
                title: 'text',
                field: 'text',
                editable: 'never',
                cellStyle: { textAlign: 'inherit', fontWeight: 'bold' },
            },
            {
                title: 'value',
                field: 'value',
                cellStyle: { textAlign: 'inherit' },
            },
        ]
        const data = [
            {
                name: 'code_unite',
                text: intl.formatMessage({ id: 'code' }),
                value: item.code_unite,
            },
            {
                name: 'email',
                text: intl.formatMessage({ id: 'email' }),
                value: item.email,
            },
            {
                name: 'titre',
                text: intl.formatMessage({ id: 'title' }),
                value: item.titre,
            },
            {
                name: 'gouvernorat',
                text: intl.formatMessage({ id: 'governorate' }),
                value: item.gouvernorat,
            },
            {
                name: 'premier_responsable',
                text: intl.formatMessage({ id: 'firstResponsible' }),
                value: item.premier_responsable,
            },
            {
                name: 'tel',
                text: intl.formatMessage({ id: 'phone' }),
                value: item.tel,
            },
            {
                name: 'fax',
                text: intl.formatMessage({ id: 'fax' }),
                value: item.fax,
            },
            {
                name: 'fonction',
                text: intl.formatMessage({ id: 'function' }),
                value: item.fonction,
            },
        ]
        return (
            <Fragment>
                <Paper className="p-4">
                    <MaterialTable
                        columns={columns}
                        data={data}
                        options={{
                            toolbar: false,
                            showTitle: false,
                            search: false,
                            sorting: false,
                            paging: false,
                            header: false,
                            detailPanelColumnAlignment: 'right',
                            actionsColumnIndex: -1,
                            rowStyle: rowData => ({
                                display:
                                    rowData.value !== null &&
                                    rowData.value.length
                                        ? ''
                                        : 'none',
                            }),
                        }}
                        editable={{
                            isEditable: currentField => {
                                if (currentField.name.indexOf('intitule') > -1)
                                    return true
                                return false
                            },
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        {
                                            const index = data.indexOf(oldData)
                                            data[index] = newData
                                            if (newData.value !== oldData.value)
                                                editUnit({
                                                    ...item,
                                                    categorie: `Ref${item.categorie}`,
                                                    [newData.name]:
                                                        newData.value,
                                                })
                                        }
                                        resolve()
                                    }, 1000)
                                }),
                        }}
                    />
                </Paper>
            </Fragment>
        )
    }

    render() {
        const { allUnits, intl, language } = this.props
        // const lang = language === 'ar' ? 'email' : 'titre'

        let list = []
        // allUnits.forEach(key => {
        //     const items = allReferenciels.referenciels[key].map(e => {
        //         return { ...e, categorie: key.replace('Ref', '') }
        //     })
        //     list = [...list, ...items]
        // })
        if (!allUnits)
            list = [
                {
                    code_unite: '1234',
                    titre: ' unit 1',
                    gouvernorat: 'tunis',
                    premier_responsable: 'foulen',
                    tel: '12345678',
                    fax: '12345679',
                    email: 'mail@domaine.com',
                    fonction: 'function',
                },
                {
                    code_unite: '231',
                    titre: ' unit 2',
                    gouvernorat: 'nabeul',
                    premier_responsable: 'foulen 2',
                    tel: '12345678',
                    fax: '12345679',
                    email: 'mail@domaine.com',
                    fonction: 'function',
                },
            ]

        return (
            <MuiTable
                intl={intl}
                columns={this.columns}
                list={list}
                title={<FormattedMessage id="ruList" />}
                // edit={e => this.onEdit(e)}
                language={language}
                details={e => this.renderDetails(e)}
                add={this.onAdd}
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
        allUnits: state.uniteRegionale.allUniteRegionales.response,
    }
}
const mapDispatchToProps = dispatch => ({
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
    getAllUnits: () =>
        dispatch(getAllUniteRegionalesActions.getAllUniteRegionalesRequest()),
    removeUnit: id =>
        dispatch(deleteReferenceActions.deleteReferenceRequest(id)),
    editUnit: id => dispatch(editReferenceActions.editReferenceRequest(id)),
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
)(injectIntl(ListUniteRegionale))
