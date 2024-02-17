 # Webstudio Form Module

This module adds capabilities to web apps built with [Webstudio](https://webstudio.so) to invoke smart contract methods on any EVM compatible blockchain network.

 ![Webstudio Module Form](https://github.com/webstudioso/wsm-form/actions/workflows/production.yml/badge.svg)

### Testing and Building Module
```
npm i
npm run test
npm run build
```

### Publish to NPMJS
```
npm publish
```

### Importing Dependency in Webstudio
Add it to the project, this is compatible with `grapesjs` as well.
```shell
npm i --save wsm-form@latest
```
To import in the editor add the file and include it as a Plugin
```js
import PluginForm from "wsm-form"

const editor = grapesjs.init({
    container: "#gjs",
    plugins: [
        PluginForm
    ],
})
```