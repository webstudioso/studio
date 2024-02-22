import '@testing-library/jest-dom'
import React from 'react'

global.React = React

jest.mock('wsm-fonts', () => ({ WSMFontStyles: [] }))

jest.mock('react-intl', () => {
    const reactIntl = jest.requireActual('react-intl')
    const intl = reactIntl.createIntl({
      locale: 'en',
    });
  
    return {
      ...reactIntl,
      useIntl: () => intl,
    }
})

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}))