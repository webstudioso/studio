/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import grapesjs from "grapesjs";
import PluginTokenGate from "../primitives/token-gated-container";
import PluginNFT from "../primitives/nft-card";
import PluginActionButton from "../primitives/action-button";
// import PluginTailwind from "grapesjs-tailwind";
import PluginScriptEditor from "grapesjs-script-editor";
import PageManager from "./Plugins/PageManager";
import PluginEditorPanelButtons from "./Panel/Buttons";
import { useDispatch } from "react-redux";
import { LOADER, SET_EDITOR } from "store/actions";

// Primitives
import WSMBasic from "wsm-basic";
import WSMToast from "wsm-toast";
import WSMForm from "wsm-form";
import WSMWalletConnect from "wsm-wallet-connect";
import WSMAnimations from "wsm-animations";
import WSMFonts, { WSMFontStyles } from "wsm-fonts";
import axios from 'axios';
import constants from 'constant'
import { showError, showSuccess } from "utils/snackbar";
const { EVENTS } = constants

const Editor = ({ project, onClickHome, principal }) => {
    // const [editor, setEditor] = useState({});
    const dispatch = useDispatch();

    const loadProject = async () => {

      try {
        dispatch({ type: LOADER, show: true });
        const response = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${project.id}`,
          {
            headers: {
              "AuthorizeToken": `Bearer ${principal}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }
        )
    
        const foundProject = response?.data;
        window.webstudio = {
          project: foundProject,
        };

        loadEditor();
      } finally {
        dispatch({ type: LOADER, show: false });
      }
  };

  const projectEndpoint = `${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${project.id}/content`;

  const loadEditor = () => {

    // Handle tailwind's use of slashes in css names
    const escapeName = (name) =>
      `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, "-");

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
            // `props` are the same used in `asset:custom` event
            // ...
            // Init and open your external Asset Manager
            // ...
            // IMPORTANT:
            // When the external library is closed you have to comunicate
            // this state back to the editor, otherwise GrapesJS will think
            // the Asset Manager is still open.
            // example: myAssetManager.on('close', () => props.close())
          },
          close(props) {
            // console.log("ONCLOSE-----")
            // console.log(props)
            // Close the external Asset Manager
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
            // The `remote` storage uses the POST method when stores data but
            // the json-server API requires PATCH.
            // fetchOptions: opts => (opts.method === 'POST' ?  { method: 'PATCH' } : {}),
            // As the API stores projects in this format `{id: 1, data: projectData }`,
            // we have to properly update the body before the store and extract the
            // project data from the response result.
            onStore: data => ({ id: project.id, data }),
            onLoad: result => result.data,
          }
        }
      },
      panels: { defaults: [] },
      plugins: [
        WSMBasic,
        PluginEditorPanelButtons,
        PluginScriptEditor,
        WSMWalletConnect,
        PluginTokenGate,
        PluginNFT,
        PluginActionButton,
        // PluginTailwind,
        PageManager,
        WSMForm,
        WSMToast,
        WSMAnimations,
        WSMFonts
      ],
      pluginsOpts: {},
      canvas: {
        scripts: [
          "https://cdn.jsdelivr.net/npm/webstudio-sdk@0.0.6/dist/main.min.js",
          "https://cdn.tailwindcss.com",
          "https://code.jquery.com/jquery-3.6.1.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js"
        ],
        // The same would be for external styles
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
          ...WSMFontStyles
        ],
      },
    });

    // const panels = editorUI.Panels;
    // panels.addButton("options", [
    //   {
    //     id: "home",
    //     command: onClickHome,
    //     label: `
    //                 <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c6c7c8" fill="none" stroke-linecap="round" stroke-linejoin="round">
    //                     <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    //                     <polyline points="5 12 3 12 12 3 21 12 19 12" />
    //                     <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
    //                     <rect x="10" y="12" width="4" height="4" />
    //                 </svg>
    //             `,
    //     attributes: {
    //       title: "Home Profile",
    //     },
    //   },
    // ]);

    // Storage events
    editor.on('storage:error', (e) => {
      dispatch({ type: LOADER, show: false })
      showError({ dispatch, message: e.message })
    });

    editor.on('storage:store', () => {
      dispatch({ type: LOADER, show: false })
      showSuccess({ dispatch, message: 'Auto saved'})
    });

    // // Used to load default template "Tutorial" only if no other template is loaded after API Call
    // editor.on('storage:end:load', (data) => {
    //     if (!data?.pages) {
    //         console.log('No data loaded from API, launching starter template')
    //         editor.loadProjectData(TutorialLandingPage)
    //     } else {
    //         console.log('Template loaded from API')
    //     }
    // })

  // define this event handler after editor is defined
  // like in const editor = grapesjs.init({ ...config });
  editor.on('component:selected', () => {

    // whenever a component is selected in the editor

    // set your command and icon here
    const commandToAdd = 'tlb-settings';
    // const commandIcon = 'fa fa-cog';

    // get the selected componnet and its default toolbar
    const selectedComponent = editor.getSelected();
    const defaultToolbar = selectedComponent.get('toolbar');

    // check if this command already exists on this component toolbar
    const commandExists = defaultToolbar.some(item => item.command === commandToAdd);

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
      });
    }

  });

    // editorUI.DomComponent.addType('default', {
    //   model: {
    //     defaults: {
    //       // other model properties
    //       toolbar: [{
    //         attributes: {class: 'fa fa-arrows'},
    //         command: 'tlb-move',
    //       },{
    //         attributes: {class: 'fa fa-clone'},
    //         command: 'tlb-clone',
    //       }],
    //     }
    //   }
    // })

    editor.on("run:preview",()=>{

      const ed = document.getElementById('gjs');
      console.log(ed);
      ed.style.position='fixed';
      ed.style.left='0';
      ed.style.top='0';
      ed.style.zIndex='1203';
    });

    editor.on("stop:preview",()=>{
      const ed = document.getElementById('gjs');
      ed.style.position='relative';
      ed.style.zIndex='1200';
    });

    // const cats = '.gjs-block-categories';
    // const catManager = document.querySelector(cats);
    // console.log(catManager)
    // catManager.addEventListener('mouseEnter', () => {
    //   console.log("hover in")
    // })

    // catManager.addEventListener('mouseExit', () => {
    //   console.log("hover out")
    // })

    window.editor = editor;
    dispatch({ type: SET_EDITOR, editor })
  };

  useEffect(() => {
    loadProject();
  }, []);

  return (<div id="gjs" />);
};

export default Editor;
