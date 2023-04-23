import axios from 'axios'

axios.defaults.baseURL = window.location.origin+'/api'

export const headers = {
    token: ''
}

export const UserAPI = {
    getUserInfo: () => axios.get('/user/', { headers }),
    validateToken: () => axios.get('/user/validate', { headers })
}

export const CommandAPI = {
    getCommands: () => axios.get('/command/commands', { headers })
}

export const twitchAPI = {
    getCategories: (query) => {
        const headers = {
            Authorization: "Bearer " + window.localStorage.getItem('access_token'),
            "Client-Id": "86dn54lk93xa00ezi86xcsc8eewz8r"
        }

        return axios.get(`https://api.twitch.tv/helix/search/categories?query=${encodeURI(query)}`, { headers })
    }
}

