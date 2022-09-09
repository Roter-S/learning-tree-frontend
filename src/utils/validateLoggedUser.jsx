const token = localStorage.getItem('token');

export const ValidateLoggedUser = (navigate) => {
    if (!token) {
        navigate('/login', {replace: true})
    }
}