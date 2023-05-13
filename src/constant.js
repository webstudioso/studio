const constants = {
	SESSION_DURATION_SEC: '21600', // 6 hours
	ANALYTICS: {
		CREATE_PROJECT: "project_create",
		PUBLISH_PROJECT: "project_publish",
		VIEW_PAGE: "page_view",
		AI_PROMPT: "prompt_ai"
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
		BLOCKS: 'BLOCKS',
		PAGES: 'PAGES',
		STYLE: 'STYLE',
		SETTINGS: 'SETTINGS',
		TEMPLATE: 'TEMPLATE',
		MARKETPLACE: 'MARKETPLACE',
		MEDIA: 'MEDIA',
		DASHBOARD: 'DASHBOARD',
		NEW_TITLE: 'NEW_TITLE',
		DASHBOARD_TITLE: 'DASHBOARD_TITLE',
		HELP: 'HELP'
	},
	SIDEPANEL: {
		TITLE: {
			BLOCKS: 'Add Elements',
			PAGES: 'Manage Pages',
			STYLE: 'Edit Style',
			SETTINGS: 'Configure Settings',
			TEMPLATE: 'Change Template',
			MARKETPLACE: 'Open Marketplace',
			MEDIA: 'Media',
			DASHBOARD: 'Back to Dashboard'
		}
	},
	INFO_TOOLTIP: {
		NEW_TITLE: 'The name will help your online audience identify your brand (4-30 characters)',
		DASHBOARD_TITLE: 'Launch the no-code editor for existing projects or create a new one. Here you can also delete projects',
		STYLE: 'Configure global color palette, fonts and general style',
		BLOCKS: 'Drag and drop new components into the canvas 👉',
		PAGES: 'Select current page, add new and manage existing pages',
		SETTINGS: 'Edit SEO settings, metadata tags and launch properties',
		TEMPLATE: 'Replace the current page template. This will discard all changes to the current page',
		MEDIA: 'Upload images and multimedia to your cloud storage to quickly use them in the editor',
		DASHBOARD: 'Manage your apps, view analytics and access learning resources'
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
		HELP: 'https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08'
	},
	EVENTS: {
		CLOSE_DELAY: 'addCloseDelay',
		TOGGLE_SETTINGS_MODAL: 'toggleSettingsModal',
		TOGGLE_ASSETS_MODAL: 'toggleAssetsModal',
		TOGGLE_PUBLISH_MODAL: 'togglePublishModal'
	},
	IMAGE_PLACEHOLDER:
		"https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=170667a&w=0&h=YGycIDbBRAWkZaSvdyUFvotdGfnKhkutJhMOZtIoUKY="
};

export default constants;
