import axios from 'axios';
/**
 * Github root Url
 */
export const appRootUrl: string = 'https://api.github.com/';

/**
 * GitHub URLs for search by users or reposotpries
 */
export const apiUrls = {
  users: appRootUrl + 'search/users',
  repositories: appRootUrl + 'search/repositories',
};

/**
 * Our api headers, which will be user inside an http call.
 */
const apiHeaders = {
  Accept: 'application/vnd.github.v3+json',
};

/**
 * fetchUsersByUserName, its a function which will call the user search api via axios.
 * @param searchTerm the text typed by user in the input text.
 * 
 * @returns Promise<AxiosResponse<any>> 
 */
export const fetchUsersByUserName = async (searchTerm: string) =>
  axios.get(apiUrls.users, {
    headers: apiHeaders,
    params: { q: searchTerm },
  });


/**
 * fetchReposByName, its a function which will call the repository search api via axios.
 * @param searchTerm the text typed by user in the input text.
 * 
 * @returns Promise<AxiosResponse<any>> 
 */
export const fetchReposByName = async (searchTerm: string) => {
  return axios.get(apiUrls.repositories, {
    headers: apiHeaders,
    params: { q: searchTerm },
  });
};
