import {
  typeForm,
  typeInput,
  // typeTextarea,
  // typeSelect,
  // typeCheckbox,
  // typeRadio,
  typeButton,
  typeLabel,
} from './components';

export const loadBlocks = (editor, opt) => {

  const opts = opt;
  const bm = editor.BlockManager;
  const addBlock = (id, def) => {
    opts.blocks?.indexOf(id) >= 0 && bm.add(id, {
      ...def,
      category: opts.category,
      select: true,
      ...opt.block(id),
    });
  }

  addBlock(typeForm, {
    // label: 'Form',
    media: `
      <form class="w-full max-w-sm">
        <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
          First Attribute
        </label>
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Function first input">
        <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-password">
          Second Attribute
        </label>
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="text" placeholder="Function second input">
        <button class="my-2 shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
          Smart Contract Action
        </button>
      </form>
    `,
    content: {
      type: typeForm,
      components: [ {
          components: [
            { 
              type: typeLabel, 
              components: 'First Attribute',
              classes: ['block text-gray-500', 'font-bold', 'md:text-left', 'mb-1', 'md:mb-0', 'pr-4']
            },
            { 
              type: typeInput, 
              value:'1', 
              attributes: { type: 'text', name: '_to', required: false, placeholder: 'Function first input' },
              classes: ['bg-gray-200', 'appearance-none', 'border-2', 'border-gray-200', 'rounded', 'w-full', 'py-2', 'px-4', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:bg-white', 'focus:border-purple-500']
        }]
        }, {
          components: [
            { 
              type: typeLabel, 
              components: 'Second Attribute',
              classes: ['block text-gray-500', 'font-bold', 'md:text-left', 'mb-1', 'md:mb-0', 'pr-4']
            },
            { 
              type: typeInput, 
              value:'2', 
              attributes: { type: 'text', name: '_ipfsHash', required: false, placeholder: 'Function second input' },
              classes: ['bg-gray-200', 'appearance-none', 'border-2', 'border-gray-200', 'rounded', 'w-full', 'py-2', 'px-4', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:bg-white', 'focus:border-purple-500']
            }]
        }, {
          components: [{ 
            type: typeButton, 
            attributes: { type: 'submit' },
            classes: ['shadow','my-2','bg-black','hover:bg-grey-200','focus:shadow-outline','focus:outline-none','text-white','font-bold','py-2','px-4','rounded']
          }]
        },
      ]
    }
  });

  addBlock(typeInput, {
    // label: 'Input',
    media: `
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="This is a text input">
    `,
    content: { 
      type: typeInput,
      classes: ['bg-gray-200', 'appearance-none', 'border-2', 'border-gray-200', 'rounded', 'w-full', 'py-2', 'px-4', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:bg-white', 'focus:border-purple-500']
    },
  });

  // addBlock(typeTextarea, {
  //   label: 'Textarea',
  //   media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 7.5c0-.9-.5-1.5-1.3-1.5H3.4C2.5 6 2 6.6 2 7.5v9c0 .9.5 1.5 1.3 1.5h17.4c.8 0 1.3-.6 1.3-1.5v-9zM21 17H3V7h18v10z"/><path d="M4 8h1v4H4zM19 7h1v10h-1zM20 8h1v1h-1zM20 15h1v1h-1z"/></svg>',
  //   content: { type: typeTextarea },
  // });

  // addBlock(typeSelect, {
  //   label: 'Select',
  //   media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M18.5 13l1.5-2h-3zM4 11.5h11v1H4z"/></svg>',
  //   content: { type: typeSelect },
  // });

//   addBlock(typeButton, {
//     // label: 'Button',
//     media: `
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 266 150" fill="none">
//   <defs>
//     <clipPath id="clip0_3_77">
//       <rect width="266" height="150" fill="white"/>
//     </clipPath>
//   </defs>
//   <g clip-path="url(#clip0_3_77)">
//     <path d="M -0.432 -0.58 L 265.568 -0.58 L 265.568 149.42 L -0.432 149.42 L -0.432 -0.58 Z" fill="white"/>
//     <rect x="58.518" y="48.809" width="146.081" height="46.775" style="fill: rgb(99, 102, 241); stroke: rgb(99, 102, 241); stroke-linejoin: round; stroke-width: 3px;"/>
//     <text style="fill: rgb(255, 255, 255); font-family: Arial, sans-serif; font-size: 21.2px; stroke-linejoin: round; white-space: pre;" x="101.244" y="78.989">Button</text>
//   </g>
// </svg>
//     `,
//     content: { type: typeButton, content: `<button>Button</button>` },
//   });

  addBlock(typeLabel, {
    // label: 'Label',
    media: `
    <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-password">
      This is a form label
    </label>
    `,
    content: { type: typeLabel, classes: ['block text-gray-500', 'font-bold', 'md:text-left', 'mb-1', 'md:mb-0', 'pr-4'] },
  });

  // addBlock(typeCheckbox, {
  //   label: 'Checkbox',
  //   media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2z"></path></svg>',
  //   content: { type: typeCheckbox },
  // });

  // addBlock(typeRadio, {
  //   label: 'Radio',
  //   media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"></path></svg>',
  //   content: { type: typeRadio },
  // });
}
