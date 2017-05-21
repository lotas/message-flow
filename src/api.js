import config from './config';

const commonFetchOptions = {
    credentials: 'include'
};

const checkStatus = (res) => {
    if (res.status === 401) {
        window.location.href = '/login';
        throw new Error('Login required');
    } else if (res.status === 403) {
        throw new Error('Authorization fail');
    }

    return res;
}

const fetchWithCatch = (...args) => {
    return fetch(...args)
            .then(checkStatus)
            .then(res => res.json())
            .catch((err) => {
                console.error('Network call failed:', err)
            });
}


export const getMessages = (limit=10, skip=0) => {
   return fetchWithCatch(
       `${config.apiUrl}/messages/?limit=${limit}&skip=${skip}`,
        commonFetchOptions
    );
}

export const getStats = () => {
    return fetchWithCatch(`${config.apiUrl}/messages/stats`,
        commonFetchOptions);
}

export const getAuthUser = () => {
    return fetchWithCatch(`${config.apiUrl}/auth/info`, commonFetchOptions);
}