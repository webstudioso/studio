import axios from 'axios'

export const publishTemplate = async({ id, preview, name, description, tags, documentation, demo, isPrivate, content, principal }) => {
    const template = await axios.post(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/template/${id}`,
        {
            preview,
            name,
            description,
            documentation,
            demo,
            isPrivate,
            tags,
            content
        },
        {
            headers: {
                "AuthorizeToken": `Bearer ${principal}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    )
    return template?.data
}

export const getTemplateById = async({ id, principal }) => {
    const template = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/template/${id}`,
        {
            headers: {
                "AuthorizeToken": `Bearer ${principal}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    )
    return template?.data
}

export const getTemplates = async({ principal }) => {
    const template = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/template?private=false&status=published`,
        {
            cache: true,
            headers: {
                "AuthorizeToken": `Bearer ${principal}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    )
    return template?.data
}

export const getMyTemplates = async({ principal, author }) => {
    const template = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/template?author=${author}`,
        {
            cache: true,
            headers: {
                "AuthorizeToken": `Bearer ${principal}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    )
    return template?.data
}