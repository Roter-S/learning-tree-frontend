import React, {useEffect, useState} from "react";
import {get} from 'lodash';
import {requestRoles, requestUsers} from './Utilities'
import {AddUser} from "./AddUser";
import {UpdateUser} from "./UpdateUser";
const user = {
    "name": "", "last_name": "", "email": "", "date_of_birth": "", "password": "", "roles": []
}

export const ListUsers = () => {
    const [refresh, setRefresh] = useState(false)
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [updateShowModal, setUpdateShowModal] = React.useState(false);
    const [updateUserData, setUpdateUserData] = React.useState("");
    useEffect(() => {
        requestUsers(setUsers);
        requestRoles(setRoles);
    }, [refresh])

    return (<div className="container">
        <div className="table-responsive">
            <p className="font-open-sans display-6 text-light">Usuarios</p>
            {AddUser({user, roles})}
            {UpdateUser({user, roles, updateShowModal, setUpdateShowModal, updateUserData})}

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
                    console.log(u)
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
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => {
                                        setUpdateShowModal(true)
                                        setUpdateUserData(get(u, 'attributes'))
                                    }}
                                >
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