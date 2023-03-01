export const saveProject = async ({ project, provider, user }) => {
	const Model = provider.Object.extend("Project");
	const query = new provider.Query(Model);
	query.equalTo("objectId", project.appId);
	query.equalTo("owner", user);
	const proj = await query.first();
	proj.set("config", project);
	await proj.save();
};
