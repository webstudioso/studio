/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER, SET_EDITOR } from 'store/actions'
import { showError, showSuccess } from 'utils/snackbar'
import { useIntl } from 'react-intl'
import grapesjs from 'grapesjs'
import PluginScriptEditor from '@auth0/auth0-spa-js'
import PageManager from './Plugins/PageManager'
import PluginEditorPanelButtons from './Panel/Buttons'

import TextBlocks from '../blocks/text'
import ImageBlocks from '../blocks/images'
import VideoBlocks from '../blocks/video'
import ButtonBlocks from '../blocks/buttons'
import ToastBlocks from '../blocks/toast'

import ButtonWeb3 from '../blocks/button-web3'
import SectionTokenGated from '../blocks/section-token-gated'

import Upgrade from './Upgrade'
// import SmartLabel from '../blocks/smart-label'

// import ScriptEditor from 'grapesjs-script-editor'

// Primitives
// import WSMWalletConnect from 'wsm-wallet-connect'
import WSMForm from 'wsm-form'
import WSMTailwind from 'wsm-tailwind'
// import WSMAnimations from 'wsm-animations'
import WSMFonts, { WSMFontStyles } from 'wsm-fonts'
import constants from 'constant'
import { hasPremiumSubscription } from 'utils/user'
import { enableContextMenu } from './Utils'
import { bringToFront, moveToBack } from 'utils/properties'
const { EVENTS } = constants

const Editor = ({ project, principal }) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const projectEndpoint = `${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${project.id}/content`
	const account = useSelector((state) => state.account)

  const loadEditor = () => {

    // Handle tailwind's use of slashes in css names
    const escapeName = (name) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, "-")

    const editor = grapesjs.init({
      container: "#gjs",
      // dragMode: 'absolute',
      height: "100vh",
      width: "100%",
      allowScripts: 1,
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
        PluginEditorPanelButtons,
        PluginScriptEditor,
        PageManager,
        // WSMAnimations,
        WSMFonts,
        TextBlocks,
        ButtonBlocks,
        ImageBlocks,
        VideoBlocks,
        ToastBlocks,
        WSMTailwind,
        ButtonWeb3,
        WSMForm,
        SectionTokenGated
      ],
      pluginsOpts: {
        [SectionTokenGated]: { isPremiumMember: hasPremiumSubscription(account) }
      },
      canvas: {
        scripts: [
          "https://cdn.jsdelivr.net/npm/webstudio-sdk@0.0.28/dist/main.min.js",
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
      deviceManager: {
        devices: [
            {
                name: 'Desktop',
            },
            {
                name: 'Tablet',
                width: '768px',
            },
            {
                name: 'Mobile portrait',
                width: '375px',
            }
        ]
      }
    })

    // Storage events
    editor.on('storage:start:load', () => {
      dispatch({ type: LOADER, show: true })
    });

    editor.on('storage:end:load', () => {
      dispatch({ type: LOADER, show: false })
    });

    editor.on('storage:error', (e) => {
      console.log(e)
      dispatch({ type: LOADER, show: false })
      showError({ dispatch, message: intl.formatMessage({id:'action.auto_saved_error'})})
    });

    editor.on('storage:store', () => {
      dispatch({ type: LOADER, show: false })
      showSuccess({ dispatch, message: intl.formatMessage({id:'action.auto_saved'})})
    })

    editor.on('component:selected', (component) => {
      // console.log(some, argument);
      const commandToAdd = 'tlb-settings'
      const defaultToolbar = component.get('toolbar')
      const commandExists = defaultToolbar.some(item => item.command === commandToAdd)

      component.set('resizable', true)
      // if it doesn't already exist, add it
      if (!commandExists) {
        component.set({
          toolbar: [ ...defaultToolbar, 
            {  
              attributes: { title: "Bring to front" },
              command: bringToFront,
              label: `
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-up" width="20" height="20" viewBox="0 0 24 24" stroke-width="0.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M7 11l5 -5l5 5" />
                  <path d="M7 17l5 -5l5 5" />
                </svg>
              `
            },
            {  
              attributes: { title: "Move to back" },
              command: moveToBack,
              label: `
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-down" width="20" height="20" viewBox="0 0 24 24" stroke-width="0.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M7 7l5 5l5 -5" />
                  <path d="M7 13l5 5l5 -5" />
                </svg>
              `
            },
            {  
              attributes: { title: "Edit" },
              command: commandToAdd,
              label: `
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3b97e2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                </svg>
              `
            }
          ]
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
      const ed = document.getElementById('gjs')
      ed.classList.remove('gjs-preview')
      ed.classList.add('gjs-no-preview')
    })

    // For enabling premium blocks
    // editor.on("block:drag:start", (element) => {
    //     const isPremiumFeature = !!element?.attributes?.premium
    //     const isPremiumMember = hasPremiumSubscription(account)
    //     console.debug(`Is premium member ${isPremiumMember} is premium block ${isPremiumFeature}`)
    //     if (isPremiumFeature && !isPremiumMember) {
    //         console.debug('Interrupting...')
    //         setShowUpgradeModal(true)
    //     }
    // })

    editor.on("canvas:drop", (event, element) => {
      // Open payload wizard
      const hasWizard = element?.getTrait('payload')
      if (hasWizard) {
        editor.select(element)
        editor.runCommand('tlb-settings', { element })
      }
      // Open image selector
      const isImage = element?.attributes?.type === 'image'
      if (isImage) {
        editor.select(element)
        document.dispatchEvent(new CustomEvent(EVENTS.TOGGLE_ASSETS_MODAL))
      }
    })

    // Disable ContextMenu and open Block Edit panel on right click
    enableContextMenu(editor)

    dispatch({ type: SET_EDITOR, editor })

    // Load custom fonts in the platform as well 
    WSMFontStyles.forEach((url) => {
      var fontImport = document.createElement("link");
      fontImport.rel = "stylesheet";
      fontImport.type = "text/css";
      fontImport.href = url;
      document.getElementsByTagName("head")[0].appendChild(fontImport)
    })

  }

  const togglePremiumModal = () => {
      const newState = !showUpgradeModal
      console.debug(`Toggling premium modal to ${newState}`)
      setShowUpgradeModal(newState)
  }



  useEffect(() => {
    loadEditor()

    document.addEventListener(EVENTS.TOGGLE_PREMIUM_MODAL, togglePremiumModal)
    return () => document.removeEventListener(EVENTS.TOGGLE_PREMIUM_MODAL, togglePremiumModal)

  }, [])

  return (
    <div>
      <div id="gjs" className="gjs-no-preview" />
      <Upgrade open={showUpgradeModal} onClose={togglePremiumModal} />
    </div>
  )
}

export default Editor
