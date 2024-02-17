import axios from 'axios'

export const publishRouting = async ({ id, cid, principal }) => {
    const routing = await axios.post(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/route/${id}`,
      { id, cid },
      {
        headers: {
          "AuthorizeToken": `Bearer ${principal}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
    )
    return routing?.data
}

export const getRoute = async ({ id, principal }) => {
  const routing = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/route/${id}`,
    {
      headers: {
        "AuthorizeToken": `Bearer ${principal}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
  )
  return routing?.data
}

export const deleteRoute = async ({ id, principal }) => {
  const routing = await axios.delete(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/route/${id}`,
    {
        headers: {
            "AuthorizeToken": `Bearer ${principal}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
  )
  return routing?.data
}