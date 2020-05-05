import React from 'react'
import { withRouter } from 'react-router'
import { injectIntl, FormattedMessage } from 'react-intl'
import Proptype from 'prop-types'
import { connect } from 'react-redux'
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core'
import MapBlock from '../../components/home/MapBlock'
import govs from './govsCoordinates'

class Details extends React.PureComponent {
    state = { selectedType: null }

    handleTypeChange = type => {
        this.setState(({ selectedType }) => ({
            selectedType: type === selectedType ? null : type,
        }))
    }

    getTitle = () => {
        const { match } = this.props
        const dataTypes = [
            { title: 'trainingData', background: '#ffb300' },
            { title: 'regionData', background: '#61c5e5' },
            { title: 'socioEcoData', background: '#8dc63f' },
            { title: 'projectData', background: '#00838f' },
            { title: 'certificateData', background: '#762a88' },
            { title: 'employementData', background: '#ec008c' },
        ]
        return dataTypes[match.params.type] || ''
    }

    render() {
        const { match, language, data } = this.props
        if (!data) return null
        const type = this.getTitle()
        const govData = data
        console.log(govData, match, language)
        return (
            <div className="container-fluid bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1
                                style={{ background: type.background }}
                                className="text-uppercase border-bottom p-2 text-center border-dark text-primary mt-2"
                            >
                                <FormattedMessage id={type.title} />
                            </h1>
                        </div>
                        <div className="col-md-6 mb-2">
                            <MapBlock
                                mapData={Object.keys(govs).map(key => (
                                    <g>
                                        <circle
                                            cx={govs[key].x}
                                            cy={govs[key].y}
                                            r="9"
                                            fill="white"
                                        ></circle>
                                        <text
                                            x={govs[key].x - 1}
                                            y={govs[key].y + 4}
                                            textAnchor="middle"
                                            fontSize="11"
                                            stroke="black"
                                        >
                                            {Math.floor(Math.random() * 100)}
                                        </text>
                                    </g>
                                ))}
                                classes="bg-gray-300 h-100"
                            />
                        </div>
                        <div className="col-md-6 mb-2">
                            <Paper className="bg-gray-300 h-100 p-2">
                                <Table className="bg-white">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>lorem</TableCell>
                                            <TableCell>ispum</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                Lorem ipsum dolor sit amet,
                                                consectetur
                                            </TableCell>
                                            <TableCell>12</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Lorem ipsum dolor sit amet,
                                                consectetur
                                            </TableCell>
                                            <TableCell>12</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Lorem ipsum dolor sit amet,
                                                consectetur
                                            </TableCell>
                                            <TableCell>12</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Lorem ipsum dolor sit amet,
                                                consectetur
                                            </TableCell>
                                            <TableCell>12</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Details.propTypes = {
    language: Proptype.string.isRequired,
    data: Proptype.string.isRequired,
    match: Proptype.string.isRequired,
}
const mapStateToProps = ({ info, home }) => ({
    language: info.language,
    data: home.response,
})
export default connect(mapStateToProps)(injectIntl(withRouter(Details)))
