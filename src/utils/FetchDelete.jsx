import {get} from "lodash";
import {Toast} from "../component/common/Toast";

const token = localStorage.getItem('token');
export const FetchDelete = (url, id) => {
    fetch(url + '/' + id, {
        method: "Delete", headers: new Headers({
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        })
    }).then(res => res.json())
        .then(response => {
            const message = get(response, 'data.attributes.message', '')
            if (message) {
                Toast.fire({
                    icon: 'success', title: message
                })
            }

        })
        .catch(error => console.log(error));
}