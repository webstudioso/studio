export const trackEvent = ({ name, params }) => {
    if (process.env.REACT_APP_HOST_ENV !== 'dev') {
        window?.gtag('event', name, params)
    }
}