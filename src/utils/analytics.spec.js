import { trackEvent } from './analytics'

describe('analytics utils', () => {

    let name, params
    beforeAll(() => {
        window.gtag = jest.fn()
        name = 'demo'
        params = { a: 1, b: 'c' }
    })

    describe('trackEvent', () => {

        it('does not emit events in dev', () => {
            process.env.REACT_APP_HOST_ENV = 'dev'
            trackEvent({ name, params })
            expect(window.gtag).not.toHaveBeenCalled()
        })

        it('emits events in production', () => {
            process.env.REACT_APP_HOST_ENV = 'prod'
            trackEvent({ name, params })
            expect(window.gtag).toHaveBeenCalledWith('event', name, params)
        })
    })

})