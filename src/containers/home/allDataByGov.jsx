import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import PropType from 'prop-types'
import Formation from '../../components/home/GovBlock/wheelIcons/formation.svg'
import Region from '../../components/home/GovBlock/wheelIcons/region.svg'
import Projet from '../../components/home/GovBlock/wheelIcons/projet.svg'
import Emploi from '../../components/home/GovBlock/wheelIcons/emploi.svg'
import Sociaux from '../../components/home/GovBlock/wheelIcons/sociaux.svg'
import Attestation from '../../components/home/GovBlock/wheelIcons/attestation.svg'

const AllDataByGov = ({ govData }) => {
    const getData = index => {
        try {
            switch (index) {
                case 0:
                    return govData.dataFormation || 'Data Formation'
                case 1:
                    return govData.dataRegion.nbDelegation || 'Data Region'
                case 2:
                    return govData.dataSocioEconimic.length
                        ? govData.dataSocioEconimic[0].activePopulation ||
                              'Data Sociaux Economique'
                        : 'Data Sociaux Economique'
                case 3:
                    return `${govData.dataProjet.nbProjetPublic} ${govData.dataProjet.numberProjetPrive}`
                case 4:
                    return govData.dataAttestation || 'Data Attestation'
                case 5:
                    return govData.dataEmploi || 'Data Emploi'

                default:
                    return ''
            }
        } catch (error) {
            console.error(error)
            return ''
        }
    }
    return (
        <Fragment>
            <div className="d-flex align-items-center flex-wrap">
                <Region width="50" />
                <h3
                    className="font-weight-bolder mb-0 mx-2"
                    style={{ color: '#61c5e5' }}
                >
                    <FormattedMessage id="regionData" />
                </h3>
                <p className="w-100 p-3">{getData(1)}</p>
            </div>
            <div className="d-flex align-items-center flex-wrap">
                <Sociaux width="50" />
                <h3
                    className="font-weight-bolder mb-0 mx-2"
                    style={{ color: '#8dc63f' }}
                >
                    <FormattedMessage id="socioEcoData" />
                </h3>
                <p className="w-100 p-3">{getData(2)}</p>
            </div>
            <div className="d-flex align-items-center flex-wrap">
                <Projet width="50" />
                <h3
                    className="font-weight-bolder mb-0 mx-2"
                    style={{ color: '#00838f' }}
                >
                    <FormattedMessage id="projectData" />
                </h3>
                <p className="w-100 p-3">{getData(3)}</p>
            </div>
            <div className="d-flex align-items-center flex-wrap">
                <Attestation width="50" />
                <h3
                    className="font-weight-bolder mb-0 mx-2"
                    style={{ color: '#762a88' }}
                >
                    <FormattedMessage id="certificateData" />
                </h3>
                <p className="w-100 p-3">{getData(4)}</p>
            </div>
            <div className="d-flex align-items-center flex-wrap">
                <Emploi width="50" />
                <h3
                    className="font-weight-bolder mb-0 mx-2"
                    style={{ color: '#ec008c' }}
                >
                    <FormattedMessage id="employementData" />
                </h3>
                <p className="w-100 p-3">{getData(5)}</p>
            </div>
            <div className="d-flex align-items-center flex-wrap">
                <Formation width="50" />
                <h3
                    className="font-weight-bolder mb-0 mx-2"
                    style={{ color: '#ffb300' }}
                >
                    <FormattedMessage id="trainingData" />
                </h3>
                <p className="w-100 p-3">{getData(0)}</p>
            </div>
        </Fragment>
    )
}

AllDataByGov.propTypes = {
    govData: PropType.object.isRequired,
}

export default AllDataByGov
