import React, {useCallback, useEffect, useState} from "react";
import FetchPut from "../../../utils/FetchPut";
import {API_URL} from "../../../utils/FetchApi";
import ModalForm from "../../../component/common/ModalForm";
import userForm from "./userForm";
import {onChangeUser, requestUser} from "./Utilities";

export const UpdateUser = (
    {
        user,
        roles,
        updateShowModal,
        setUpdateShowModal,
        updateUserId,
        refreshUser
    }) => {
    const [fields, setFields] = useState(user)
    const handleOnChange = onChangeUser(fields, setFields);
    useEffect(() => {
        if (updateUserId) {
            requestUser(setFields, updateUserId)
        }
    }, [updateUserId])

    const updateUser = useCallback(async (e) => {
        e.preventDefault()
        await FetchPut(API_URL.users, fields, updateUserId)
        setUpdateShowModal(false)
        refreshUser()
    }, [fields, refreshUser, setUpdateShowModal, updateUserId])

    return (
        <>
            <ModalForm
                show={updateShowModal}
                onHide={() => setUpdateShowModal(false)}
                heading="Actualizar Usuario"
                component={userForm(updateUser, handleOnChange, fields, roles, setUpdateShowModal)}
            />
        </>);
}