const BACKEND = 'http://localhost:3001'
const COVID_API = 'https://covid19-api.org/api'
const PROXY = 'https://cors-anywhere.herokuapp.com/'

// external api
export const fetchLatestStatus = () => {
    return fetch(COVID_API + '/status')
    .then(r => r.json())
}

export const fetchLatestDiff = () => {
    return fetch(COVID_API + '/diff')
    .then(r => r.json())
}

export const fetchDiffByCountry = (country) => {
    return fetch(COVID_API + `/diff/${country}`)
    .then(r => r.json())
}


// backend api

export const fetchCreateUser = (user_params) => {
    return fetch( BACKEND + '/users', {
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

export const fetchLoginUser = (login_params) => {
    console.log(BACKEND)
    return fetch( BACKEND + '/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(login_params)
    })
    .then(r => r.json())
}

export const fetchUpdateEmail = (email, token) => {
    return fetch( BACKEND + '/users', {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            email: email
        })
    })
    .then(r => r.json())
}

export const fetchDeleteUser = (token) => {
    return  fetch( BACKEND + '/users', {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(r => r.json())
}