import React from 'react'
import '../../../config/test-config'
import { assert } from 'chai'
import AlertDialog from '../index'
import { mountWithIntl } from '../../../config/intl-enzyme-test-helper'

describe('<AlertDialog />', () => {
    const handleClose = () => {
        console.log('handle close event')
    }
    let wrapper
    beforeEach(() => {
        wrapper = mountWithIntl(<AlertDialog handleClose={handleClose} />)
    })
    it('allows us to set props', () => {
        assert(wrapper.props().handleClose, handleClose, 'handle close is true')
        wrapper.setProps({ handleClose: () => {} })
        assert(wrapper.props().handleClose, () => {}, 'handle close is settled')
    })
    it('get the default props', () => {
        assert.deepEqual(
            wrapper.props().actions,
            { show: false, element: '' },
            '=== actions default props'
        )
        assert.deepEqual(
            wrapper.props().header,
            { show: false, element: '' },
            '=== header default props'
        )
        assert.isNull(wrapper.props().content, '=== content default props')
        assert.deepEqual(
            wrapper.props().body,
            { show: false, element: '' },
            '=== body default props'
        )
    })
})
