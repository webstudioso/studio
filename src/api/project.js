import axios from 'axios'

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

export const deleteProject = async({ projectId, principal }) => {
    const responseProject = await axios.delete(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${projectId}`,
        {
            headers: {
                "AuthorizeToken": `Bearer ${principal}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    )
    return responseProject?.data
}

export const publishMetadata = async({ id, principal, metadata }) => {
    const meta = await axios.post(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${id}/metadata`,
      metadata,
      {
          headers: {
              "AuthorizeToken": `Bearer ${principal}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      }
    )
    return meta?.data
}