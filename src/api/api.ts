import axios from 'axios';

export const appRootUrl: string = 'https://api.github.com/';

export const apiUrls = {
    users: appRootUrl + 'search/users',
    repositories: appRootUrl + 'search/repositories',

}

const apiHeaders = {
    Accept: 'application/vnd.github.v3+json'
}


export const fetchUsersByUserName = async(searchTerm: string)=> axios.get(apiUrls.users, {
    headers: apiHeaders,
    params: { q: searchTerm }
})

export const fetchReposByName = async(searchTerm: string) => {
    return axios.get(apiUrls.repositories , {
        headers: apiHeaders,
        params: {q: searchTerm}
    });
}