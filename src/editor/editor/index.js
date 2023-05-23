/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LOADER, SET_EDITOR } from 'store/actions'
import { showError, showSuccess } from 'utils/snackbar'
import { useIntl } from 'react-intl'
import grapesjs from 'grapesjs'
import PluginTailwind from 'grapesjs-tailwind'
import PluginScriptEditor from '@auth0/auth0-spa-js'
import PageManager from './Plugins/PageManager'
import PluginEditorPanelButtons from './Panel/Buttons'

import TextBlocks from '../blocks/text'
import ImageBlocks from '../blocks/images'
import VideoBlocks from '../blocks/video'
import ButtonBlocks from '../blocks/buttons'
import ToastBlocks from '../blocks/toast'
import Web3Button from '../blocks/web3-button'

// Primitives
import WSMForm from 'wsm-form'
import WSMWalletConnect from 'wsm-wallet-connect'
import WSMAnimations from 'wsm-animations'
import WSMFonts, { WSMFontStyles } from 'wsm-fonts'
import constants from 'constant'
const { EVENTS } = constants

const Editor = ({ project, principal }) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const projectEndpoint = `${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${project.id}/content`

  const loadEditor = () => {

    // Handle tailwind's use of slashes in css names
    const escapeName = (name) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, "-")

    const editor = grapesjs.init({
      container: "#gjs",
      height: "100vh",
      width: "100%",
      fromElement: true,
      selectorManager: { escapeName },
      pageManager: true, // This should be set to true
      assetManager: {
        custom: {
          open(props) {
            document.dispatchEvent(new CustomEvent(EVENTS.TOGGLE_ASSETS_MODAL))
          },
          close(props) {
          },
        }
      },
      storageManager:  {
        type: 'remote',
        autosave: true, // Store data automatically
        autoload: true, // Autoload stored data on init
        stepsBeforeSave: 1, 
        options: {
          remote: {
            headers: {
              AuthorizeToken: `Bearer ${principal}`
            },
            urlLoad: projectEndpoint,
            urlStore: projectEndpoint,
            onStore: data => ({ id: project.id, data }),
            onLoad: result => result.data,
          }
        }
      },
      panels: { defaults: [] },
      plugins: [
        Web3Button,
        PluginEditorPanelButtons,
        PluginScriptEditor,
        PageManager,
        WSMAnimations,
        WSMFonts,
        TextBlocks,
        ButtonBlocks,
        ImageBlocks,
        VideoBlocks,
        // WSMForm,
        WSMWalletConnect,
        ToastBlocks,
        // PluginTailwind
      ],
      pluginsOpts: {},
      canvas: {
        scripts: [
          "https://cdn.jsdelivr.net/npm/webstudio-sdk@0.0.6/dist/main.min.js",
          "https://cdn.tailwindcss.com",
          "https://code.jquery.com/jquery-3.6.1.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js",
        ],
        // The same would be for external styles
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
          ...WSMFontStyles
        ],
      },
    })

    // Storage events
    editor.on('storage:error', (e) => {
      console.log(e)
      dispatch({ type: LOADER, show: false })
      showError({ dispatch, message: intl.formatMessage({id:'action.auto_saved_error'})})
    });

    editor.on('storage:store', () => {
      dispatch({ type: LOADER, show: false })
      showSuccess({ dispatch, message: intl.formatMessage({id:'action.auto_saved'})})
    })

    editor.on('component:selected', () => {
      const commandToAdd = 'tlb-settings'
      const selectedComponent = editor.getSelected()
      const defaultToolbar = selectedComponent.get('toolbar')
      const commandExists = defaultToolbar.some(item => item.command === commandToAdd)

      // if it doesn't already exist, add it
      if (!commandExists) {
        selectedComponent.set({
          toolbar: [ ...defaultToolbar, {  
            attributes: {
            // class: commandIcon
            }, 
            command: commandToAdd,
            label: `
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3b97e2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
              </svg>
            `
          }]
        })
      }
    })

    editor.on("run:preview",() => {
      console.log('Preview')
      const ed = document.getElementById('gjs')
      ed.classList.remove('gjs-no-preview')
      ed.classList.add('gjs-preview')
    })

    editor.on("stop:preview", () => {
      console.log('Preview Dismiss')
      const ed = document.getElementById('gjs')
      ed.classList.remove('gjs-preview')
      ed.classList.add('gjs-no-preview')
    })

    dispatch({ type: SET_EDITOR, editor })
  }

  useEffect(() => {
    loadEditor()
  }, [])

  return (<div id="gjs" className="gjs-no-preview" />)
}

export default Editor
