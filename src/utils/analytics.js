export const trackEvent = ({ name, params }) => {
    window?.gtag('event', name, params)
}