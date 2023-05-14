import { LOADER } from "store/actions";
import { showError, showSuccess } from "utils/snackbar";
const { getProjectUrl } = require("utils/project");

export const requestNewDomain = async (dispatch, user, domain, project) => {
    try {
        dispatch({ type: LOADER, show: true });
        const payload = {
            "username": "Webhook",
            "avatar_url": "https://i.ibb.co/9s3x1YJ/Transparent-modified.png",
            "content": "Request setup for custom domain",
            "embeds": [
              {
                "author": {
                  "name": user.email
                },
                "title": domain,
                "url": getProjectUrl({ project }),
                "color": 15258703,
                "fields": [
                  {
                    "name": "User",
                    "value": user.issuer,
                    "inline": true
                  },
                  {
                    "name": "Subdomain",
                    "value": project.subdomain,
                    "inline": true
                  },
                ]
              }
            ]
          }

        const options = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(process.env.REACT_APP_DISCORD_WEBHOOK, options)
            .then((response) => response.json());
        
        const message = 'Request submitted, the team will contact you within 48 hours to your email'
        showSuccess({ dispatch, message })
    } catch (error) {
        showError({ dispatch, error })
    } finally {
        dispatch({ type: LOADER, show: false });
    }
}