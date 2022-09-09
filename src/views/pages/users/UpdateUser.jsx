import React, {useCallback, useEffect, useState} from "react";
import FetchPost from "../../../utils/FetchPost";
import {API_URL} from "../../../utils/FetchApi";
import ModalForm from "../../../component/common/ModalForm";
import userForm from "./userForm";
import {onChangeUser} from "./Utilities";



export const UpdateUser = (
    {
        user,
        roles,
        updateShowModal,
        setUpdateShowModal,
        updateUserData
    }) => {
    const [fields, setFields] = useState(user)
    const handleOnChange = onChangeUser(fields, setFields);
    useEffect(()=>{
        if(updateUserData && Object.keys(updateUserData).length){
            setFields(updateUserData)
        }
    },[updateUserData])
    const updateUser = useCallback(async (e) => {
        e.preventDefault()
        await FetchPost(API_URL.users, fields)
    }, [fields])

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