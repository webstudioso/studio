import { getProjectUrl } from "utils/project";
import constants from 'constant'
import { queryParams } from "utils/url";
const { EVENTS } = constants

const cmdDeviceDesktop = "set-device-desktop";
const cmdDeviceTablet = "set-device-tablet";
const cmdDeviceMobile = "set-device-mobile";

const Plugin = (editor, config) => {
  const pn = editor.Panels;
  const eConfig = editor.getConfig();
  const osm = "open-sm";
  const ola = "open-layers";
  const obl = "open-blocks";
  const prv = "preview";

  eConfig.showDevices = 0;

  pn.getPanels().reset([
    {
      id: "commands",
      buttons: [{}],
    },
    {
      id: "options",
      buttons: [
      ],
    },
    {
      id: "views",
      buttons: [
        {
          id: 'gridPlacement',
          label: `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-layout-off" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M8 4a2 2 0 0 1 2 2m-1.162 2.816a1.993 1.993 0 0 1 -.838 .184h-2a2 2 0 0 1 -2 -2v-1c0 -.549 .221 -1.046 .58 -1.407" />
              <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
              <path d="M14 10v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v10m-.595 3.423a2 2 0 0 1 -1.405 .577h-2a2 2 0 0 1 -2 -2v-4" />
              <path d="M3 3l18 18" />
            </svg>
          `,
          togglable: true,
          active: false,
          command: {
              run: (e) => e.setDragMode('translate'),
              stop: (e) => e.setDragMode(''),
          },
          attributes: {
              title: 'Designer Mode ON for manual grid positioning of components for all devices. Toggle OFF for automatic grid positioning.'
          }
      },
        {
          id: "undo",
          command: (e) => e.runCommand("core:undo"),
          attributes: { title: "Undo" },
          label: `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-rotate-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6366f1" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M15 4.55a8 8 0 0 0 -6 14.9m0 -4.45v5h-5" />
              <line x1="18.37" y1="7.16" x2="18.37" y2="7.17" />
              <line x1="13" y1="19.94" x2="13" y2="19.95" />
              <line x1="16.84" y1="18.37" x2="16.84" y2="18.38" />
              <line x1="19.37" y1="15.1" x2="19.37" y2="15.11" />
              <line x1="19.94" y1="11" x2="19.94" y2="11.01" />
            </svg>
        `,
        },
        {
          id: "redo",
          command: (e) => e.runCommand("core:redo"),
          attributes: { title: "Redo" },
          label: `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-rotate-clockwise-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6366f1" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
              <line x1="5.63" y1="7.16" x2="5.63" y2="7.17" />
              <line x1="4.06" y1="11" x2="4.06" y2="11.01" />
              <line x1="4.63" y1="15.1" x2="4.63" y2="15.11" />
              <line x1="7.16" y1="18.37" x2="7.16" y2="18.38" />
              <line x1="11" y1="19.94" x2="11" y2="19.95" />
            </svg>
          `,
        },
        {
          id: obl,
          command: obl,
          active: true,
          label: `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-package" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
                <line x1="12" y1="12" x2="20" y2="7.5"></line>
                <line x1="12" y1="12" x2="12" y2="21"></line>
                <line x1="12" y1="12" x2="4" y2="7.5"></line>
                <line x1="16" y1="5.25" x2="8" y2="9.75"></line>
            </svg>
        `,
        }
      ],
    },
  ]);

  // Add devices buttons
  const panelDevices = pn.addPanel({ id: "devices-c" });
  panelDevices.get("buttons").add([
    {
      id: prv,
      context: prv,
      command: (e) => e.runCommand(prv),
      label: `
        <div class="address-bar__dots mr-auto">
          <span class="dot-1"></span>
          <span class="dot-2"></span>
          <span class="dot-3"></span>
        </div>
      `,
    },
    {
      id: 'alert-button',
      className: 'project-link-button',
      label: `🌐 ${getProjectUrl({})}`,
      command(editor) {
        window.open(`${getProjectUrl({})}${queryParams()}`, "_blank");
      }
    },
    {
      id: cmdDeviceDesktop,
      command: cmdDeviceDesktop,
      attributes: { title: "Desktop" },
      active: 1,
      label: `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-desktop" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <rect x="3" y="4" width="18" height="12" rx="1"></rect>
            <line x1="7" y1="20" x2="17" y2="20"></line>
            <line x1="9" y1="16" x2="9" y2="20"></line>
            <line x1="15" y1="16" x2="15" y2="20"></line>
        </svg>
      `,
    },
    {
      id: cmdDeviceTablet,
      command: cmdDeviceTablet,
      attributes: { title: "Tablet Portrait" },
      label: `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-tablet" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="5" y="3" width="14" height="18" rx="1"></rect>
                <circle cx="12" cy="17" r="1"></circle>
            </svg>
        `,
    },
    {
      id: cmdDeviceMobile,
      command: cmdDeviceMobile,
      attributes: { title: "Mobile Portrait" },
      label: `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-mobile" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="6" y="3" width="12" height="18" rx="2"></rect>
                <line x1="11" y1="4" x2="13" y2="4"></line>
                <line x1="12" y1="17" x2="12" y2="17.01"></line>
            </svg>
        `,
    },
  ]);

  const openBl = pn.getButton("views", obl);
  editor.on("load", () => openBl && openBl.set("active", 1));

  // On component change show the Style Manager
  config.showStylesOnChange &&
    editor.on("component:selected", () => {
      const openSmBtn = pn.getButton("views", osm);
      const openLayersBtn = pn.getButton("views", ola);

      // Don't switch when the Layer Manager is on or
      // there is no selected component
      if (
        (!openLayersBtn || !openLayersBtn.get("active")) &&
        editor.getSelected()
      ) {
        openSmBtn && openSmBtn.set("active", 1);
      }
    });

  var cmdm = editor.Commands;
  cmdm.add(cmdDeviceDesktop, {
    run: (ed) => ed.setDevice("Desktop"),
    stop: () => {},
  });
  cmdm.add(cmdDeviceTablet, {
    run: (ed) => ed.setDevice("Tablet"),
    stop: () => {},
  });
  cmdm.add(cmdDeviceMobile, {
    run: (ed) => ed.setDevice("Mobile portrait"),
    stop: () => {},
  });

  cmdm.add('tlb-settings', (ed) => {
    document.dispatchEvent(new CustomEvent(EVENTS.TOGGLE_SETTINGS_MODAL, {
      detail: ed
    }));  
  
  })
};

export default Plugin;
