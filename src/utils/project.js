import { getPrimaryUrl, getUrl } from 'utils/url'

export const saveProject = async ({ project, provider, user }) => {
	const Model = provider.Object.extend("Project")
	const query = new provider.Query(Model)
	query.equalTo("objectId", project.appId)
	query.equalTo("owner", user)
	const proj = await query.first()
	proj.set("config", project)
	await proj.save()
}

export const getProjectUrl = () => {
	const project = window?.webstudio?.project
	if (!project) return
	const domain = project.custom ? `https://${project.custom}` : getUrl(project.subdomain)
	return domain
}

export const getDefaultMetadataForProject = ({ project={} }) => {
	const icon = 'https://bafybeiegsrpk6d3kxibpp24gtnzkrty4t7l4rroki7ja6tjpokt447gji4.ipfs.w3s.link/Transparent.png'
	const banner = 'https://bafybeifsv6zg4ba2sdeyajuqfe2z7vww2n2qh7ujqxyzrdmivzeu5m6s2i.ipfs.w3s.link/Banner.png'
	const description = 'Created with Webstudio'
	const url = getPrimaryUrl(project)
	const metadata = {
		"title": project.name,
		"description": description,
		"author": url,
		"og:locale": "en_US",
		"og:type": "website",
		"og:url": url,
		"og:site_name": project.name,
		"article:publisher": url,
		"og:title": project.name,
		"og:description": description,
		"og:image": banner,
		"twitter:card": "summary_large_image",
		"twitter:url": url,
		"twitter:title": project.name,
		"twitter:description": description,
		"twitter:image": banner,
		"icon": icon
	}

	return metadata
}