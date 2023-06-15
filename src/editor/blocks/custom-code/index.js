import loadBlocks from './blocks';
import loadCommands from './commands';
import loadComponents from './components';

const plugin = (editor, opts = {}) => {
  const options = {
    blockCustomCode: {},
    propsCustomCode: {},
    toolbarBtnCustomCode: {},
    placeholderScript: `<div style="pointer-events: none; padding: 10px;">
      <svg viewBox="0 0 24 24" style="height: 30px; vertical-align: middle;">
        <path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2 1 21z"></path>
        </svg>
      Custom code with <i>&lt;script&gt;</i> can't be rendered on the canvas
    </div>`,
    modalTitle: 'Insert your code',
    codeViewOptions: {},
    buttonLabel: 'Save',
    commandCustomCode: {},
    ...opts
  };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // Add commands
  loadCommands(editor, options);
};

export default plugin;