import { searchByEnum } from './searchTypes';
import { GlobalState } from './searchTypes';
export const initState: GlobalState = {
    error: {
        code: 0,
        message: ''
    },
    loading: false,
    previousSearchesRepositories: [],
    previousSearchesUsers: [],
    repositories: [],
    searchType: searchByEnum.USERS,
    users: []
}