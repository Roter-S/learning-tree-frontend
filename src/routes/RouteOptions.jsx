import {lazy} from "react";

const IndexLogin = lazy(() => import('../views/pages/auth/IndexLogin'));
const IndexNotFound = lazy(() => import('../views/pages/notFound/IndexNotFound'));
const IndexHome = lazy(() => import('../views/pages/home/IndexHome'));
const IndexDashboard = lazy(() => import('../views/pages/dashboard/IndexDashboard'));
const IndexUsers = lazy(() => import('../views/pages/users/IndexUsers'))
const IndexLoad = lazy(() => import('../component/layouts/IndexLoad'))

const routes = {
    notFound: "/*",
    home: "/",
    users: "/users",
    login: "/login",
    load: "/load",
}
export const RouteOptions = [
    {
        path: routes.login,
        element: <IndexLogin/>,
        isPrivate: false,
    }, {
        path: routes.notFound,
        element: <IndexNotFound/>,
        isPrivate: false,
    }, {
        path: routes.home,
        element: <IndexHome/>,
        isPrivate: true,
        children: [
            {
                element: <IndexDashboard/>,
                isPrivate: true,
                index:true,
            },{
                path: routes.users,
                element: <IndexUsers/>,
                isPrivate: true,
            }, {
                path: routes.load,
                element: <IndexLoad/>,
                isPrivate: true,
            }
        ]
    }
]