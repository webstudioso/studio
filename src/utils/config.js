import { UPDATE_APP } from 'store/actions';

export const setField = (dispatch, state, field, value) => {
    const current = state;
    current[field] = value;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setImage = (dispatch, state, field, value) => {
    const current = state;
    current.images[field] = value;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setBoolean = (dispatch, state, field, enabled) => {
    const current = state;
    current[field] = enabled;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setColor = (dispatch, state, field, value) => {
    const current = state;
    current[field] = value.hex;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setMoralis = (dispatch, state, field, value) => {
    const current = state;
    if (!current.moralis) current.moralis = {};
    current.moralis[field] = value;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setSocial = (dispatch, state, field, value) => {
    const current = state;
    current.social[field] = value;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setFeature = (dispatch, state, field, enabled) => {
    const current = state;
    current.feature[field] = enabled;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setNetwork = (dispatch, state, network) => {
    const current = state;
    current.network = network;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const defaultConfiguration = {
    "appId": "",
    "name": "",
    "type": "",
    "description": "",
    "operator": "",
    "subdomain": "my-subdomain",
    "chainId": "0x1",
    "logo": "https://i.ibb.co/9yf7cgJ/output-onlinepngtools.png",
    "icon": "https://ipfs.io/ipfs/QmZXpF98YKFq5zvjNrzmkwocMJJTKX1UngDAgxVSndS11J",
    "theme": {
      "shape": {
         "borderRadius": 8
      }, 
      "palette": {
        "mode": "light",
        "primary": {
          "main": "#5e5fef"
        },
        "secondary": {
          "main": "#45b26b"
        },
        "contrastThreshold": 3,
        "tonalOffset": 0.2
      },
      "typography": {
        "button": {
          "textTransform": "none"
        }
      },
      "components": {
        "MuiButton": {
          "styleOverrides": {
            "root": {
              "borderRadius": 0
            }
          }
        }
      }
    },
    "social": {
      "facebook": "",
      "twitter": "",
      "instagram": "",
      "pinterest": "",
      "email": "",
      "telegram": ""
    },
    "footer": {
      "left": {
          "title": "Footer left column",
          "items": [
            { "title": "", "link": "" },
            { "title": "", "link": "" },
            { "title": "", "link": "" },
            { "title": "", "link": "" },
            { "title": "", "link": "" }
          ]
      },
      "center": {
        "title": "Footer center column",
        "items": [
          { "title": "", "link": "" },
          { "title": "", "link": "" },
          { "title": "", "link": "" },
          { "title": "", "link": "" },
          { "title": "", "link": "" }
        ]
      },
      "right": {
        "title": "Footer left right",
        "items": [
          { "title": "", "link": "" },
          { "title": "", "link": "" },
          { "title": "", "link": "" },
          { "title": "", "link": "" },
          { "title": "", "link": "" }
        ]
      }
    },
    "template": {
  
    }
};