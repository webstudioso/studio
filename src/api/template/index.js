import axios from 'axios'

export const publishTemplate = async({ id, preview, name, description, tags, content, principal }) => {
    const template = await axios.post(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/template/${id}`,
        {
            preview,
            name,
            description,
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
    const template = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/template`,
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