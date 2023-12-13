import script from './script';
export const typeForm = 'form';
export const typeInput = 'input';
export const typeTextarea = 'textarea';
export const typeSelect = 'select';
export const typeCheckbox = 'checkbox';
export const typeRadio = 'radio';
export const typeButton = 'button';
export const typeLabel = 'label';
export const typeOption = 'option';


const idTrait = {
  name: 'id',
};

const forTrait = {
  name: 'for',
};

const nameTrait = {
  name: 'name',
};

const placeholderTrait = {
  name: 'placeholder',
};

const valueTrait = {
  name: 'value',
};

const requiredTrait = {
  type: 'checkbox',
  name: 'required',
};

const optionTrait = {
  type: 'checkbox',
  name: 'txOption',
};

const checkedTrait = {
  type: 'checkbox',
  name: 'checked',
};

const formatterTrait =           {
  type: 'select',
  name: 'format',
  options: [
    { value: 'none' },
    { value: 'toWei' },
    { value: 'toBytes32' }
  ]
};

export const form = {
  isComponent: el => el.tagName === 'FORM',
  model: {
    defaults: {
      script,
      tagName: 'form',
      droppable: ':not(form)',
      draggable: ':not(form)',
      // attributes: { method: 'get' },
      contract: '0x419B6DA1Cc20Ca3592EeD67cc69BadCf0cC7Ada9',
      abi: `[
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_ipfsHash",
              "type": "bytes32"
            }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "_ipfsHash",
              "type": "bytes32"
            }
          ],
          "name": "Mint",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "_from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        }
      ]`,
      method: 'mint',
      explorerUrl: 'https://mumbai.polygonscan.com',
      // payload: {},
      traits: [
          // {
          //     type: 'select',
          //     name: 'method',
          //     options: [
          //         {value: 'get', name: 'GET'},
          //         {value: 'post', name: 'POST'},
          //     ],
          // }, 
          // {
          //     name: 'action',
          // }
          {
              name: 'contract', changeProp: 1
          },
          {
              name: 'abi', changeProp: 2
          },
          {
              name: 'method', changeProp: 3
          },
          {
              name: 'explorerUrl', changeProp: 4
          },
          // {
          //     name: 'payload', changeProp: 1
          // }
      ],
      "script-props": ["contract", "abi", "method", "explorerUrl", /* "payload" */],
    },
  },

  view: {
    events: {
      // The submit of the form might redirect the user from the editor so
      // we should always prevent the default here.
      submit: (e, t) => {
          // console.log(this);
          // console.log(t);
          e.preventDefault();
          // console.log("Form submit");
          // // console.log(e.srcElement.attributes);
          // const attributes = e.srcElement.attributes;
          // console.log(attributes);
      },
    }
  },
};

export const input = {
    isComponent: el => el.tagName === 'INPUT',

    model: {
      defaults: {
        tagName: 'input',
        droppable: false,
        highlightable: false,
        attributes: { type: 'text', defaultValue: 'none' },
        format: { value: 'none'},
        txOption: false,
        traits: [
          nameTrait,
          placeholderTrait,
          formatterTrait,
          {
            type: 'select',
            name: 'type',
            options: [
              { value: 'text' },
              { value: 'email' },
              { value: 'password' },
              { value: 'number' },
            ]
          },
          {
            type: 'select',
            name: 'defaultValue',
            options: [
              { value: 'none' },
              { value: 'userAddress' }
            ]
          },
          valueTrait,
          requiredTrait,
          optionTrait
        ],
      },
    },
    extendFnView: ['updateAttributes'],
    view: {
        init() {
            this.listenTo(this.model, 'change:attributes:value', this.handleValue);
        },
        handleValue() {
            this.el.value = this.model.get('attributes')?.value;
        }
    }
};

export const button = {
  extend: typeInput,
  isComponent: el => el.tagName === 'BUTTON' && el.id !== 'wsm-wallet-connect',

  model: {
    defaults: {
      tagName: 'button',
      attributes: { type: 'button' },
      text: 'Send',
      traits: [
        {
          name: 'text',
          changeProp: true,
        }, {
          type: 'select',
          name: 'type',
          options: [
            { value: 'button' },
            { value: 'submit' },
            { value: 'reset' },
          ]
      }]
    },
    init() {
      const comps = this.components();
      const tChild =  comps.length === 1 && comps.models[0];
      const chCnt = (tChild && tChild.is('textnode') && tChild.get('content')) || '';
      const text = chCnt || this.get('text');
      this.set('text', text);
      this.on('change:text', this.__onTextChange);
      (text !== chCnt) && this.__onTextChange();
    },
    __onTextChange() {
      this.components(this.get('text'));
    },
  },

  // view: {
  //   events: {
  //     click: checkIfInPreview,
  //   },
  // },
};

export const label = {
  extend: 'text',
  isComponent: el => el.tagName === 'LABEL',

  model: {
    defaults: {
      tagName: 'label',
      components: 'Label',
      traits: [forTrait],
    },
  },
};

export const loadComponents = (editor) => {
  const { Components } = editor;

  // const createOption = (value, content) => {
  //   return { type: typeOption, content, attributes: { value } };
  // };

  // checkIfInPreview = (ev) => {
  //   if (!editor.Commands.isActive('preview')) {
  //     ev.preventDefault();
  //   }
  // };
  Components.addType(typeForm, form);
  Components.addType(typeInput, input);
  Components.addType(typeButton, button);
  Components.addType(typeLabel, label);
  // TEXTAREA
  // Components.addType(typeTextarea, {
  //   extend: typeInput,
  //   isComponent: el => el.tagName === 'TEXTAREA',

  //   model: {
  //     defaults: {
  //       tagName: 'textarea',
  //       attributes: {},
  //       traits: [
  //         nameTrait,
  //         placeholderTrait,
  //         requiredTrait
  //       ]
  //     },
  //   },
  // });
  // OPTION
  // Components.addType(typeOption, {
  //   isComponent: el => el.tagName === 'OPTION',

  //   model: {
  //     defaults: {
  //       tagName: 'option',
  //       layerable: false,
  //       droppable: false,
  //       draggable: false,
  //       highlightable: false,
  //     },
  //   },
  // });
  // SELECT
  // Components.addType(typeSelect, {
  //   extend: typeInput,
  //   isComponent: el => el.tagName === 'SELECT',

  //   model: {
  //     defaults: {
  //       tagName: 'select',
  //       components: [
  //         createOption('opt1', 'Option 1'),
  //         createOption('opt2', 'Option 2'),
  //       ],
  //       traits: [
  //         nameTrait,
  //         {
  //           name: 'options',
  //           type: 'select-options'
  //         },
  //         requiredTrait
  //       ],
  //     },
  //   },

  //   view: {
  //     events: {
  //       mousedown: checkIfInPreview,
  //     },
  //   },
  // });
  // CHECKBOX
  // Components.addType(typeCheckbox, {
  //   extend: typeInput,
  //   isComponent: (el) => el.tagName === 'INPUT' && el.type === 'checkbox',

  //   model: {
  //     defaults: {
  //       copyable: false,
  //       attributes: { type: 'checkbox' },
  //       traits: [
  //         idTrait,
  //         nameTrait,
  //         valueTrait,
  //         requiredTrait,
  //         checkedTrait
  //       ],
  //     },
  //   },

  //   view: {
  //     events: {
  //       click: checkIfInPreview,
  //     },

  //     init() {
  //       this.listenTo(this.model, 'change:attributes:checked', this.handleChecked);
  //     },

  //     handleChecked() {
  //       this.el.checked = !!this.model.get('attributes')?.checked;
  //     },
  //   },
  // });
  // RADIO
  // Components.addType(typeRadio, {
  //   extend: typeCheckbox,
  //   isComponent: el => el.tagName === 'INPUT' && el.type === 'radio',

  //   model: {
  //     defaults: {
  //       attributes: { type: 'radio' },
  //     },
  //   },
  // });
}
