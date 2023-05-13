import constants from 'constant'
const { SUBSCRIPTION_PLAN } = constants

export const getSubscriptionPlan = () => {
    return localStorage.getItem(SUBSCRIPTION_PLAN)
}

export const setSubscriptionPlan = (plan) => {
    if (plan) {
        localStorage.setItem(SUBSCRIPTION_PLAN, plan)
    }
}

export const isUnlimited = () => {
    return !!getSubscriptionPlan()
}