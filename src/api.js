import config from './config';

export const getMessages = (limit=10, skip=0) => {
   return fetch(`${config.apiUrl}/messages/?limit=${limit}&skip=${skip}`)
      .then(res => res.json());
}

export const getStats = () => {
    return fetch(`${config.apiUrl}/messages/stats`)
            .then(res => res.json());
}