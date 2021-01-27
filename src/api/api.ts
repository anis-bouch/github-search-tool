import axios from 'axios';
import { apiHeaders, apiUrls } from './api.types';
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
