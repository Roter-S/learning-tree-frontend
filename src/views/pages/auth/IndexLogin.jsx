import React, {useState, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import UserSession from "../../../utils/UserSession"

const IndexLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        login().then(r => true)
    }
    const login = useCallback(async () => {
        await UserSession(email, password, navigate)
    }, [email, password, navigate])

    return (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
            <div className="card bg-dark col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 text-info">
                <div className="card-header text-center">
                    <p className="mt-3">
                        <i className="fa-solid fa-tree-city me-2 text-success fa-3x"></i>
                        <span className="font-raleway display-4 text-info fw-bold">
                            Learning Tree
                        </span>
                    </p>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email-login" className="form-label">Correo electrónico</label>
                            <input type="email"
                                   className="form-control border-0"
                                   placeholder="nombre@ejemplo.com"
                                   onChange={e => setEmail(e.target.value)}
                                   value={email}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password-login" className="form-label">Contraseña</label>
                            <input type="password"
                                   className="form-control border-0"
                                   placeholder="Contraseña"
                                   onChange={e => setPassword(e.target.value)}
                                   value={password}
                            />
                        </div>
                        <div className="mb-3 text-center d-grid">
                            <button type="submit" className="btn btn-primary">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default IndexLogin