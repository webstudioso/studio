import { truncate } from './format'

describe('format utils', () => {

    describe('truncate', () => {

        it('does not truncate if limit is higher than character length', () => {
            expect(truncate('this is a demo', 50)).toEqual('this is a demo')
        })

        it('does truncate if limit is less than character length and also removes white spaces', () => {
            expect(truncate('this is a demo', 5)).toEqual('this...')
        })
    })

})