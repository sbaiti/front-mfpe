import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AuthBlock from '../../components/home/AuthBlock'
import ContentBlock from '../../components/home/ContentBlock'
import MapBlock from '../../components/home/MapBlock'
import getHomePageDataActions from '../../redux/home'

class Home extends React.PureComponent {
    constructor(props) {
        super(props)
        props.getHomePageData()
    }

    handleButtonClick = type => {
        const { history } = this.props
        history.push({
            pathname: `/donnees-de-la-tunisie/${type}`,
        })
    }

    render() {
        return (
            <Grid container className="my-4">
                <Grid item xs={12} md={4} sm={6} className="bg-light">
                    {/* Block 1 */}
                    <MapBlock />
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                    {/* Block 2 */}
                    <ContentBlock buttonClicked={this.handleButtonClick} />
                </Grid>
                <Grid item xs={12} md={4} sm={12} className="bg-light">
                    {/* Block 3 */}
                    <AuthBlock />
                </Grid>
            </Grid>
        )
    }
}

Home.propTypes = {
    history: PropTypes.object.isRequired,
    getHomePageData: PropTypes.func.isRequired,
}
const mapDispatchToProps = dispatch => ({
    getHomePageData: () =>
        dispatch(getHomePageDataActions.getHomePageDataRequest()),
})
export default connect(
    null,
    mapDispatchToProps
)(Home)
