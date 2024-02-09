import axios from 'axios'

export const uploadPagesToIPFS = async ({ pages }) => {
    const upload = await axios.post('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
        pages,
        {
            headers: {
                "X-API-KEY": process.env.REACT_APP_MORALIS_API_KEY,
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
    )
    return upload?.data
}

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