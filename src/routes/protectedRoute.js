import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ connected, ecrans, ...data }) => {
    if (connected === data.showWhenConnected) {
        if (
            !connected ||
            (connected &&
                (!data.location ||
                    data.permission === '*' ||
                    Object.values(ecrans || {}).includes(data.permission)))
        ) {
            return <Route {...data} />
        }
    }

    return null
}

ProtectedRoute.propTypes = {
    connected: PropTypes.bool.isRequired,
    ecrans: PropTypes.array.isRequired,
}

ProtectedRoute.defautProps = {
    connected: null,
    location: null,
    ecrans: [],
}

const mapStateToProps = ({ login }) => ({
    connected: login.connected,
    ecrans: ((login.response || {}).User || {}).ecrans,
})

export default connect(mapStateToProps)(withRouter(ProtectedRoute))
