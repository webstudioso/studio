import { loadBlocks } from './blocks';
import { loadComponents } from './components';

const Plugin = (editor, opts = {}) => {

  const config = {
    blocks: ['form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio'],
    category: "Web3",
    block: () => ({}),
    ...opts
  };

  loadComponents(editor);
  loadBlocks(editor, config);
};

export default Plugin;