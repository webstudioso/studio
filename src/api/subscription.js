import axios from 'axios'

export const getSubscription = async ({ email }) => {
    let subscription;
    try {
        console.log(process.env.REACT_APP_WIX_SUBSCRIPTION_ENDPOINT)
        const response = await axios.get(`${process.env.REACT_APP_WIX_SUBSCRIPTION_ENDPOINT}${email}`)
        subscription = response?.data
    } catch (e) {
        console.log(e)
    }

    return subscription
}
