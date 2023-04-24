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
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
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



    editor.setComponent(`
    
    
    <body class="bg-white dark:bg-black" data-new-gr-c-s-check-loaded="14.1106.0" data-gr-ext-installed=""><section><div class="mx-auto max-w-7xl px-8 py-12 lg:pt-24"><div class="mx-auto max-w-xl"><div><div class="md:flex md:items-center md:justify-between md:space-x-5"><div class="flex items-center space-x-5"><div class="flex-shrink-0"><div class="relative"><img alt="image" class="rounded-full border border-white/10 h-16 lg:h-24 lg:w-24 w-16" src="/images/avatar.jpg"> <span aria-hidden="true" class="rounded-full absolute inset-0 shadow-inner"></span></div></div><div class="pt-1.5"><h1 class="dark:text-white text-black lg:text-xl">✺ Michael Alexander Andreuzza</h1><p class="text-neutral-500 font-light text-sm">Software Engineer in Seattle</p><p><a class="dark:text-white duration-200 hover:no-underline text-xs underline" href="#">michaelandreuzza.com</a></p></div></div></div><div class="font-light text-sm mt-24"><p class="dark:text-white text-black">About</p><div class="text-neutral-500 dark:text-neutral-400 mt-3 space-y-3"><p>For the past 15 years, I have been a hands-on and adaptable problem solver, collaborating with start-ups, e-commerce businesses, agencies, and consulting firms.</p><p>specialize in front-end development, but also have experience with back-end development and cloud infrastructure.</p><p>I am skilled in leading software projects and have the ability to manage, mentor, and hire software engineers.</p></div></div></div></div></div></section><section><div class="mx-auto max-w-7xl px-8 py-12"><div class="mx-auto max-w-xl"><div class="grid gap-12 md:gap-24"><div class="font-light text-sm"><p class="dark:text-white text-black">Work experience</p><div class="grid gap-6 mt-3"><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">13.02.2023</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://lexingtonthemes.com">Working on Lexington Themes</a></p><p class="">Åland Islands, Finland</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">10.02.2022</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://unwrapped.design">Built Unwrapped</a></p><p class="">Åland Islands, Finland</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">10.02.2022</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://colorsandfonts.com">Created Colors &amp; fonts</a></p><p class="">Åland Islands, Finland</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">01.05.2022</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">New Product Launch</a></p><p class="">San Francisco, CA</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">15.06.2022</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">E-commerce Website Redesign</a></p><p class="">New York, NY</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">10.08.2022</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Mobile App Development</a></p><p class="">London, UK</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">01.09.2022</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Marketing Campaign Strategy</a></p><p class="">Sydney, Australia</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">15.10.2022</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Social Media Management</a></p><p class="">Paris, France</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">10.11.2022</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">UI/UX Design</a></p><p class="">Tokyo, Japan</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">01.12.2022</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Content Creation</a></p><p class="">Toronto, Canada</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">15.01.2020</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">SEO Optimization</a></p><p class="">Berlin, Germany</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">10.02.2020</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Brand Identity Development</a></p><p class="">São Paulo, Brazil</p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">01.03.2020</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Video Production</a></p><p class="">Seoul, South Korea</p></div></div></div></div><div class="font-light text-sm"><p class="dark:text-white text-black">Contact</p><div class="grid gap-6 mt-3"><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">Email</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="mailto:email@example.com" title="Email">michael@andreuzza.com</a></p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">Twitter</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://twitter.com/Mike_Andreuzza" title="Twitter">Mike_Andreuzza</a></p></div></div><div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"><div><p class="dark:text-neutral-400 text-neutral-400">Read CV</p></div><div class="md:col-span-2 w-full"><p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://read.cv/join/michael_andreuzza" title="Read CV">michael_andreuzza</a></p></div></div></div></div></div></div></div></section><div id="mailgo" class="m-modal" role="dialog" tabindex="-1" aria-labelledby="m-title" style="display: none;"><div class="m-modal-back"></div><div class="m-modal-content"><strong id="m-title" class="m-title"></strong><div id="m-details" class="m-details"><p id="m-cc"><span class="w-500">cc </span><span id="m-cc-value"></span></p><p id="m-bcc"><span class="w-500">bcc </span><span id="m-bcc-value"></span></p><p id="m-subject"><span class="w-500">subject </span><span id="m-subject-value"></span></p><p id="m-body"><span class="w-500">body </span><span id="m-body-value"></span></p></div><a id="m-gmail" href="#mailgo-gmail" class="m-open m-gmail">open in <span class="w-500">Gmail</span></a><a id="m-outlook" href="#mailgo-outlook" class="m-open m-outlook">open in <span class="w-500">Outlook</span></a><a id="m-yahoo" href="#mailgo-yahoo" class="m-open m-yahoo">open in <span class="w-500">Yahoo Mail</span></a><a id="m-open" href="#mailgo-open" class="m-open m-default"><span class="w-500">open</span> default</a><a id="m-copy" href="#mailgo-copy" class="m-copy w-500">copy</a><a id="m-custom-action" href="#mailgo-custom-action" class="m-open m-custom-action"></a><a href="https://mailgo.dev?ref=mailgo-modal" class="m-by" target="_blank" rel="noopener noreferrer">mailgo.dev</a></div></div><div id="mailgo-tel" class="m-modal" role="dialog" tabindex="-1" aria-labelledby="m-tel-title" style="display: none;"><div class="m-modal-back"></div><div class="m-modal-content"><strong id="m-tel-title" class="m-title"></strong><div id="m-tel-details" class="m-details"><p id="m-msg"><span class="w-500">body </span><span id="m-msg-value"></span></p></div><a id="m-tg" href="#mailgo-telegram" class="m-open m-tg" style="display: none;">open in <span class="w-500">Telegram</span></a><a id="m-wa" href="#mailgo-whatsapp" class="m-open m-wa">open in <span class="w-500">WhatsApp</span></a><a id="m-skype" href="#mailgo-skype" class="m-open m-skype">open in <span class="w-500">Skype</span></a><a id="m-call" href="#mailgo-open" class="m-open m-default"><span class="w-500">call</span> as default</a><a id="m-tel-copy" href="#mailgo-copy" class="m-copy w-500">copy</a><a href="https://mailgo.dev?ref=mailgo-modal" class="m-by" target="_blank" rel="noopener noreferrer">mailgo.dev</a></div></div></body>
    `)
  };

  useEffect(() => {
    loadProject();
  }, []);

  return (<div id="gjs" />);
};

export default Editor;
