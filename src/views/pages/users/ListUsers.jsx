import React, { useEffect, useState, useCallback } from "react";
import { get } from 'lodash';
import { requestRoles, requestUsers } from './Utilities'
import FetchPost from "../../../utils/FetchPost";
import { API_URL } from "../../../utils/FetchApi";
import ModalForm from "../../../component/common/ModalForm";
import Button from 'react-bootstrap/Button';
const user = {
    "name": "", "last_name": "", "email": "", "date_of_birth": "", "password": "", "roles": []
}

export const ListUsers = () => {
    const [refresh, setRefresh] = useState(false)
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [fields, setFields] = useState(user)
    const [modalShow, setModalShow] = React.useState(false);

    const handleOnChange = (event, key) => {
        if (key === 'roles') {
            let roles = fields['roles']
            let rolIndex = roles.indexOf(event)
            if (rolIndex > -1) {
                roles.splice(rolIndex, 1)
            } else {
                roles.push(event)
            }
            setFields((prevState) => ({
                ...prevState, [key]: roles,
            }));
        } else {
            event.preventDefault();
            const value = event.target.value;
            setFields((prevState) => ({
                ...prevState, [key]: value,
            }));
        }
    };
    const createUser = useCallback(async (e) => {
        e.preventDefault()
        await FetchPost(API_URL.users, fields)
    }, [fields])

    useEffect(() => {
        requestUsers(setUsers);
        requestRoles(setRoles);
    }, [refresh])

    return (<div className="container">
        <div className="table-responsive">
            <p className="font-open-sans display-6 text-light">Usuarios</p>

            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button>
            <ModalForm
                show={modalShow}
                onHide={() => setModalShow(false)}
            ></ModalForm>



            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createUserModal">
                <i className="fa-solid fa-user-plus"></i>
                Crear
            </button>

            <div className="modal fade" id="createUserModal" tabIndex="-1" aria-labelledby="createUserLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createUserLabel">Crear Usuario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3" onSubmit={createUser}>

                                <div className="col-md-6">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="name"
                                        onChange={(e) => {
                                            handleOnChange(e, "name")
                                        }}
                                        value={fields["name"] || ""}
                                        required
                                    />

                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="last_name" className="form-label">Apellido</label>
                                    <input type="text" className="form-control" id="last_name"
                                        onChange={(e) => {
                                            handleOnChange(e, "last_name")
                                        }}
                                        value={fields["last_name"] || ""}
                                        required
                                    />

                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                    <input type="email" className="form-control" id="email"
                                        onChange={(e) => {
                                            handleOnChange(e, "email")
                                        }}
                                        value={fields["email"] || ""}
                                        required
                                    />

                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="date_of_birth" className="form-label">
                                        Fecha de nacimiento</label>
                                    <input type="date" className="form-control" id="date_of_birth"
                                        onChange={(e) => {
                                            handleOnChange(e, "date_of_birth")
                                        }}
                                        value={fields["date_of_birth"] || ""}
                                        required
                                    />

                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="password"
                                        onChange={(e) => {
                                            handleOnChange(e, "password")
                                        }}
                                        value={fields["password"] || ""}
                                        required
                                    />

                                </div>
                                <div className="col-md-6">
                                    {roles.map(r => {
                                        const id = get(r, 'id', '')
                                        const name = get(r, 'attributes.name', '')
                                        return (<div key={id} className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id={id}
                                                onChange={() => {
                                                    handleOnChange(id, "roles")
                                                }}
                                                value={fields["roles"] || []}
                                                checked={fields["roles"] && fields['roles'].includes(id)}
                                            />
                                            <label className="form-check-label">
                                                {name}
                                            </label>
                                        </div>)
                                    })}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <table className="table text-center">
                <thead>
                    <tr className="text-light fw-bold">
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Correo electrónico</th>
                        <th scope="col">Fecha de inscripción</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-light">
                    {users.map(u => {
                        const id = get(u, 'id', '')
                        const name = get(u, 'attributes.name', '')
                        const last_name = get(u, 'attributes.last_name', '')
                        const email = get(u, 'attributes.email', '')
                        const date_of_birth = get(u, 'attributes.date_of_birth', '')
                        return (<tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{last_name}</td>
                            <td>{email}</td>
                            <td>{date_of_birth}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" className="btn btn-warning">
                                        <i className="fa-solid fa-user-pen"></i>
                                    </button>
                                    <button type="button" className="btn btn-danger">
                                        <i className="fa-solid fa-user-minus"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
        <button onClick={() => {
            setRefresh(!refresh)
        }}>refresh
        </button>
    </div>);
}