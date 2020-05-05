import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Archive from './archive.svg'
import Dashboard from './dashboard.svg'
import Demands from './demands.svg'
import Disconnect from './disconnect.svg'
import Informations from './informations.svg'
import Nomenclatures from './nomenclatures.svg'
import ConstructionMode from './constructionMode.svg'
import Newspaper from './newspaper.svg'
import Briefcase from './briefcase.svg'
import Setting from './setting.svg'
import Folder from './folder.svg'
import SpreadSheet from './spreadsheet.svg'

class Icons extends Component {
    /**
     * Components
     * @type {{disconnect: *, nomenclatures: *, archive: *, dashboard: *, demands: *, informations: *}}
     */
    components = {
        consultDemands: Archive,
        editique: Dashboard,
        demands: Demands,
        disconnect: Disconnect,
        informations: Informations,
        nomenclatures: Nomenclatures,
        construction: ConstructionMode,
        collectData: Folder,
        donneesSecteurSocio: Newspaper,
        donneesSecteurEmploi: Briefcase,
        accessProfilingManagment: Setting,
        spreadSheet: SpreadSheet,
    }

    /**
     * Render
     * @returns {*}
     */
    render() {
        const { name, viewBox, height, width } = this.props
        const TagName = this.components[name] || this.components.consultDemands
        return <TagName viewBox={viewBox} width={width} height={height} />
    }
}

/**
 * Default Props
 * @type {{viewBox: string, width: string, height: string}}
 */
Icons.defaultProps = {
    viewBox: '-20 0 100 50',
    height: '40',
    width: '40',
}
/**
 * Proptypes
 * @type {{viewBox: *, name: *, width: *, height: *}}
 */
Icons.propTypes = {
    name: PropTypes.string.isRequired,
    viewBox: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
}
export default Icons
