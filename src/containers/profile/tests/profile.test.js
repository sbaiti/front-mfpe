import React from 'react'
import '../../../config/test-config'
import { expect } from 'chai'
import CardInfo from '../cardInfo'
import { mountWithIntl } from '../../../config/intl-enzyme-test-helper'

describe('<CardInfo />', () => {
    it('allows us to set props', () => {
        const wrapper = mountWithIntl(<CardInfo nom="baz" />)
        expect(wrapper.props().nom).to.have.string('baz')
        wrapper.setProps({ nom: 'foo' })
        expect(wrapper.props().nom).to.equal('foo')
    })
})
