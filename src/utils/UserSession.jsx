import {get} from "lodash";
import {Toast} from "../component/common/Toast";
import {API_URL} from "./FetchApi";

export default async function UserSession(email, password, navigate) {
    fetch(API_URL.login, {
        method: "POST", headers: new Headers({
            "Content-Type": 'application/json', "Accept": "application/json"
        }), body: JSON.stringify({email, password})
    }).then(res => res.json())
        .then(response => {
            const errors = get(response, 'message', []), token = get(response, 'token', []),
                name = get(response, 'name', []), user_id = get(response, 'user_id', []);
            if (errors.length > 0) {
                Toast.fire({
                    icon: 'warning', title: errors,
                })
            } else if (token) {
                localStorage.setItem('token', token)
                localStorage.setItem('email', email)
                localStorage.setItem('user_id', user_id)
                localStorage.setItem('name', name)
                Toast.fire({
                    icon: 'success', title: 'Sesión iniciada exitosamente!'
                })
                setTimeout(function () {
                    navigate('/', {replace: true})
                }, 1000)
            } else {
                Toast.fire({
                    icon: 'error', title: 'Algo salio mal'
                })
            }
        })
}