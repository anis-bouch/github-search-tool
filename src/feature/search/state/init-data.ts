import { searchByEnum } from './search.types';
import { GlobalState } from './search.types';
/**
 * initState, its a constant object which is typed as GlobalState, play the role of our first initialisation to our state
 */
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
    cachedUsers: [],
    currentSearchTerm: ''
}