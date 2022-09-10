import {get} from "lodash";
import {Toast} from "../component/common/Toast";
import 'bootstrap/dist/js/bootstrap.min.js';

const token = localStorage.getItem('token');
export default async function FetchPut(url, fields, id) {
    fetch(url + '/' + id, {
        method: "PUT", headers: new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }), body: JSON.stringify(fields)
    }).then(res => res.json())
        .then(response => {
            const errors = get(response, 'message', []);
            if (errors.length > 0) {
                Toast.fire({
                    icon: 'warning', title: errors,
                })
            } else {
                Toast.fire({
                    icon: 'success', title: 'Usuario Actualizado'
                })
            }
        })
        .catch(error => console.log(error));
}