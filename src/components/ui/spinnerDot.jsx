import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class SpinnerDot extends React.Component {
    constructor(props) {
        super(props)
        this.state = { xScroll: 0, yScroll: 0 }
        this.xScroll = 0
        this.yScroll = 0
    }

    componentDidMount() {
        window.addEventListener('scroll', e => this.onScroll(e))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () =>
            console.log('removeEventscroll')
        )
    }

    onScroll = () => {
        const doc = document.documentElement
        this.xScroll =
            (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
        this.yScroll =
            (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
        this.setState({ xScroll: this.xScroll, yScroll: this.yScroll })
    }

    render() {
        const { show } = this.props
        const { xScroll, yScroll } = this.state

        return (
            <div
                className="spinner"
                style={{
                    marginLeft: xScroll,
                    marginTop: yScroll,
                    display: show ? 'block' : 'none',
                }}
            >
                <div className="dot1" />
                <div className="dot2" />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    connected: state.login.connected,
})

SpinnerDot.propTypes = {
    show: PropTypes.bool.isRequired,
}

export default connect(
    mapStateToProps,
    null
)(SpinnerDot)
