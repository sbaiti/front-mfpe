/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react'
import { Container } from '@material-ui/core'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import MethodDraw from '../../ui/methodDraw'
import attestation from '../../../assets/icons/methodDraw/attestation.svg'
import emploi from '../../../assets/icons/methodDraw/emploi.svg'
import formation from '../../../assets/icons/methodDraw/formation.svg'
import projet from '../../../assets/icons/methodDraw/projet.svg'
import sociaux from '../../../assets/icons/methodDraw/sociaux.svg'
import region from '../../../assets/icons/methodDraw/region.svg'

class ContentBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: -1,
            selectedIndex: '',
        }
    }

    componentDidMount() {
        this.timerHandle = setTimeout(() => {
            this.setState({
                value: 1,
                selectedIndex: `selected-1`,
            })
        }, 3500)
    }

    componentWillUnmount() {
        clearTimeout(this.timerHandle)
    }

    handleClick = event => {
        const { wheelClicked } = this.props
        if (event.target.tabIndex < 0) {
            return
        }
        this.setState({
            value: event.target.tabIndex,
            selectedIndex: `selected-${event.target.tabIndex}`,
        })
        wheelClicked(event.target.tabIndex)
    }

    render() {
        const { value, selectedIndex } = this.state
        const { classes, showPanel, buttonClicked } = this.props
        return (
            <Container
                maxWidth="sm"
                className={`${classes} d-flex flex-column justify-content-between h-100`}
            >
                <div className="w-100 p-2">
                    <MethodDraw
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 560.8 610.7"
                        style={{ enableBackground: 'new 0 0 530.8 610.7' }}
                        xmlSpace="preserve"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="none"
                        onClick={this.handleClick}
                        className={`method-draw ${selectedIndex}`}
                    />
                </div>
                {showPanel && (
                    <Fragment>
                        <ContentPanel
                            value={value}
                            index={0}
                            image={formation}
                            buttonClicked={buttonClicked}
                        >
                            <FormattedMessage id="ItemOne" />
                        </ContentPanel>
                        <ContentPanel
                            value={value}
                            index={1}
                            image={region}
                            buttonClicked={buttonClicked}
                        >
                            <FormattedMessage id="ItemTwo" />
                        </ContentPanel>
                        <ContentPanel
                            value={value}
                            index={2}
                            image={sociaux}
                            buttonClicked={buttonClicked}
                        >
                            <FormattedMessage id="ItemThree" />
                        </ContentPanel>
                        <ContentPanel
                            value={value}
                            index={3}
                            image={emploi}
                            buttonClicked={buttonClicked}
                        >
                            <FormattedMessage id="ItemFour" />
                        </ContentPanel>
                        <ContentPanel
                            value={value}
                            index={4}
                            image={attestation}
                            buttonClicked={buttonClicked}
                        >
                            <FormattedMessage id="ItemFive" />
                        </ContentPanel>
                        <ContentPanel
                            value={value}
                            index={5}
                            image={projet}
                            buttonClicked={buttonClicked}
                        >
                            <FormattedMessage id="ItemSix" />
                        </ContentPanel>
                    </Fragment>
                )}
            </Container>
        )
    }
}
export function ContentPanel(props) {
    const {
        children,
        value,
        index,
        image,
        content,
        showButton,
        buttonClicked,
        ...other
    } = props

    return (
        <div
            className="content-panel w-100 p-2 text-white"
            hidden={value !== index}
            id={`simple-ContentPanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <div className="d-flex">
                <img src={image} alt="icon" width="35" />
                <h6 className="text-primary font-weight-bolder ml-2 my-auto">
                    {children}
                </h6>
            </div>
            <p>{content}</p>
            {showButton && (
                <Button
                    size="medium"
                    variant="contained"
                    color="secondary"
                    className="d-block mx-auto"
                    onClick={() => buttonClicked(value)}
                >
                    <FormattedMessage id="consult" />
                </Button>
            )}
        </div>
    )
}
ContentPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    image: PropTypes.any.isRequired,
    content: PropTypes.any,
    showButton: PropTypes.bool,
    buttonClicked: PropTypes.func,
}
ContentPanel.defaultProps = {
    showButton: true,
    buttonClicked: () => {},
    children: '',
    content: <FormattedMessage id="lorem" />,
}
ContentBlock.propTypes = {
    wheelClicked: PropTypes.func,
    classes: PropTypes.string,
    showPanel: PropTypes.bool,
    buttonClicked: PropTypes.func,
}
ContentBlock.defaultProps = {
    wheelClicked: () => {},
    buttonClicked: () => {},

    classes: '',
    showPanel: true,
}

export default ContentBlock
