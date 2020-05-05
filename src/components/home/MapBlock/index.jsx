/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react'
import { Select, Container, FormControl, MenuItem } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withRouter } from 'react-router'
import TunisiaMap from '../../ui/tunisiaMap'
import getAllReferenceActions from '../../../redux/referencial/getAllReferencial'

/**
 *  Home Page - Map Block -
 *
 * @class MapBlock
 * @extends {React.Component}
 */
class MapBlock extends React.Component {
    state = {
        open: false,
        gov: '',
        cityName: '',
        posX: 0,
        posY: 0,
        display: 'none',
        mapData: null,
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.refResponse) {
            const data = []
            const govReferences =
                nextProps.refResponse.referenciels.RefGouvernorat
            govReferences.forEach(item => {
                data[item.code] = {
                    intituleFr: item.intituleFr,
                    intituleAr: item.intituleAr,
                }
            })
            return { mapData: data }
        }
        return { mapData: null }
    }

    componentDidMount = () => {
        document.addEventListener('mousemove', this.handleMouseMove, false)
        const { refResponse } = this.props
        if (refResponse && refResponse.referenciels.RefGouvernorat)
            this.govReferencesToProps(refResponse.referenciels.RefGouvernorat)
        else {
            this.forceUpdate()
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener('mousemove', this.handleMouseMove, false)
    }

    /**
     *
     * @param {array} govReferences
     * @memberof MapBlock
     */
    govReferencesToProps = govReferences => {
        const data = []
        govReferences.forEach(item => {
            data[item.code] = {
                intituleFr: item.intituleFr,
                intituleAr: item.intituleAr,
            }
        })
        this.setState({ mapData: data })
    }

    /**
     * Show City Name
     *
     * @param {object} e
     * @memberof MapBlock
     */
    showCityName = e => {
        const { mapData } = this.state
        const city = mapData ? mapData[e.target.id] : null
        if (city !== null && city !== '' && city !== undefined) {
            this.setState({
                cityName: city,
                posX: e.clientX,
                posY: e.clientY,
                display: 'block',
            })
        } else {
            this.hideCityName()
        }
    }

    /**
     * handle map click
     *
     * @param {object} e
     * @memberof MapBlock
     */
    handleMapClick = e => {
        const { mapData } = this.state
        const { history } = this.props
        if (e.target.id)
            history.push({
                pathname: `/donnees-de-la-region/${mapData[e.target.id].intituleFr}`,
                state: { gov: { ...mapData[e.target.id], code: e.target.id } },
            })
    }

    /**
     * Hide City Name
     *
     * @memberof MapBlock
     */
    hideCityName = () => {
        this.setState({
            cityName: '',
        })
    }

    /**
     * Handle Close
     *
     * @memberof MapBlock
     */
    handleClose = () => {
        this.setState({ open: false })
    }

    /**
     * Handle Open
     *
     * @memberof MapBlock
     */
    handleOpen = () => {
        this.setState({ open: true })
    }

    /**
     * Handle Change
     *
     * @param {object} event
     * @memberof MapBlock
     */
    handleChange = event => {
        let gov = null
        gov =
            event.target && event.target.id
                ? event.target.id
                : event.target.value
        this.handleMapClick({ target: { id: gov } })
        this.setState({ gov })
    }

    render() {
        const { open, gov, cityName, posX, posY, display } = this.state
        const { refResponse, language, classes, mapData } = this.props
        return (
            <Container
                maxWidth="sm"
                className={`${classes} map-block d-flex flex-column align-items-center h-100`}
            >
                {refResponse ? (
                    <Fragment>
                        <div className="d-flex">
                            <FormControl>
                                <Select
                                    open={open}
                                    onClose={this.handleClose}
                                    onOpen={this.handleOpen}
                                    value={gov}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'gov',
                                        id: 'demo-controlled-open-select',
                                    }}
                                >
                                    {(
                                        refResponse.referenciels
                                            .RefGouvernorat || []
                                    ).map(ref => {
                                        return (
                                            <MenuItem
                                                key={ref.id}
                                                value={ref.code}
                                            >
                                                {language === 'fr'
                                                    ? ref.intituleFr
                                                    : ref.intituleAr}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="d-flex h-100">
                            <div
                                style={{
                                    position: 'fixed',
                                    top: `${posY - 30}px`,
                                    left: `${posX}px`,
                                    zIndex: 9999,
                                    color: 'rgb(8, 25, 57)',
                                    padding: '0 10px',
                                    background: 'rgba(255, 255, 255, 0.7)',
                                    borderRadius: 9,
                                    pointerEvents: 'none',
                                    fontWeight: 'bolder',
                                    display,
                                }}
                            >
                                {language === 'fr'
                                    ? cityName.intituleFr
                                    : cityName.intituleAr}
                            </div>

                            <TunisiaMap
                                viewBox="0 0 290.8 650.7"
                                width="100%"
                                height="100%"
                                onMouseMove={this.showCityName}
                                onMouseLeave={this.hideCityName}
                                onClick={this.handleMapClick}
                                badges={mapData}
                            />
                        </div>
                    </Fragment>
                ) : (
                    <CircularProgress disableShrink />
                )}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.info.language,
        refResponse: state.referencial.allReferencials.response,
    }
}
const mapDispatchToProps = dispatch => ({
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
})
MapBlock.propTypes = {
    language: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    refResponse: PropTypes.object,
    classes: PropTypes.string,
    mapData: PropTypes.array,
}

MapBlock.defaultProps = {
    refResponse: {},
    classes: '',
    mapData: [],
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(withRouter(MapBlock)))
