import {FetchGet} from "../../../utils/FetchGet";
import {API_URL} from "../../../utils/FetchApi";

export const requestUsers = (setUsers) => {
    FetchGet(setUsers, API_URL.users);
}
export const requestRoles = (setRoles) => {
    FetchGet(setRoles, API_URL.roles);
}