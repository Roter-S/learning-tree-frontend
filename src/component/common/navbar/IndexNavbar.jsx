import React from "react";
import {Sidebar} from "./sidebar";
import {API_URL} from "../../../utils/FetchApi";
import {useNavigate} from "react-router-dom";
import {Toast} from "../Toast";
import {Dropdown} from "react-bootstrap";

export const IndexNavbar = (props) => {
    const token = localStorage.getItem('token');
    let navigate = useNavigate();
    const logout = () => {
        fetch(API_URL.logout, {
            method: "POST", headers: new Headers({
                "Accept": "application/json", "Authorization": `Bearer ${token}`,
            }),
        }).then(res => res.json())
            .then(response => {
                localStorage.clear();
                Toast.fire({
                    icon: 'success', title: response.message
                })
                navigate('/login', {replace: true})
            })
    }
    return (<>
        <nav className="navbar navbar-expand-lg fixed-top bg-blur shadow-lg">
            <div className="container-fluid">
                <button className="navbar-toggler text-light d-md-none" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasAdmin" aria-controls="offcanvasAdmin">
                    <i className="fa-solid fa-bars"></i>
                </button>
                <a className="navbar-brand" href="/">
                    <i className="fa-solid fa-tree-city me-2 text-success fa-1x"></i>
                    <span className="font-raleway text-info fw-bold">
                            Learning Tree
                        </span>
                </a>

                <div className="d-flex">
                    <Dropdown
                        drop="start"
                    >
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                            {props.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item onClick={logout}>
                                <i className="fa-solid fa-right-from-bracket me-2"></i>
                                Cerrar sesi??n
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
            </div>
        </nav>

        <Sidebar/>
    </>)
}