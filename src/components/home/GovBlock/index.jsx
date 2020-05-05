import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Ariana from './govs/map-ariana.svg'
import Beja from './govs/map-beja.svg'
import BenArous from './govs/map-ben-arous.svg'
import Bizerte from './govs/map-bizerte.svg'
import Gabes from './govs/map-gabes.svg'
import Gafsa from './govs/map-gafsa.svg'
import Jendouba from './govs/map-jendouba.svg'
import Kairouan from './govs/map-kairouan.svg'
import Kasserine from './govs/map-kasserine.svg'
import Kebili from './govs/map-kebili.svg'
import Kef from './govs/map-kef.svg'
import Mahdia from './govs/map-mahdia.svg'
import Manouba from './govs/map-manouba.svg'
import Medenine from './govs/map-medenine.svg'
import Monastir from './govs/map-monastir.svg'
import Nabeul from './govs/map-nabeul.svg'
import Sfax from './govs/map-sfax.svg'
import SidiBouzid from './govs/map-sidi-bouzid.svg'
import Siliana from './govs/map-siliana.svg'
import Sousse from './govs/map-sousse.svg'
import Tataouine from './govs/map-tataouine.svg'
import Tunis from './govs/map-tunis.svg'
import Tozeur from './govs/map-Tozeur.svg'
import Zaghouan from './govs/map-zaghouan.svg'

/**
 *  Home Page - Gov Block -
 *
 * @class GovBlock
 * @extends {React.Component}
 */
class GovBlock extends React.PureComponent {
    constructor(props) {
        super(props)
        this.govs = {
            'TN-12': Ariana,
            'TN-31': Beja,
            'TN-13': BenArous,
            'TN-23': Bizerte,
            'TN-81': Gabes,
            'TN-71': Gafsa,
            'TN-32': Jendouba,
            'TN-41': Kairouan,
            'TN-42': Kasserine,
            'TN-73': Kebili,
            'TN-33': Kef,
            'TN-53': Mahdia,
            'TN-14': Manouba,
            'TN-82': Medenine,
            'TN-52': Monastir,
            'TN-21': Nabeul,
            'TN-61': Sfax,
            'TN-43': SidiBouzid,
            'TN-34': Siliana,
            'TN-51': Sousse,
            'TN-83': Tataouine,
            'TN-11': Tunis,
            'TN-72': Tozeur,
            'TN-22': Zaghouan,
        }
    }

    render() {
        const { gov, classes } = this.props
        const Gov = this.govs[gov.code] || this.govs.Ariana
        return (
            <div className={classes}>
                <Gov />
            </div>
        )
    }
}

GovBlock.propTypes = {
    gov: PropTypes.object.isRequired,
    classes: PropTypes.string,
}
GovBlock.defaultProps = {
    classes: '',
}

export default withRouter(GovBlock)
