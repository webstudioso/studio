/*eslint no-undef: "off"*/
const Plugin = (editor) => {
  const componentId = "action-button";

  const block = {
    id: `section-${componentId}`,
    label: `
    <svg width="266" height="150" viewBox="0 0 266 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_3_65)">
    <path d="M0 0H266V150H0V0Z" fill="white"/>
    <path d="M178 63H88C85.2386 63 83 65.2386 83 68V83C83 85.7614 85.2386 88 88 88H178C180.761 88 183 85.7614 183 83V68C183 65.2386 180.761 63 178 63Z" fill="#6366F1"/>
    <path d="M145.034 73.7463H118.966C118.432 73.7463 118 74.6417 118 75.7463C118 76.8508 118.432 77.7463 118.966 77.7463H145.034C145.568 77.7463 146 76.8508 146 75.7463C146 74.6417 145.568 73.7463 145.034 73.7463Z" fill="white"/>
    <path d="M148.32 74.5459L138.837 67.0248C138.643 66.871 137.929 67.4478 137.243 68.3133C136.556 69.1787 136.157 70.005 136.351 70.1588L145.834 77.6798C146.028 77.8337 146.742 77.2568 147.428 76.3914C148.115 75.526 148.514 74.6997 148.32 74.5459Z" fill="white"/>
    <path d="M145.586 73.0357L136.342 80.8492C136.153 81.009 136.578 81.8224 137.291 82.666C138.004 83.5096 138.736 84.0639 138.925 83.904L148.168 76.0905C148.357 75.9307 147.932 75.1173 147.219 74.2737C146.506 73.4301 145.775 72.8758 145.586 73.0357Z" fill="white"/>
    </g>
    <defs>
    <clipPath id="clip0_3_65">
    <rect width="266" height="150" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
    `,
    category: "Triggers",
    content: `
      <span type="button" class="btn" id="${componentId}">
        Action
      </span>
      <style>
        #${componentId} {
          width: 100%;
          background: #333;
          color: white;
        }
      </style>
    `,
  };

  const script = function (props) {
    const componentId = "action-button";
    console.log(`Running script ${componentId}`);
    // const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
    // window.GGSANCHETA ='LOL'

    // console.log(thirdwebDevsdk)
    console.log("WTF")
    console.log(window)
    // console.log(document)
    // console.log(thirdwebDevsdk);

    // let gg
    // let dyn = document.createElement("script")
    // dyn.type = "module"
    // // dyn.onload = () => { console.log(gg) }
    // // dyn.src="https://cdn.jsdelivr.net/npm/@thirdweb-dev/sdk@3.10.14/+esm"
    // dyn.innerText = `
    //   console.log("YAAAAAAAAAA")
    //   import sdk from 'https://cdn.jsdelivr.net/npm/@thirdweb-dev/sdk@3.10.14/+esm'
    //   console.log("YOOOO")
    // `
    // document.head.appendChild(dyn)


    // console.log(gg)
    // const script = document.createElement('script');
    // script.onload = initLib;
    // script.src = 'https://.../somelib.min.js';
    // document.body.appendChild(script);

    // console.log(dyn)
    // console.log(document)
    // console.log(gg)
    // setTimeout(() => {
    //   console.log(thirdwebDevsdk)
    // },1000)
    // console.log(ThirdwebSDK)
    // import thirdwebDevsdk from 'https://cdn.jsdelivr.net/npm/@thirdweb-dev/sdk@3.10.14/+esm'
    // let payload;
    // const evalCondition = (evt, data) => {
    //   if (!evt || !evt.detail) return;
    //   console.log(evt);
    //   console.log(data);
    //   const nft = evt.detail;
    //   const meta = JSON.parse(nft.metadata);
    //   console.log(meta);
    //   const img = meta.image.startsWith('ipfs://') ? `https://ipfs.moralis.io:2053/ipfs/${meta.image.split('ipfs://')[1]}` : meta.image;
    //   payload = {
    //     username: "Webstudio Webhook",
    //     avatar_url: "https://i.ibb.co/ZHC5n6b/S3-SNU-jpg-2.png",
    //     content: `You have just received a new nudge from a user!`,
    //     embeds: [
    //       {
    //         author: {
    //           name: nft.owner_of,
    //           url: "https://i.ibb.co/gtqZpcR/webstudiologo512-copy.png",
    //           icon_url: "https://i.ibb.co/gtqZpcR/webstudiologo512-copy.png",
    //         },
    //         title: `${nft.symbol} #${nft.token_id}`,
    //         url: `https://i.ibb.co/gtqZpcR/webstudiologo512-copy.png`,
    //         description: meta.description,
    //         color: 15258703,
    //         fields: [
    //           {
    //             name: "Owner",
    //             value: nft.owner_of,
    //             inline: true,
    //           },
    //           {
    //             name: "Token Address",
    //             value: nft.token_address,
    //             inline: true,
    //           },
    //           {
    //             name: "Token Id",
    //             value: nft.token_id,
    //             inline: true,
    //           },
    //         ],
    //         image: {
    //           url: img,
    //         },
    //         footer: {
    //           text: "Powered by Webstudio",
    //           icon_url: "https://i.ibb.co/gtqZpcR/webstudiologo512-copy.png",
    //         },
    //       },
    //     ],
    //   };
    //   //
    // };

    // document.addEventListener("onNFTSelect", evalCondition);

    // $(`#${componentId}`).click((el) => {
    //   console.log("Triggering event call");
    //   const options = {
    //     method: "POST",
    //     body: JSON.stringify(payload),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   fetch(props.value, options)
    //     .then((response) => response.json())
    //     .then((response) => {
    //       // Do something with response.
    //     });
    // });

    // evalCondition();
  };

  const properties = {
    isComponent: (el) => el.id === componentId,
    model: {
      defaults: {
        script,
        value: "https://discord.com/api/webhooks/1026427505659367505/3PJ43KrV7w-VxqntchVaZfeoZILSNA7PsjoYbXVjHI1fvVaIGRmQs4LdahiM4JDR8tm_",
        integration: { id: "discord", name: "Discord" },
        traits: [
          {
            changeProp: 1,
            type: "select",
            name: "integration",
            options: [{ id: "discord", name: "Discord" }],
          },
          {
            changeProp: 2,
            type: "Text",
            name: "value",
          },
        ],
        "script-props": ["integration", "value"],
      },
    },
  };

  editor.BlockManager.add(componentId, block);
  editor.DomComponents.addType(componentId, properties);
};

export default Plugin;
