import axios from 'axios'
import { getUrlWithoutProtocol } from 'utils/url'

export const getProjectById = async ({ projectId, principal }) => {
    const project = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${projectId}`,
        {
            headers: {
            "AuthorizeToken": `Bearer ${principal}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
            }
        }
    )
    return project?.data
}

export const getAllProjects = async({ principal }) => {
    const list = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project`,
        {
            headers: {
                "AuthorizeToken": `Bearer ${principal}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    )
    return list?.data
}

export const createProject = async({ appData, principal }) => {
    const project = await axios.post(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${appData.subdomain}`,
        appData,
        {
            headers: {
                "AuthorizeToken": `Bearer ${principal}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    )
    return project?.data
}

export const deleteProject = async({ project, principal }) => {
    // Delete project and existing route
    let action;
    try {
        const responseProject = await axios.delete(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${project.id}`,
            {
                headers: {
                    "AuthorizeToken": `Bearer ${principal}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        )
        action = responseProject?.data
    } catch (e) {
        console.log(e)
    }

    try {
        // Delete custom domains e.g mydomain.com
        if (project.domain) {
            await axios.delete(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/route/${project.domain}`,
                {
                    headers: {
                        "AuthorizeToken": `Bearer ${principal}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            )
        }
    } catch (e) {
        console.log(e)
    }

    try {
        // Delete Webstudio subdomain
        const webstudioUrl = getUrlWithoutProtocol(project.subdomain)
        await axios.delete(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/route/${webstudioUrl}`,
            {
                headers: {
                    "AuthorizeToken": `Bearer ${principal}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        )
    } catch (e) {
        console.log(e)
    }

    return action
}