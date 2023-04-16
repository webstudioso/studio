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

export const getProjectUrl = () => {
	const project = window?.webstudio?.project
	if (!project) return
	const domain = project.custom ? `https://${project.custom}` : getUrl(project.subdomain)
	return domain
}