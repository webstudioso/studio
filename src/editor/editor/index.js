/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
import Web3Button from '../blocks/web3-button'
import CustomCode from '../blocks/custom-code'
import DynamicList from '../blocks/dynamic-list'
// import SmartLabel from '../blocks/smart-label'

// import ScriptEditor from 'grapesjs-script-editor'

// Primitives
import WSMWalletConnect from 'wsm-wallet-connect'
import WSMForm from 'wsm-form'
import WSMTailwind from 'wsm-tailwind'
import WSMAnimations from 'wsm-animations'
import WSMFonts, { WSMFontStyles } from 'wsm-fonts'
import constants from 'constant'



// import script from '../blocks/button/script'


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
        WSMAnimations,
        WSMFonts,
        TextBlocks,
        ButtonBlocks,
        ImageBlocks,
        VideoBlocks,
        ToastBlocks,
        WSMTailwind,
        Web3Button,
        WSMWalletConnect,
        WSMForm,
        CustomCode,
        DynamicList
        // SmartLabel,
        // ScriptEditor
      ],
      pluginsOpts: {
        // [ScriptEditor]: {}
      },
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
      const ed = document.getElementById('gjs')
      ed.classList.remove('gjs-preview')
      ed.classList.add('gjs-no-preview')
    })

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

    const dc = editor.DomComponents;
    dc.addType('text', {

      model: {
        defaults: {

          traits: [
            ...dc.getType('text').model.prototype.defaults.traits,
            {
              label: 'Name',
              name: 'name',
              type: 'text'
            }
          ]
        }
      }

    })


    dc.addType('button', {

      model: {
        defaults: {
          endpoint: `https://cdukfsgim7.execute-api.us-east-1.amazonaws.com/generate`,
          body: `
            {
                "message": "$valx"
            }
            `,
          web3Signature: true,
          traits: [
            ...dc.getType('button').model.prototype.defaults.traits,
            {
              label: 'Endpoint',
              name: 'endpoint',
              type: 'text'
            },
            {
              label: 'Body',
              name: 'body',
              type: 'text'
            },
            {
              label: 'Web3 Signature',
              name: 'web3Signature',
              type: 'checkbox'
            }
          ],
          "script-props": ["endpoint", "body", "web3Signature"],
        }
      }
    });
    //   // view: {
    //   //   events: {
    //   //     click: 'send',
    //   //   },
  
    //   //   init() {

    //   //   },

    //   //   fetchAccountData: () => {
    //   //     console.log(window.ethers)
    //   //     const wallet = new window.ethers.providers.Web3Provider(window.walletProvider)
    //   //     const signer = wallet.getSigner()
    //   //     // return await signer.getAddress();
    //   //     return "aaaaa"
    //   //   },
    //   //   send: () => {
    //   //     const { attr } = this;
    //   //     const { endpoint, body } = attr;

    //   //     // em.get('Commands').run(commandNameCustomCode, { target: model });
    //   //     console.log("clicking")

    //   //     // // Replace body wildcards
    //   //     // let parsedBody = {}
    //   //     // Object.keys(body).forEach((key) => {
    //   //     //   if (body[key] === '$userAddress') {
    //   //     //     const addr = "a" //await this.fetchAccountData()
    //   //     //     parsedBody[key] = addr
    //   //     //   } else if (body[key] === '$signature') {
    //   //     //     const wallet = new window.ethers.providers.Web3Provider(window.walletProvider)
    //   //     //     let flatSig = "b" //await wallet.signMessage("123333");
    //   //     //     console.log(flatSig);
    //   //     //     parsedBody[key] = flatSig
    //   //     //   }
    //   //     // })

    //   //     if (endpoint) {
    //   //       fetch(endpoint, {
    //   //           method: "POST",
    //   //           body,
    //   //         }).then((r) => {
    //   //           console.log(r.json())
    //   //         });
    //   //       }
          
    //   //   },
    //   // },

    // })


    // dc.addType('buttton', {

    //   model: {
    //     defaults: {
    //       script: (props) => {
    //         console.log(props)
    //         console.log("My button...."+this.id)
    //       },
    //       traits: [
    //         ...dc.getType('button').model.prototype.defaults.traits,
    //         {
    //           label: 'Endpoint',
    //           name: 'endpoint',
    //           type: 'text'
    //         },
    //         {
    //           label: 'Payload',
    //           name: 'payload',
    //           type: 'text'
    //         }
    //       ]
    //     }
    //   }

    // })

    dispatch({ type: SET_EDITOR, editor })
  }

  useEffect(() => {
    loadEditor()
  }, [])

  return (<div id="gjs" className="gjs-no-preview" />)
}

export default Editor
