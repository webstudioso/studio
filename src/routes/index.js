import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import Loadable from 'ui-component/Loadable'
import ProfileGuard from 'utils/route-guard/ProfileGuard'

const CreateProjectView = Loadable(lazy(() => import('views/new')))
const LoginView = Loadable(lazy(() => import('views/login')))
const EditorView = Loadable(lazy(() => import('views/builder')))
const DashboardView = Loadable(lazy(() => import('views/projects')))

// ==============================|| ROUTING RENDER ||============================== //

const ThemeRoutes = () => {
	return useRoutes([
		{ 
			path: '/', 
			element: <LoginView /> 
		},
		{ 
			path: '/n', 
			element: (
				<ProfileGuard>
					<CreateProjectView />
				</ProfileGuard> 
			)
		},
		{ 
			path: '/e', 
			element: (
				<ProfileGuard>
					<DashboardView />
				</ProfileGuard> 
			)
		},
		{ 
			path: '/e/:projectId', 
			element: (
				<ProfileGuard>
					<EditorView />
				</ProfileGuard> 
			)
		}
	])
}

export default ThemeRoutes
