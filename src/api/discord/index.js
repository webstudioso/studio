import { LOADER } from 'store/actions'
import { showError, showSuccess } from 'utils/snackbar'
const { getProjectUrl } = require('utils/project');

export const getDiscordPayloadEmbeds = (user, project, domain, color) => {
  return [
    {
      author: {
        name: user.email
      },
      title: domain,
      url: getProjectUrl({ project }),
      color,
      fields: [
        {
          name: "User",
          value: user.issuer,
          inline: true
        },
        {
          name: "Subdomain",
          value: project.subdomain,
          inline: true
        },
      ]
    }
  ]
}

export const requestNewDomain = async (dispatch, user, domain, project) => {
    try {
        dispatch({ type: LOADER, show: true });
        const embeds = getDiscordPayloadEmbeds(user, project, domain, 15258703)
        const payload = {
            "username": "Webhook",
            "avatar_url": "https://i.ibb.co/9s3x1YJ/Transparent-modified.png",
            "content": "Request setup for custom domain",
            embeds
        }

        const options = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        }

        fetch(process.env.REACT_APP_DISCORD_WEBHOOK, options)
            .then((response) => response.json())
        
        const message = 'discord_event.custom_domain_request'
        showSuccess({ dispatch, message })
    } catch (error) {
        showError({ dispatch, error })
    } finally {
        dispatch({ type: LOADER, show: false })
    }
}

export const createNewProject = async (dispatch, user, domain, project) => {
  try {
      dispatch({ type: LOADER, show: true })
      const embeds = getDiscordPayloadEmbeds(user, project, domain, 14177041)
      const payload = {
          "username": "Webhook",
          "avatar_url": "https://i.ibb.co/9s3x1YJ/Transparent-modified.png",
          "content": "New project created",
          embeds
      }

      const options = {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
              "Content-Type": "application/json",
          },
      }
      fetch(process.env.REACT_APP_DISCORD_WEBHOOK, options)
          .then((response) => response.json())
      
      const message = 'discord_event.project_created'
      showSuccess({ dispatch, message })
  } catch (error) {
      showError({ dispatch, error })
  } finally {
      dispatch({ type: LOADER, show: false })
  }
}

export const publishProject = async (dispatch, user, domain, project) => {
  try {
      dispatch({ type: LOADER, show: true })
      const embeds = getDiscordPayloadEmbeds(user, project, domain, 12171071)
      const payload = {
          "username": "Webhook",
          "avatar_url": "https://i.ibb.co/9s3x1YJ/Transparent-modified.png",
          "content": "Project published",
          embeds
      }

      const options = {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
              "Content-Type": "application/json",
          },
      }
      fetch(process.env.REACT_APP_DISCORD_WEBHOOK, options)
          .then((response) => response.json())
      
      const message = 'discord_event.project_published'
      showSuccess({ dispatch, message })
  } catch (error) {
      showError({ dispatch, error })
  } finally {
      dispatch({ type: LOADER, show: false })
  }
}