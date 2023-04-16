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
