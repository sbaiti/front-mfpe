import { Paper } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import FullWidthTabs from '../../../components/demande/fullWidthTabs'
import RenderDemandeDetails from './demandeDetails'
import RenderApplicationHistory from './applicationHistory'
import RenderCitoyenApplications from './citoyenApplications'
import RenderCitoyenDetails from './citoyenDetails'
import getDemandeActions from '../../../redux/demande/getDemande'

class RenderDetails extends React.Component {
    constructor(props) {
        super(props)
        const { getDemande, data } = props
        getDemande(data.id)
    }

    render() {
        const {
            demande,
            language,
            allDemandes,
            intl,
            allReferenciels,
            allUsers,
            data,
        } = this.props
        return (
            <Paper className="p-4 bg-light">
                {!demande || demande.id !== data.id ? null : (
                    <FullWidthTabs
                        language={language}
                        tabs={[
                            {
                                title: (
                                    <FormattedMessage id="applicationInfos" />
                                ),
                                content: (
                                    <RenderDemandeDetails
                                        data={demande}
                                        allDemandes={allDemandes}
                                        language={language}
                                        intl={intl}
                                        allReferenciels={allReferenciels}
                                    />
                                ),
                            },
                            {
                                title: (
                                    <FormattedMessage id="applicationHistory" />
                                ),
                                content: (
                                    <RenderApplicationHistory
                                        data={demande}
                                        allDemandes={allDemandes}
                                        language={language}
                                        intl={intl}
                                        allReferenciels={allReferenciels}
                                        allUsers={allUsers}
                                    />
                                ),
                            },
                            {
                                title: <FormattedMessage id="citizenInfos" />,
                                content: (
                                    <RenderCitoyenDetails
                                        data={demande}
                                        allDemandes={allDemandes}
                                        language={language}
                                        intl={intl}
                                        allReferenciels={allReferenciels}
                                    />
                                ),
                            },
                            {
                                title: (
                                    <FormattedMessage id="citizenApplications" />
                                ),
                                content: (
                                    <RenderCitoyenApplications
                                        data={demande}
                                        allDemandes={allDemandes}
                                        language={language}
                                        intl={intl}
                                        allReferenciels={allReferenciels}
                                    />
                                ),
                            },
                        ]}
                    />
                )}
            </Paper>
        )
    }
}

RenderDetails.defaultProps = {
    demande: null,
}

RenderDetails.propTypes = {
    data: PropTypes.object.isRequired,
    demande: PropTypes.object,
    allDemandes: PropTypes.array.isRequired,
    allUsers: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object.isRequired,
    getDemande: PropTypes.func.isRequired,
}
const mapStateToProps = state => {
    return {
        demande: state.demande.demande.response,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getDemande: id => dispatch(getDemandeActions.getDemandeRequest(id)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RenderDetails)
