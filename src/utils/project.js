import { getUrl } from 'utils/url'

export const saveProject = async ({ project, provider, user }) => {
	const Model = provider.Object.extend("Project")
	const query = new provider.Query(Model)
	query.equalTo("objectId", project.appId)
	query.equalTo("owner", user)
	const proj = await query.first()
	proj.set("config", project)
	await proj.save()
}

export const getProjectUrl = ({ project }) => {
	const target = project || window.project
	if (!target) return
	const domain = target.domain ? `https://${target.domain}` : getUrl(target.subdomain)
	return domain
}

export const getDefaultMetadataForProject = ({ project }) => {
	const icon = 'https://i.ibb.co/t88r0BM/logo.png'
	const banner = 'https://i.ibb.co/Jn4xKgR/Banner-New-Regular-White.png'
	const name = project.name
	const url = getProjectUrl({ project })
	const metadata = {
		"icon": icon,							// link rel
		"title": name, 							// name, content
		"description": name, 					// name, content
		"author": url, 							// name, content
		"article:publisher": url,				// name, content
		// <!-- Open Graph / Facebook -->
		"og:locale": "en_US", 					// property, content
		"og:type": "website",					// property, content
		"og:url": url,							// property, content
		"og:site_name": name,					// property, content
		"og:title": name,						// property, content
		"og:description": name, 				// property, content
		"og:image": banner,						// property, content
		// <!-- Twitter -->
		"twitter:card": "summary_large_image", 	// property, content
		"twitter:title": name,					// property, content
		"twitter:url": url,						// property, content
		"twitter:description": name,			// property, content
		"twitter:image": banner,				// property, content
		"twitter:creator": url					// name, content
	}

	return metadata
}

const MEMO = 'WSProject'
export const memoProject = (project) => {
	localStorage.setItem(MEMO, project)
}

export const getMemoedProject = () => {
	return localStorage.getItem(MEMO)
}

export const forgetMemoProject = () => {
	localStorage.removeItem(MEMO)
}