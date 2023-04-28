
const Plugin = (editor) => {
  const id = 'wsm-toast';

  const script = function () {

    this.constants = {
      SEVERITY: {
        SUCCESS: 'success',
        ERROR: 'error',
        INFO: 'info'
      },
      COLOR_BORDER: {
          SUCCESS: 'border-green-600',
          ERROR: 'border-red-500',
          INFO: 'border-blue-500'
      },
      COLOR_TEXT: {
          INFO: 'text-blue-500'
      },
      STATE: {
          HIDDEN: 'hidden'
      },
      EVENT: {
          TOAST: 'onToast'
      }
    }
  
    const {
      SEVERITY,
      COLOR_BORDER,
      COLOR_TEXT,
      EVENT,
      STATE
    } = this.constants;
  
    this.getComponent = () => {
      return document.getElementById(this.id);
    };
  
    this.appendLink = (url) => {
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('target', '_blank');
      link.innerHTML= " view now";
      link.classList.add(COLOR_TEXT.INFO)
      const component = document.getElementById(this.id);
      component.firstChild.appendChild(link);
    };
  
    this.configure = (payload) => {
      let color;
      switch(payload.alertSeverity) {
        case SEVERITY.SUCCESS:
          color = COLOR_BORDER.SUCCESS;
        break;
        case SEVERITY.ERROR:
          color = COLOR_BORDER.ERROR;
        break;
        default:
          color = COLOR_BORDER.INFO;
        break;
      }
      const component = this.getComponent();
      component.classList.add(color);
      component.firstChild.innerHTML = payload.message;
    }
  
    this.showToast = (e) => {
      const detail = e.detail;
      this.configure(detail);
      if (detail.link)
        this.appendLink(detail.link);
      this.displayTimed(detail.timeout);
    };
  
    this.displayTimed = (timeout) => {
      const component = this.getComponent();
      component.classList.remove(STATE.HIDDEN);
      setTimeout(() => {
        component.classList.add(STATE.HIDDEN);
      }, timeout);
    };
  
    this.initialize = () => {
      document.addEventListener(EVENT.TOAST, this.showToast);
    };
  
    this.initialize();
  };

  const block = {
    id: `section-${process.env.MODULE_ID}`,
    media: `
        <a class="text-sm focus:outline-none border-r-8 font-medium bg-white drop-shadow-lg px-5 py-2 mr-2 border-green-600">This is an event notification!</a>
    `,
    category: "Toast",
    content: `
      <div id="${process.env.MODULE_ID}" class="hidden fixed right-10 bottom-10 px-5 py-4 border-r-8 bg-white drop-shadow-lg">
          <p class="text-sm">
              Content goes here
          </p>
      </div>
    `
  };

  const properties = {
    isComponent: (el) => el.id === process.env.MODULE_ID,
    model: {
      defaults: {
        script
      }
    }
  };

  editor.BlockManager.add(id, block);
  editor.DomComponents.addType(id, properties);
};

export default Plugin;
