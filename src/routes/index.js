import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// routes
// import BuilderRoutes from "routes/BuilderRoutes";
import Loadable from "ui-component/Loadable";
import ProfileGuard from "utils/route-guard/ProfileGuard";

const NewProject = Loadable(lazy(() => import("views/new")));
const ProfileAdmin = Loadable(lazy(() => import("views/profile/admin")));
const Signin = Loadable(lazy(() => import("views/signin")));
const ProjectsPage = Loadable(
	lazy(() => import("views/profile/admin/projects"))
);
const EditorView = Loadable(lazy(() => import("views/builder")));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
	return useRoutes([
		// { path: "/", element: <PagesLanding /> },
		// { path: "/:id", element: <PublicProfile /> },
		{ path: "/", element: <Signin /> },
		// { path: "/templates", element: <MarketplacePage /> },
		{ path: "/new", element: <NewProject /> },
		{ path: "/builder/:projectId", element: <EditorView /> },
		{
			path: "/profile",
			element: (
				<ProfileGuard>
					<ProfileAdmin />
				</ProfileGuard>
			),
			children: [
				{
					path: "/profile/projects",
					element: <ProjectsPage />
				}
			]
		}
	]);
}
