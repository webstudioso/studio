import axios from "axios";

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
    console.log(project)
    return project?.data

}