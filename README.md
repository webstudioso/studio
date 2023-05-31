[![Webstudio](https://i.ibb.co/njcYZcb/landing.png)](https://youtu.be/pcbTbq_MDWQ)

![Production Build](https://github.com/webstudioso/studio/actions/workflows/production_deploy.yml/badge.svg)
![Development Build](https://github.com/webstudioso/studio/actions/workflows/development_deploy.yml/badge.svg)

# [Webstudio](https://webstudio.so)

welcome to a new era of no-code for creatives, innovators and visionaries building on the New Internet. What required a team of developers, can now be done by you, through a visual drag and drop editor and carefully curated components to help you build and launch full stack web3 applications in minutes and without code.

## What is it?

[Webstudio](https://webstudio.so) is the ultimate no-code development platform for the new Open Web. It lets you create interactive, multi-user dapps for desktop and mobile web browsers and includes all the tools you need to build a site like Opensea or Uniswap from powerful primitives. Launch Landing Pages, NFT Marketplaces, NFT Minters, Payments solutions, DAOs and more from ready made templates. Speed up your iterations without having to start from scratch. Through public blockchain based technologies handle your own deployments, hosting and data. There are no hard limits on the number of users, volume of traffic, or storage.

## How it works?

[Creating a dApp with the Webstudio](https://youtu.be/M6xhkVmznxY)

## Getting Started

If you are looking to build dApps without code, I recommend you use our cloud platform [Webstudio](https://webstudio.so). For developers contributing to the project here are the configuration steps.

### 1. Prerrequisites

- Node 18
- Create a [Moralis](https://moralis.com) Account

### 2. Create a .env

```
SKIP_PREFLIGHT_CHECK=true
REACT_APP_HOST_ENV=dev
REACT_APP_MORALIS_API_KEY=<Create a Morali app and use the api key>
REACT_APP_WEBSTUDIO_API_URL=<Request us access through discord for this one>
REACT_APP_INFURA_KEY=<Create an infura project and use the key>
REACT_APP_MAGIC_API_KEY=<Create a magic link project and use the sk key>
REACT_APP_WEBSTUDIO_WS_API=<websocker url of AI assistant>
REACT_APP_WIX_SUBSCRIPTION_ENDPOINT=<endpoint that verifies subcription details for current user>
REACT_APP_DISCORD_WEBHOOK=<url of webhook to send events>
REACT_APP_INFURA_API_KEY=<default infura key>
```

### 3. Install dependencies

Then, run the development server:

```bash
npm i
```

### 4. Run the project

Then, run the development server:

```bash
npm run start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Build the project

Then, run the development server:

```bash
npm run build
```

### Language Settings

In order to leverage localized settings you must include locale query param with any of the supported languages, `en` by default.

```
https://localhost:3000?locale=es
```