import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexLoad from "../component/layouts/IndexLoad";
import {RouteOptions} from './RouteOptions'

const IndexRoutes = () => {

    return (
        <React.Suspense fallback={<IndexLoad/>}>
            <BrowserRouter>
                <Routes>
                    {RouteOptions.map((route, idx) => {
                        return <Route
                            key={idx}
                            path={route.path}
                            element={route.element}
                        >
                            {route && route.children && route.children.length && route.children.map((children, idx) => {
                                return <Route
                                    key={idx}
                                    index={children.index}
                                    path={children.path}
                                    element={children.element}
                                />
                            })}
                        </Route>
                    })}
                </Routes>
            </BrowserRouter>
        </React.Suspense>
    )
}

export default IndexRoutes