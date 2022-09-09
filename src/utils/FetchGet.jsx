import {get} from "lodash";

const token = localStorage.getItem('token');
export const FetchGet = (setData, url) => {
    fetch(url, {
        method: "GET", headers: new Headers({
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        })
    }).then(res => res.json())
        .then(response => {
            const data = get(response, 'data', [])
            setData(data)
        })
        .catch(error => console.log(error));
}