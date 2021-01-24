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
