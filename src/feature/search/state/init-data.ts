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
    repositoriesToBeShown: [],
    searchType: searchByEnum.USERS,
    usersToBeShown: [],
    cachedRepositories: [],
    cachedUsers: []
}