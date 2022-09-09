import {get} from "lodash";
import React from "react";

export default function userForm(fetchFn, handleOnChange, fields, roles, setModalShow, isAdd) {
    return <form className="row g-3" onSubmit={fetchFn}>

        <div className="col-md-6">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="name"
                   onChange={(e) => {
                       handleOnChange(e, "name")
                   }}
                   value={fields["name"] || ""}
                   defaultValue={fields["name"] || ""}
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
                   defaultValue={fields["last_name"] || ""}
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
                   defaultValue={fields["email"] || ""}
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
                   defaultValue={fields["date_of_birth"] || ""}
                   required
            />

        </div>
        {isAdd &&
        <div className="col-md-6">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password"
                   onChange={(e) => {
                       handleOnChange(e, "password")
                   }}
                   value={fields["password"] || ""}
                   defaultValue={fields["password"] || ""}
                   required
            />

        </div>
        }
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
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModalShow(false)}
            >
                Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
                Guardar
            </button>
        </div>
    </form>;
}