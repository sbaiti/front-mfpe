import React from 'react'
import ErrorBoundary from '../index'
import '../../../config/test-config'
import { mountWithIntl } from '../../../config/intl-enzyme-test-helper'

const Something = () => null

describe('ErrorBoundary', () => {
    it('should display an ErrorMessage if wrapped component throws', () => {
        const wrapper = mountWithIntl(
            <ErrorBoundary>
                <Something />
            </ErrorBoundary>
        )

        const error = new Error('test')

        wrapper.find(Something).simulateError(error)
    })
})
