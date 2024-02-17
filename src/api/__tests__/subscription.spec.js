import { getSubscription } from 'api/subscription';
import axios from 'axios'

jest.mock('axios')

describe('Subscription api', () => {

    const email = 'username@domain.com'
    const wixUrl = 'https://wixUrl.com'

    process.env.REACT_APP_WIX_SUBSCRIPTION_ENDPOINT = wixUrl

    beforeAll(() => {
        axios.get.mockImplementation(() => Promise.resolve({ data: 'test_premium' }));
    })

    describe('getSubscription', () => {

        it('Invoke a get call with email to obtain a subscription', async () => {
            const subscription = await getSubscription({ email })
            expect(axios.get).toHaveBeenCalledWith(`${wixUrl}${email}`)
            expect(subscription).toEqual('test_premium')
        })

        it('Returns empty is call fails', async () => {
            axios.get.mockImplementation(() => Promise.reject({ data: 'error' }));
            const subscription = await getSubscription({ email })
            expect(axios.get).toHaveBeenCalledWith(`${wixUrl}${email}`)
            expect(subscription).toBe(undefined)
        })
    })
})