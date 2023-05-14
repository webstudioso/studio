import axios from 'axios'

export const getSubscription = async ({ email }) => {
    let subscription;
    try {
        const response = await axios.get(`${process.env.REACT_APP_WIX_SUBSCRIPTION_ENDPOINT}${email}`)
        subscription = response?.data
    } catch (e) {
        console.log(e)
    }

    return subscription
}
