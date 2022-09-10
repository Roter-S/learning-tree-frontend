import {get} from "lodash";

const token = localStorage.getItem('token');
export const FetchShow = (url, setData, id) => {
    fetch(url + '/' + id, {
        method: "GET", headers: new Headers({
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        })
    }).then(res => res.json())
        .then(response => {
            const data = get(response, 'data', {})
            const id = get(data, 'id', '')
            const attributes = get(data, 'attributes', {})
            const roles = []
            if (data && data.type === 'user') {
                const userRoles = get(data, 'attributes.roles', [])
                userRoles.forEach(role => {
                    roles.push(role.id.toString())
                })
            }
            let obj = {...attributes, id: id, roles: roles}
            setData(obj)
        })
        .catch(error => console.log(error));
}