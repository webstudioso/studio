import axios from 'axios';

export const notifyDiscordWebhook = async ({
    username,
    avatar_url,
    content,
    name,
    title,
    url,
    color,
    issuer,
    subdomain,
    image
}) => {
    if (process.env.REACT_APP_HOST_ENV === 'dev') return
    return await axios.post(
        process.env.REACT_APP_DISCORD_WEBHOOK,
        {
            username,
            avatar_url,
            content,
            embeds: [{
                author: {
                    name
                },
                image: {
                    url: image,
                },
                title,
                url,
                color,
                fields: [
                    {
                        name: "User",
                        value: issuer
                    },
                    {
                        name: "Subdomain",
                        value: subdomain
                    },
                ]
            }]
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}