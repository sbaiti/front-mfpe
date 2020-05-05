import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropType from 'prop-types'
import { injectIntl } from 'react-intl'
import getUserActions from '../../redux/user/getUser'
import Index from '../profile'

const Details = props => {
    const { getUser, selectedUser, history, match } = props
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(selectedUser)
    }, [selectedUser])
    if (history.location.state)
        return <Index user={history.location.state.user} />
    if (!user) {
        getUser({ id: match.params.id })
    }
    const isEmpty = Object.keys(user || {}).length
    if (isEmpty === 0) return null
    return <Index user={user} />
}

Details.propTypes = {
    getUser: PropType.func.isRequired,
    history: PropType.object.isRequired,
    selectedUser: PropType.object,
    match: PropType.object.isRequired,
}
Details.defaultProps = {
    selectedUser: null,
}

const mapStateToProps = ({ user, info }) => {
    return {
        selectedUser: user.user.response,
        language: info.language,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getUser: payload => dispatch(getUserActions.getUserRequest(payload)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Details))
