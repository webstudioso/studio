/*eslint no-undef: "off"*/
const Plugin = (editor) => {
    const componentId = "web-button";
  
    const classes = 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
    
    const block = {
      id: `section-${componentId}`,
      label: 'Web3 Button',
      category: "Web3",
    //   content: { 
    //     type: 'button', 
    //     text: 'I am a button',
    //     classes: classes.split(' ')
    // }
      content: `
        <span type="button" class="btn" id="${componentId}">
          Connect
        </span>
      `,
    };
  
    const script = function (props) {

      this.getComponent = () => {
        return document.getElementById(this.id);
      }

      this.initialize = () => {
          this.getComponent().addEventListener('click', this.handleSubmit);
      }

      this.handleSubmit = (e) => {
        e?.preventDefault();
        console.log("onClick")
        console.log(props)
      }

      this.initialize();
      return this;
    };
  
    const properties = {
      isComponent: (el) => el.id === componentId,
      model: {
        defaults: {
            script,
            payload: {},
            traits: [
                {
                changeProp: 1,
                type: "Text",
                name: "payload"
                },
            ],
            "script-props": ["payload"],
        },
      },
    };
  
    editor.BlockManager.add(componentId, block);
    editor.DomComponents.addType(componentId, properties);
  };
  
  export default Plugin;
  