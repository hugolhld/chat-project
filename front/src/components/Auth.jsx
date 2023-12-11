import { createAuthProvier } from 'react-token-auth'

// type Session = { accessToken: string; refreshToken: string };

// export const {useAuth, authFetch, login, logout} = createAuthProvier({
//     getAccessToken: 'accessToken',
//     storage: localStorage,
//     onUpdateToken: token =>
//         fetch('/update-token', {
//             method: 'POST',
//             body: token.refreshToken,
//         }).then(r => r.json()),
// })

export const logout = () => {
    localStorage.removeItem('token')
}

export const getToken = () => {
    return localStorage.getItem('token')
}