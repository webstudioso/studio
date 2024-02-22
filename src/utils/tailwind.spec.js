import { escapeName } from './tailwind'

describe('tailwind utils', () => {

    describe('escapeName', () => {

        it('Handle tailwind use of slashes in css names', () => {
            expect(escapeName('md:w-1/3')).toEqual('md:w-1/3')
        })
    })

})