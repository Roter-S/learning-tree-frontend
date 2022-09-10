import React, {useCallback, useState} from "react";
import FetchPost from "../../../utils/FetchPost";
import {API_URL} from "../../../utils/FetchApi";
import ModalForm from "../../../component/common/ModalForm";
import Button from 'react-bootstrap/Button';
import userForm from "./userForm";
import {onChangeUser} from "./Utilities";

export const AddUser = (
    {
        user,
        roles,
        refreshUser
    }) => {
    const [fields, setFields] = useState(user)
    const [createShowModal, setCreateShowModal] = React.useState(false);
    const handleOnChange = onChangeUser(fields, setFields);
    const createUser = useCallback(async (e) => {
        e.preventDefault()
        await FetchPost(API_URL.users, fields)
        setCreateShowModal(false)
        refreshUser()
    }, [fields])

    return (
        <>
            <Button variant="primary" onClick={() => setCreateShowModal(true)}>
                Crear
            </Button>
            <ModalForm
                show={createShowModal}
                onHide={() => setCreateShowModal(false)}
                heading="Crear Usuario"
                component={userForm(createUser, handleOnChange, fields, roles, setCreateShowModal, true)}
            />
        </>);
}