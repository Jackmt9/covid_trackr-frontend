const BACKEND = "127.0.0.1:3001"
const COVIDAPI = 'https://covid19-api.org/api'

export const fetchCreateUser = (user_params) => {
        fetch( BACKEND + '/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: user_params
        // ex. {
//         "first_name": "John",
//         "last_name": "Doe",
//         "username": "JDOE",
//         "email": "jdoe@gmail.com",
//         "password": "pass"
// }
    })
    .then(r => r.json())
}

export const fetchLoginUser = (username, password) => {
    login_info = { username: username, password: password }
    fetch( BACKEND + '/login', {
        body: login_info
    })
    .then(r => r.json())
}

export const fetchUpdateEmail = (email, token) => {
    fetch( BACKEND + '/users', {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: {
            email: email
        }
    })
    .then(r => r.json())
}

export const fetchDeleteUser = (token) => {
    fetch( BACKEND + '/users', {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(r => r.json())
}