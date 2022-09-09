import {FetchGet} from "../../../utils/FetchGet";
import {API_URL} from "../../../utils/FetchApi";

export const requestUsers = (setUsers) => {
    FetchGet(setUsers, API_URL.users);
}
export const requestRoles = (setRoles) => {
    FetchGet(setRoles, API_URL.roles);
}

export function onChangeUser(fields, setFields) {
    return (event, key) => {
        if (key === 'roles') {
            let userRoles = fields['roles']
            let rolIndex = userRoles.indexOf(event)
            if (rolIndex > -1) {
                userRoles.splice(rolIndex, 1)
            } else {
                userRoles.push(event)
            }
            setFields((prevState) => ({
                ...prevState, [key]: userRoles,
            }));
        } else {
            event.preventDefault();
            const value = event.target.value;
            setFields((prevState) => ({
                ...prevState, [key]: value,
            }));
        }
    };
}