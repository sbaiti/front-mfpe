import React, { Fragment } from 'react'
import { withRouter } from 'react-router'
import { injectIntl, FormattedMessage } from 'react-intl'
import Proptype from 'prop-types'
import { connect } from 'react-redux'
import attestation from '../../assets/icons/methodDraw/attestation.svg'
import emploi from '../../assets/icons/methodDraw/emploi.svg'
import formation from '../../assets/icons/methodDraw/formation.svg'
import projet from '../../assets/icons/methodDraw/projet.svg'
import sociaux from '../../assets/icons/methodDraw/sociaux.svg'
import region from '../../assets/icons/methodDraw/region.svg'
import ContentBlock, { ContentPanel } from '../../components/home/ContentBlock'

import AllDataByGov from './allDataByGov'
import { getTranslatedAttribute } from '../../shared/utility'
import GovBlock from '../../components/home/GovBlock'

class Details extends React.PureComponent {
    state = { selectedType: null }

    handleTypeChange = type => {
        this.setState(({ selectedType }) => ({
            selectedType: type === selectedType ? null : type,
        }))
    }

    getData = index => {
        const { location, data } = this.props
        const govData = data[location.state.gov.code]

        try {
            switch (index) {
                case 0:
                    return govData.dataFormation
                case 1:
                    return govData.dataRegion
                case 2:
                    return govData.dataSocioEconimic[0].activePopulation
                case 3:
                    return `${govData.dataProjet.nbProjetPublic} ${govData.dataProjet.numberProjetPrive}`
                case 4:
                    return govData.dataAttestation
                case 5:
                    return govData.dataEmploi

                default:
                    return ''
            }
        } catch (error) {
            console.error(error)

            return ''
        }
    }

    render() {
        const { location, language, data } = this.props
        if (!data) return null
        const title = location.state.gov[getTranslatedAttribute(language)]
        const govData = data[location.state.gov.code]
        console.log(govData)
        const { selectedType } = this.state
        return (
            <div className="container-fluid bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-uppercase border-bottom p-2 bg-gray-300 text-center border-dark text-primary mt-2">
                                {title}
                            </h1>
                        </div>
                        <div className="col-md-6">
                            <GovBlock
                                {...location.state}
                                classes="bg-gray-300 h-100"
                            />
                        </div>
                        <div className="col-md-6">
                            <ContentBlock
                                wheelClicked={e => this.handleTypeChange(e)}
                                showPanel={false}
                                classes="bg-gray-300 mw-100"
                            />
                        </div>
                        <div className="col-12 mt-2">
                            <div className=" bg-gray-300 p-3">
                                {selectedType !== null ? (
                                    <Fragment>
                                        <ContentPanel
                                            value={selectedType}
                                            showButton={false}
                                            index={0}
                                            image={formation}
                                            content={this.getData(0)}
                                        >
                                            <FormattedMessage id="trainingData" />
                                        </ContentPanel>
                                        <ContentPanel
                                            value={selectedType}
                                            showButton={false}
                                            index={1}
                                            image={region}
                                            content={this.getData(1)}
                                        >
                                            <FormattedMessage id="regionData" />
                                        </ContentPanel>
                                        <ContentPanel
                                            value={selectedType}
                                            showButton={false}
                                            index={2}
                                            image={sociaux}
                                            content={this.getData(2)}
                                        >
                                            <FormattedMessage id="socioEcoData" />
                                        </ContentPanel>
                                        <ContentPanel
                                            value={selectedType}
                                            showButton={false}
                                            index={3}
                                            image={emploi}
                                            content={this.getData(3)}
                                        >
                                            <FormattedMessage id="projectData" />
                                        </ContentPanel>
                                        <ContentPanel
                                            value={selectedType}
                                            showButton={false}
                                            index={4}
                                            image={attestation}
                                            content={this.getData(4)}
                                        >
                                            <FormattedMessage id="certificateData" />
                                        </ContentPanel>
                                        <ContentPanel
                                            value={selectedType}
                                            showButton={false}
                                            index={5}
                                            image={projet}
                                            content={this.getData(5)}
                                        >
                                            <FormattedMessage id="employementData" />
                                        </ContentPanel>
                                    </Fragment>
                                ) : (
                                    <AllDataByGov govData={govData} />
                                )}
                            </div>
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
    location: Proptype.string.isRequired,
}
const mapStateToProps = ({ info, home }) => ({
    language: info.language,
    data: home.response,
})
export default connect(mapStateToProps)(injectIntl(withRouter(Details)))
