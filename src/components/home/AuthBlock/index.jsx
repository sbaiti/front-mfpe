import React from 'react'
import { Container } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import Presentation from '../../../assets/images/presentation.png'
import CitizenAccessForm from '../../forms/citizenAccessForm'
import Guarantee from '../../../assets/icons/guarantee.svg'

class AuthBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Container maxWidth="sm" className="py-3">
                <div className="d-inline-flex w-100">
                    <img
                        className="mx-2"
                        width="50px"
                        alt="guarante"
                        src={Guarantee}
                    />
                    <h5 className="text-secondary">
                        <FormattedMessage id="certificateJustifyingTitle" />
                    </h5>
                </div>
                <b>
                    <FormattedMessage id="lorem" />
                </b>
                <div className="p-3">
                    <img
                        alt="Presentation"
                        src={Presentation}
                        className="img-fluid"
                    />
                </div>
                <CitizenAccessForm />
            </Container>
        )
    }
}

export default AuthBlock
