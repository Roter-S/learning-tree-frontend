const proto = 'http'
const host = '127.0.0.1:8000/api'

export const API_URL = {
    "users": proto + '://' + host + '/users',
    "roles": proto + '://' + host + '/roles',
    "login": proto + '://' + host + '/login',
    "logout": proto + '://' + host + '/logout',
    "home": proto + '://' + host + '/home',
}
