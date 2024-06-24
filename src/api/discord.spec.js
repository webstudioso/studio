import { notifyDiscordWebhook } from 'api/discord';
import axios from 'axios'

jest.mock('axios')

describe('Discord api', () => {

    const username = 'username'
    const avatar_url = 'https://avatar.com'
    const content = 'What is it about'
    const name = 'name'
    const title = 'topic'
    const url = 'https://mywebsite.com'
    const color = 123456
    const issuer = 'id:123'
    const subdomain = 'myproject'
    const image = 'https://myimage.com'
    const hookUrl = 'https://hookurl.com'

    process.env.REACT_APP_DISCORD_WEBHOOK = hookUrl

    beforeAll(() => {
        axios.post.mockImplementation(() => Promise.resolve({ data: {} }));
    })

    describe('notifyDiscordWebhook', () => {
        it('Does not invoke webhook in non prod envs', async () => {
            process.env.REACT_APP_HOST_ENV = 'dev'
            notifyDiscordWebhook({
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
            })
            expect(axios.post).not.toHaveBeenCalled()
        })

        it('Invoke a post call with specific payload', async () => {
            process.env.REACT_APP_HOST_ENV = 'prod'
            notifyDiscordWebhook({
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
            })
            expect(axios.post).toHaveBeenCalledWith(hookUrl, {
                avatar_url: 'https://avatar.com', 
                content: 'What is it about', 
                embeds: [{
                    author: {
                        name: 'name'
                    }, 
                    color: 123456, 
                    fields: [{
                        name: 'User', 
                        value: 'id:123'
                    }, {
                        name: 'Subdomain', 
                        value: 'myproject'
                    }], 
                    image: {
                        url: 'https://myimage.com'
                    }, 
                    title: 'topic', 
                    url: 'https://mywebsite.com'
                }], 
                username: 'username'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
        })

        it('Referral information is included if added', async () => {
            process.env.REACT_APP_HOST_ENV = 'prod'
            const referral = 'demonoid'
            notifyDiscordWebhook({
                username,
                avatar_url,
                content,
                name,
                title,
                url,
                color,
                issuer,
                subdomain,
                image,
                referral
            })
            expect(axios.post).toHaveBeenCalledWith(hookUrl, {
                avatar_url: 'https://avatar.com', 
                content: 'What is it about', 
                embeds: [{
                    author: {
                        name: 'name'
                    }, 
                    color: 123456, 
                    fields: [{
                        name: 'User', 
                        value: 'id:123'
                    }, {
                        name: 'Subdomain', 
                        value: 'myproject'
                    }, {
                        name: 'Referral', 
                        value: 'demonoid'
                    }], 
                    image: {
                        url: 'https://myimage.com'
                    }, 
                    title: 'topic', 
                    url: 'https://mywebsite.com'
                }], 
                username: 'username'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
        })
    })
})