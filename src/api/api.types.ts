/**
 * ApiResponse, its an iterface to describe the type of response we will get by calling the github API. 
 * 
 * @param T  could be User or Repository.
 */
export interface ApiResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

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
export const apiHeaders = {
  Accept: 'application/vnd.github.v3+json',
};
