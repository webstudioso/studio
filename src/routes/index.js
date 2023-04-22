import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import Loadable from 'ui-component/Loadable'
import AuthGuard from 'utils/route-guard/AuthGuard'

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
				<AuthGuard>
					<CreateProjectView />
				</AuthGuard> 
			)
		},
		{ 
			path: '/e', 
			element: (
				<AuthGuard>
					<DashboardView />
				</AuthGuard> 
			)
		},
		{ 
			path: '/e/:projectId', 
			element: (
				<AuthGuard>
					<EditorView />
				</AuthGuard> 
			)
		}
	])
}

export default ThemeRoutes
