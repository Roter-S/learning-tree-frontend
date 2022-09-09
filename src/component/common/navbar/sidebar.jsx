import React, {useState, useEffect} from "react"
import {NavLink, useLocation} from "react-router-dom";

export const Sidebar = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(true)
    useEffect(() => {
        window.addEventListener("resize", function () {
            setWidth(window.innerWidth)
        });
        showFunction(width)
    }, [width]);

    const showFunction = (width) => {
        if (width < 768) {
            setShow(false)
        } else {
            setShow(true)
        }
    }
    const location = useLocation()

    return (
        <div
            className={show ? "offcanvas offcanvas-start bg-transparent bg-blue sidebar-nav show d-block" : "offcanvas offcanvas-start bg-transparent bg-blue sidebar-nav"}
            data-bs-scroll="true"
            data-bs-backdrop="false"
            id="offcanvasAdmin"
            aria-labelledby="offcanvasAdminLabel"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title text-light" id="offcanvasLabel">Menú</h5>
                <button type="button" className="btn border-0 text-light d-md-none" data-bs-dismiss="offcanvas"
                        aria-label="Close">
                    <i className="fa-solid fa-circle-xmark fa-lg"></i>
                </button>
            </div>
            <div className="offcanvas-body">
                <div className="container">
                    <div className="row">
                        <NavLink
                            to={'/'}
                            className={({isActive}) =>
                                isActive ? 'bg-blue p-3 rounded-4 fs-6 text-decoration-none' : 'p-3 fs-6 text-decoration-none'
                            }
                        >
                            <i className={"fa-solid fa-chart-line p-2 rounded me-2 " + (location.pathname === '/' ? "bg-primary text-dark " : "bg-dark text-primary")}></i>
                            <span className={location.pathname === '/' ? "text-primary" : "text-muted"}>Dashboard</span>
                        </NavLink>
                        <NavLink
                            to={'/users'}
                            className={({isActive}) =>
                                isActive ? 'bg-blue p-3 rounded-4 fs-6 text-decoration-none ' : 'p-3 fs-6 text-decoration-none'
                            }
                        >
                            <i className={"fa-solid fa-users p-2 rounded me-2 " + (location.pathname === '/users' ? "bg-primary text-dark " : "bg-dark text-primary")}></i>
                            <span
                                className={location.pathname === '/users' ? "text-primary" : "text-muted"}>Usuarios</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}