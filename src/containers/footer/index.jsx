/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Grid } from '@material-ui/core'
import './footer.css'
import { FormattedMessage } from 'react-intl'
import Email from '@material-ui/icons/Email'
import Place from '@material-ui/icons/Place'
import Phone from '@material-ui/icons/Phone'
import Public from '@material-ui/icons/Public'
import LocalPrintshop from '@material-ui/icons/LocalPrintshop'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import giz from '../../assets/images/giz.png'

import FacebookIcon from '../../assets/icons/facebook2.svg'
import TwitterIcon from '../../assets/icons/twitter2.svg'
import YouTubeIcon from '../../assets/icons/youtube2.svg'

class Footer extends React.Component {
    static propTypes = {
        language: PropTypes.string.isRequired,
    }

    render() {
        const { language } = this.props
        return (
            <footer className="footer pt-2'">
                <p className="hr"></p>
                <Grid container>
                    <Grid item xs={12} sm={6} md={3}>
                        <div
                            className={`paper first ${language === 'ar' &&
                                'paper-ar '}`}
                        >
                            <p>
                                <Place className="iconFooter" />
                                <a
                                    style={{ whiteSpace: 'initial' }}
                                    target="blank"
                                    href="https://goo.gl/maps/AcaDJ4zp5V7cRMecA"
                                >
                                    <FormattedMessage id="mfpeAddress" />
                                </a>
                            </p>
                            <p>
                                <Phone className="iconFooter" />
                                <a
                                    href="tel:71798196"
                                    target="_top"
                                    style={{ direction: 'ltr' }}
                                >
                                    71 798 196
                                </a>
                                <span style={{ margin: '0 5px' }}> - </span>
                                <a
                                    href="tel:71791331"
                                    target="_top"
                                    style={{ direction: 'ltr' }}
                                >
                                    71 791 331
                                </a>
                            </p>
                            <p>
                                <LocalPrintshop className="iconFooter" />
                                <a
                                    href="#"
                                    target="_top"
                                    style={{ direction: 'ltr' }}
                                >
                                    71 794 615
                                </a>
                            </p>
                            <p>
                                <Email className="iconFooter" />
                                <a
                                    href="mailto:webmaster@mfpe.gov.tn"
                                    target="_top"
                                >
                                    webmaster@mfpe.gov.tn
                                </a>
                            </p>
                            <p>
                                <Public className="iconFooter" />
                                <a href="http://www.mfpe.gov.tn" target="blank">
                                    www.mfpe.gov.tn
                                </a>
                            </p>
                        </div>
                        <p className="hr"></p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <div
                            className={`paper ${language === 'ar' &&
                                'paper-ar '}`}
                        >
                            <p style={{ textAlign: 'center' }}>
                                <label>
                                    <FormattedMessage id="usefulLinks" />
                                </label>
                            </p>
                            <p>
                                <a href="www.emploi.nat.tn" target="blank">
                                    www.emploi.nat.tn
                                </a>
                            </p>
                            <p>
                                <a href="http://www.atfp.tn" target="blank">
                                    www.atfp.tn
                                </a>
                            </p>
                            <p>
                                <a href="http://www.cnfcpp.tn" target="blank">
                                    www.cnfcpp.tn
                                </a>
                            </p>
                            <p>
                                <a
                                    href="http://www.cenaffif.nat.tn"
                                    target="blank"
                                >
                                    www.cenaffif.nat.tn
                                </a>
                            </p>
                        </div>
                        <p className="hr"></p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <div
                            className={`paper first-sm ${language === 'ar' &&
                                'paper-ar '}`}
                        >
                            <p style={{ textAlign: 'center' }}>
                                <label>
                                    <FormattedMessage id="followUs" />
                                </label>
                            </p>
                            <p>
                                <a href="#" style={{ display: 'flex' }}>
                                    <img
                                        alt="Facebook"
                                        style={{
                                            height: 38,
                                            marginTop: '-6px',
                                        }}
                                        src={FacebookIcon}
                                    />
                                    jiha tunisie
                                </a>
                            </p>
                            <p>
                                <a href="#" style={{ display: 'flex' }}>
                                    <img
                                        alt="Twitter"
                                        style={{
                                            height: 38,
                                            marginTop: '-6px',
                                        }}
                                        src={TwitterIcon}
                                    />
                                    jiha tunisie
                                </a>
                            </p>
                            <p>
                                <a href="#" style={{ display: 'flex' }}>
                                    <img
                                        alt="YouTube"
                                        style={{
                                            height: 38,
                                            marginTop: '-6px',
                                        }}
                                        src={YouTubeIcon}
                                    />
                                    jiha tunisie
                                </a>
                            </p>
                        </div>
                        <p className="hr"></p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <div
                            className={`paper ${language === 'ar' &&
                                'paper-ar '}`}
                            style={{ textAlign: 'center' }}
                        >
                            <p>
                                <label>
                                    <FormattedMessage id="partnershipWith" />
                                </label>
                            </p>
                            <img src={giz} alt="التعاون الالماني" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <p
                            style={{
                                textAlign: 'center',
                                color: 'white',
                                margin: '5px 0',
                            }}
                        >
                            &copy; {new Date().getFullYear()} MFPE.
                            <FormattedMessage id="allRightsReserved" /> -
                            <a
                                href="#"
                                target="blank"
                                style={{ color: 'white' }}
                            >
                                <FormattedMessage id="legalNotice" />
                            </a>
                        </p>
                    </Grid>
                </Grid>
            </footer>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.info.language,
    }
}

export default connect(
    mapStateToProps,
    null
)(Footer)
