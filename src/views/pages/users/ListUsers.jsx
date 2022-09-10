import React, {useEffect, useState, useCallback} from "react";
import {get} from 'lodash';
import {requestRoles, requestUsers} from './Utilities'
import {AddUser} from "./AddUser";
import {UpdateUser} from "./UpdateUser";
import {alertConfirm} from "../../../component/common/alertConfirm";
import {FetchDelete} from "../../../utils/FetchDelete";
import {API_URL} from "../../../utils/FetchApi";

const user = {
    "name": "", "last_name": "", "email": "", "date_of_birth": "", "password": "", "roles": []
}

export const ListUsers = () => {
    const [refresh, setRefresh] = useState(false)
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [updateShowModal, setUpdateShowModal] = React.useState(false);
    const [updateUserId, setUpdateUserId] = React.useState("");
    useEffect(() => {
        requestUsers(setUsers);
        requestRoles(setRoles);
    }, [refresh])

    const onDeleteUser = useCallback(async (id) => {
        await FetchDelete(API_URL.users, id)
        refreshUser()
    }, [refreshUser])

    const handleDelete = (id) => {
        let parameters = {
            title: 'Eliminar',
            text: '¿Esta seguro de eliminar?',
            icon: 'warning',
            titleConfirm: '¡Eliminado!',
            textConfirm: 'Usuario eliminado correctamente',
            confirmButtonText: 'Si, eliminar'
        }
        alertConfirm(parameters, onDeleteUser, id)
    }

    function refreshUser() {
        setRefresh(!refresh)
    }

    return (<div className="container">
        <div className="table-responsive">
            <p className="font-open-sans display-6 text-light">Usuarios</p>
            {AddUser({user, roles, refreshUser})}
            {UpdateUser({user, roles, updateShowModal, setUpdateShowModal, updateUserId, refreshUser})}
            <button className="btn btn-info" onClick={() => {
                refreshUser();
            }}>
                <i className="fa-solid fa-rotate"></i>
            </button>
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
                            <div className="btn-group" role="group">
                                <button
                                    type="button"
                                    key={id}
                                    className="btn btn-warning"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setUpdateUserId(get(u, 'id', ''))
                                        setUpdateShowModal(true)
                                    }}
                                >
                                    <i className="fa-solid fa-user-pen"></i>
                                </button>
                                <button type="button" className="btn btn-danger"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDelete(get(u, 'id', ''))
                                        }}
                                >
                                    <i className="fa-solid fa-user-minus"></i>
                                </button>
                            </div>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    </div>);
}