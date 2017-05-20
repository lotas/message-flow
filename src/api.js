import config from './config';

export const getMessages = (limit=10, skip=0) => {
   return fetch(`${config.apiUrl}/messages/?limit=${limit}&skip=${skip}`, {
            credentials: 'include'
        })
        .then(res => res.json());
}

export const getStats = () => {
    return fetch(`${config.apiUrl}/messages/stats`, {
                credentials: 'include'
            })
            .then(res => res.json());
}

export const getAuthUser = () => {
    return fetch(`${config.apiUrl}/auth/info`, {
                credentials: 'include'
            })
            .then(res => res.json());
}