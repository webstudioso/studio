/*eslint no-undef: "off"*/

const Plugin = (editor) => {
  const componentId = "nft-card";

  const block = {
    id: `section-${componentId}`,
    label: `
    <svg width="266" height="150" viewBox="0 0 266 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_3_77)">
    <path d="M0 0H266V150H0V0Z" fill="white"/>
    <path d="M166.433 29H99.5672C98.7016 29 98 29.9857 98 31.2016V117.798C98 119.014 98.7016 120 99.5672 120H166.433C167.298 120 168 119.014 168 117.798V31.2016C168 29.9857 167.298 29 166.433 29Z" fill="white" stroke="#CBD5E0"/>
    <path d="M112.668 89L143.833 57.8317L158 72.0024M112.668 89H152.332C155.465 89 158 86.4646 158 83.3317V43.6683C158 40.5354 155.465 38 152.332 38H112.668C109.535 38 107 40.5354 107 43.6683V83.3317C107 86.4646 109.535 89 112.668 89ZM126.832 53.5841C126.848 54.1526 126.751 54.7187 126.545 55.2488C126.339 55.7789 126.028 56.2623 125.632 56.6703C125.236 57.0783 124.762 57.4027 124.238 57.6242C123.714 57.8457 123.151 57.9598 122.582 57.9598C122.014 57.9598 121.451 57.8457 120.927 57.6242C120.403 57.4027 119.929 57.0783 119.533 56.6703C119.136 56.2623 118.826 55.7789 118.62 55.2488C118.414 54.7187 118.316 54.1526 118.333 53.5841C118.365 52.4787 118.827 51.4293 119.621 50.6588C120.414 49.8883 121.476 49.4574 122.582 49.4574C123.688 49.4574 124.751 49.8883 125.544 50.6588C126.337 51.4293 126.799 52.4787 126.832 53.5841V53.5841Z" stroke="#A0AEC0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M107 107.143C107 106.84 107.107 106.549 107.299 106.335C107.49 106.12 107.749 106 108.02 106H156.98C157.251 106 157.51 106.12 157.701 106.335C157.893 106.549 158 106.84 158 107.143C158 107.446 157.893 107.737 157.701 107.951C157.51 108.165 157.251 108.286 156.98 108.286H108.02C107.749 108.286 107.49 108.165 107.299 107.951C107.107 107.737 107 107.446 107 107.143ZM107 112.857C107 112.554 107.107 112.263 107.299 112.049C107.49 111.835 107.749 111.714 108.02 111.714H148.82C149.091 111.714 149.35 111.835 149.541 112.049C149.733 112.263 149.84 112.554 149.84 112.857C149.84 113.16 149.733 113.451 149.541 113.665C149.35 113.88 149.091 114 148.82 114H108.02C107.749 114 107.49 113.88 107.299 113.665C107.107 113.451 107 113.16 107 112.857Z" fill="#A0AEC0"/>
    <path d="M107 97.5C107 97.1022 107.144 96.7206 107.402 96.4393C107.659 96.158 108.008 96 108.371 96H137.629C137.992 96 138.341 96.158 138.598 96.4393C138.856 96.7206 139 97.1022 139 97.5C139 97.8978 138.856 98.2794 138.598 98.5607C138.341 98.842 137.992 99 137.629 99H108.371C108.008 99 107.659 98.842 107.402 98.5607C107.144 98.2794 107 97.8978 107 97.5Z" fill="#4A5568"/>
    </g>
    <defs>
    <clipPath id="clip0_3_77">
    <rect width="266" height="150" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
    `,
    category: "NFT",
    content: `
      <div class="container" id="${componentId}">
        <div class="row">
          <div class="col">
            <div class="card nft-card" id="nft-container-1">
              <img id="nft-image-1" src="https://lstr.by/wp-content/uploads/woocommerce-placeholder-400x400.png" />
              <div id="nft-title-1">Title</div>
              <div id="nft-description-1">Description</div>
            </div>
          </div>
        </div>
      </div>
      <style>
        .nft-card {
          padding: 20px;
          height: auto;
          background: rgba(255,255,255,0.95);
          color: #666;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.1);
        }
        .nft-card img {
          margin: 0 auto;
          border-radius: 8px;
          margin-bottom: 10px;
        }
        #${componentId} row {
          padding: 2px;
        }
        #${componentId} col {
          padding: 2px;
        }
        #${componentId} {
          padding: 20px;
        }
      </style>`,
  };

  const script = function (props) {
    const componentId = "nft-card";
    console.log(`Running script ${componentId}`);
    if (!props.contract) return;

    const dispatchNFTEvent = (nft) => {
      document.dispatchEvent(new CustomEvent("onNFTSelect", { detail: nft }));
      console.log(`Event dispatched with content ${nft}`);
    };

    const evalCondition = () => {
      const account = getAccount();

      $(".nft-card").click((el) => {
        const nft = el.target.getAttribute("data-metadata");
        dispatchNFTEvent(JSON.parse(nft));
      });

      console.log(`Fetching moralis with key ${process.env.REACT_APP_MORALIS}`);
      fetch(
        `https://deep-index.moralis.io/api/v2/${account}/nft?chain=${props.network}&format=decimal&limit=1&token_addresses=${props.contract}`,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((result) => result.json())
      .then((data) => {
        const list = data.result;
        $(".nft-card").css("display", "block");
  
        list.forEach((item, index) => {
          const meta = JSON.parse(item.metadata);
          const imageDisplay = meta.image.startsWith('ipfs://') ? `https://ipfs.moralis.io:2053/ipfs/${meta.image.split('ipfs://')[1]}` : meta.image;
          $(`#nft-container-${index + 1}`).attr(
            "data-metadata",
            JSON.stringify(item)
          );
          $(`#nft-image-${index + 1}`).attr("src", imageDisplay);
          $(`#nft-title-${index + 1}`).text(`${item.symbol} #${item.token_id}`);
          $(`#nft-description-${index + 1}`).text(item.name);
          dispatchNFTEvent(item);
        });
      });
    };

    const getAccount = () => {
      const provider = window.walletProvider;
      if (!provider) return;

      if (provider.accounts && provider.accounts.length > 0)
        return provider.accounts[0];

      return provider.selectedAddress;
    };

    const hide = () => {
      $(".nft-card").css("display", "none");
    };

    document.addEventListener("Connected", () => evalCondition());
    document.addEventListener("accountsChanged", () => evalCondition());
    document.addEventListener("chainChanged", () => evalCondition());
    document.addEventListener("networkChanged", () => evalCondition());
    document.addEventListener("onDisconnect", () => hide());

    evalCondition();
  };

  const properties = {
    isComponent: (el) => el.id === componentId,
    model: {
      defaults: {
        script,
        contract: "0x93FF8c6E074a97d60328a6823633b6dE93Da8F55",
        network: "eth",
        traits: [
          {
            changeProp: 1,
            type: "text",
            name: "contract",
          },
          {
            changeProp: 1,
            type: "text",
            name: "network",
          }
        ],
        "script-props": ["contract", "network"],
      },
    },
  };

  editor.BlockManager.add(componentId, block);
  editor.DomComponents.addType(componentId, properties);
};

export default Plugin;
