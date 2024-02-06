const constants = {
	IPFS_PROVIDER: 'https://gateway.ipfs.io/ipfs',
	DEFAULT_LOCALE: 'en',
	CHANGELOG: {
		CACHE: 'CHANGELOG_CACHE',
		BASE_URL: 'https://s3.amazonaws.com/webstudio.changelog'
	},
	DOCS: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
	QUERY_PARAMS: {
		LOCALE: 'locale',
		EMAIL: 'email'
	},
	SUBSCRIPTION_PLAN: 'SUBSCRIPTION_PLAN',
	SESSION_DURATION_SEC: '21600', // 6 hours
	ANALYTICS: {
		CREATE_PROJECT: "project_create",
		PUBLISH_PROJECT: "project_publish",
		APP_OPEN: "app_open",
		AI_PROMPT: "prompt_ai",
		EDITOR_OPEN: "editor_open"
	},
	AUTH: {
		MAGIC_LINK: "magicLink",
		METAMASK: "metamask"
	},
	PATH: {
		ADMIN: '/e',
		CREATE: '/n',
		LOGIN: '/'
	},
	ERROR: {
		HANDLE_REGISTERED: "Handle already registered to an account",
		EMAIL_REGISTERED: "Email already registered to an account",
		MIN_LENGTH: "Handle name must be at least 4 characters long",
		MAX_LENGTH: "Handle name cannot be longer than 30 characters",
		INVALID_HANDLE_FORMAT:
			"Can only contain letters, numbers, hyphens and underscores",
		INVALID_EMAIL_FORMAT: "Invalid email format",
		INVALID_HANDLE: "Username does not exist"
	},
	PROVIDER: {
		MAGIC_LINK:
			"Magic is the #1 user authentication and private key management solution for Web3 and Web2. Secure, seamless, scalable, and future-proof."
	},
	EDITOR: {
		BUILDER: "builder",
		STUDIO: "studio"
	},
	SECTION: {
		BLOCKS: 'blocks',
		PAGES: 'pages',
		SETTINGS: 'settings',
		TEMPLATE: 'templates',
		MEDIA: 'media',
		DASHBOARD: 'dashboard',
		HELP: 'help',
		ADVANCED_STYLES: 'advanced_styles'
	},
	INFO_URL: {
		BLOCKS: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
		PAGES: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
		STYLE: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
		SETTINGS: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
		TEMPLATE: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
		MARKETPLACE: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
		PUBLISH: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
		MEDIA: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
		DASHBOARD: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
		NEW_TITLE: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
		HELP: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08',
		ACADEMY: 'https://www.youtube.com/playlist?list=PLIgTSKomaa7cbn2MygfYfMTnHWXaKsYwD',
		ADVANCED_STYLES: 'https://tailwindcss.com/docs/background-color'
	},
	EVENTS: {
		CLOSE_DELAY: 'addCloseDelay',
		TOGGLE_SETTINGS_MODAL: 'toggleSettingsModal',
		TOGGLE_ASSETS_MODAL: 'toggleAssetsModal',
		TOGGLE_PUBLISH_MODAL: 'togglePublishModal',
		WIZARD_OPEN: 'wizardOpen',
		TOGGLE_PREMIUM_MODAL: 'togglePremiumModal',
		TOGGLE_SAVE_TEMPLATE_MODAL: 'toggleSaveTemplateModal'
	},
	WIZARD: {
		SMART_CONTRACT: 'SMART_CONTRACT'
	},
	IMAGE_PLACEHOLDER:
		"https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=170667a&w=0&h=YGycIDbBRAWkZaSvdyUFvotdGfnKhkutJhMOZtIoUKY=",

	TAILWIND: {
		FONT_SIZES: [
			'text-xs',
			'text-sm',
			'text-base',
			'text-lg',
			'text-xl',
			'text-2xl',
			'text-3xl',
			'text-4xl',
			'text-5xl',
			'text-6xl',
			'text-7xl',
			'text-8xl',
			'text-9xl'
		],
		TEXT_ALIGNMENT: [
			'text-left',
			'text-right',
			'text-center',
			'text-justify'
		],
		FONT_WEIGHT: [
			'font-thin',
			'font-extralight',
			'font-light',
			'font-normal',
			'font-medium',
			'font-semibold',
			'font-bold',
			'font-extrabold',
			'font-black'
		],
		TEXT_FORMATS: [
			'font-bold',
			'underline',
			'italic'
		],
		FONT_COLORS: [
			'gray',
			'zinc',
			'slate',
			'neutral',
			'stone',
			'red',
			'orange',
			'amber',
			'yellow',
			'lime',
			'green',
			'emerald',
			'teal',
			'cyan',
			'sky',
			'blue',
			'indigo',
			'violet',
			'purple',
			'fuchsia',
			'pink',
			'rose'
		]
	},
	ANIMATIONS: [
        {
            name: 'None',
            value: '',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-slash" width="72" height="72" viewBox="0 0 24 24" stroke-width="1" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M17 5l-10 14" />
				</svg>`
        },
        {
            name: 'Bounce',
            value: 'animate__bounce',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bounce-right" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M4 15.5c3 -1 5.5 -.5 8 4.5c.5 -3 1.5 -5.5 3 -8" />
					<path d="M18 9a2 2 0 1 1 0 -4a2 2 0 0 1 0 4z" />
				</svg>`
        },
        {
            name: 'Flash',
            value: 'animate__flash',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flare" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M12 3l3 6l6 3l-6 3l-3 6l-3 -6l-6 -3l6 -3z" />
				</svg>`
        },
        {
            name: 'Pulse',
            value: 'animate__pulse',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wave-sine" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M21 12h-2c-.894 0 -1.662 -.857 -1.761 -2c-.296 -3.45 -.749 -6 -2.749 -6s-2.5 3.582 -2.5 8s-.5 8 -2.5 8s-2.452 -2.547 -2.749 -6c-.1 -1.147 -.867 -2 -1.763 -2h-2" />
				</svg>`
        },
        {
            name: 'Rubber Band',
            value: 'animate__rubberBand',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-keyframes" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M9.225 18.412a1.595 1.595 0 0 1 -1.225 .588c-.468 0 -.914 -.214 -1.225 -.588l-4.361 -5.248a1.844 1.844 0 0 1 0 -2.328l4.361 -5.248a1.595 1.595 0 0 1 1.225 -.588c.468 0 .914 .214 1.225 .588l4.361 5.248a1.844 1.844 0 0 1 0 2.328l-4.361 5.248z" />
					<path d="M17 5l4.586 5.836a1.844 1.844 0 0 1 0 2.328l-4.586 5.836" />
					<path d="M13 5l4.586 5.836a1.844 1.844 0 0 1 0 2.328l-4.586 5.836" />
				</svg>`
        },
        {
            name: 'Shake X',
            value: 'animate__shakeX',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrows-diff" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M11 16h10" />
					<path d="M11 16l4 4" />
					<path d="M11 16l4 -4" />
					<path d="M13 8h-10" />
					<path d="M13 8l-4 4" />
					<path d="M13 8l-4 -4" />
				</svg>`
        },
        {
            name: 'Shake Y',
            value: 'animate__shakeY',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrows-down-up" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M17 3l0 18" />
					<path d="M10 18l-3 3l-3 -3" />
					<path d="M7 21l0 -18" />
					<path d="M20 6l-3 -3l-3 3" />
				</svg>`
        },
        {
            name: 'Head Shake',
            value: 'animate__headShake',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alien" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M11 17a2.5 2.5 0 0 0 2 0" />
					<path d="M12 3c-4.664 0 -7.396 2.331 -7.862 5.595a11.816 11.816 0 0 0 2 8.592a10.777 10.777 0 0 0 3.199 3.064c1.666 1 3.664 1 5.33 0a10.777 10.777 0 0 0 3.199 -3.064a11.89 11.89 0 0 0 2 -8.592c-.466 -3.265 -3.198 -5.595 -7.862 -5.595z" />
					<path d="M8 11l2 2" />
					<path d="M16 11l-2 2" />
				</svg>`
        },
        {
            name: 'Swing',
            value: 'animate__swing',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-amazon" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M17 12.5a15.198 15.198 0 0 1 -7.37 1.44a14.62 14.62 0 0 1 -6.63 -2.94" />
					<path d="M19.5 15c.907 -1.411 1.451 -3.323 1.5 -5c-1.197 -.773 -2.577 -.935 -4 -1" />
				</svg>`
        },
        {
            name: 'Tada',
            value: 'animate__tada',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wand" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M6 21l15 -15l-3 -3l-15 15l3 3" />
					<path d="M15 6l3 3" />
					<path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
					<path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
				</svg>`
        },
        {
            name: 'Wobble',
            value: 'animate__wobble',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-barrel" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M7.278 4h9.444a2 2 0 0 1 1.841 1.22c.958 2.26 1.437 4.52 1.437 6.78c0 2.26 -.479 4.52 -1.437 6.78a2 2 0 0 1 -1.841 1.22h-9.444a2 2 0 0 1 -1.841 -1.22c-.958 -2.26 -1.437 -4.52 -1.437 -6.78c0 -2.26 .479 -4.52 1.437 -6.78a2 2 0 0 1 1.841 -1.22z" />
					<path d="M14 4c.667 2.667 1 5.333 1 8s-.333 5.333 -1 8" />
					<path d="M10 4c-.667 2.667 -1 5.333 -1 8s.333 5.333 1 8" />
					<path d="M4.5 16h15" />
					<path d="M19.5 8h-15" />
				</svg>`
        },
        {
            name: 'Jello',
            value: 'animate__jello',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-balloon" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M14 8a2 2 0 0 0 -2 -2" />
					<path d="M6 8a6 6 0 1 1 12 0c0 4.97 -2.686 9 -6 9s-6 -4.03 -6 -9" />
					<path d="M12 17v1a2 2 0 0 1 -2 2h-3a2 2 0 0 0 -2 2" />
				</svg>`
        },
        {
            name: 'Hear Beat',
            value: 'animate__heartBeat',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heartbeat" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572" />
						<path d="M3 13h2l2 3l2 -6l1 3h3" />
					</svg>`
        },
		{
            name: 'Fade In',
            value: 'animate__fadeIn',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-gradienter" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M3.227 14c.917 4 4.497 7 8.773 7c4.277 0 7.858 -3 8.773 -7" />
					<path d="M20.78 10a9 9 0 0 0 -8.78 -7a8.985 8.985 0 0 0 -8.782 7" />
					<path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
				</svg>`
        },
		{
            name: 'Fade In Left',
            value: 'animate__fadeInLeft',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-to-right" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M14 12l-10 0" />
					<path d="M14 12l-4 4" />
					<path d="M14 12l-4 -4" />
					<path d="M20 4l0 16" />
				</svg>`
        },
		{
            name: 'Fade In Right',
            value: 'animate__fadeInRight',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-to-left" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M10 12l10 0" />
					<path d="M10 12l4 4" />
					<path d="M10 12l4 -4" />
					<path d="M4 4l0 16" />
				</svg>`
        },
		{
            name: 'Fade In Down',
            value: 'animate__fadeInDown',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-to-down" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M4 20l16 0" />
					<path d="M12 14l0 -10" />
					<path d="M12 14l4 -4" />
					<path d="M12 14l-4 -4" />
				</svg>`
        },
		{
            name: 'Fade In Up',
            value: 'animate__fadeInUp',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-to-up" width="72" height="72" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M12 10l0 10" />
					<path d="M12 10l4 4" />
					<path d="M12 10l-4 4" />
					<path d="M4 4l16 0" />
				</svg>`
        }
    ],
	ANIMATIONS_BASE: 'animate__animated',
	LINK: {
		NONE: 'none',
		DOCUMENT: 'document',
		PHONE: 'phone',
		PAGE: 'page',
		PAGE_TOP_BOTTOM: 'topPage',
		WEB: 'webAddress',
		EMAIL: 'email',
		SECTION: 'section'
	},
	LINK_PREFIX: {
		SECTION: '#',
		PAGE: '/',
		WEB: 'http',
		TOP: '#top',
		BOTTOM: '#bottom',
		EMAIL: 'mailto',
		PHONE: 'tel'
	},
	LINK_ACTION: {
		NEW_TAB: 'new_tab',
		CURRENT_TAB: 'current_tab'
	}
};

export default constants;
