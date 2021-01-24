import { ChangeEvent } from 'react';
import { proceedSearch } from '../../state/searchActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { searchByEnum } from '../../state/searchTypes';
import { RootStore } from '../../../../store';
/**
 * SearchInput, is the definition of our inpuit component, which will be used to type term of our search.
 */
export function SearchInput() {
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootStore) => state.search);
  const triggerSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 3) {
      dispatch(
        proceedSearch(
          event.target.value,
          searchState.searchType === searchByEnum.USERS
            ? searchByEnum.USERS
            : searchByEnum.REPOSITORY,
          searchState.searchType === searchByEnum.USERS
            ? !!searchState.previousSearchesUsers.find(
                (user) => user === event.target.value
              )
            : !!searchState.previousSearchesRepositories.find(
                (repo) => repo === event.target.value
              )
        )
      );
    }
  };

  return (
    <input
      type='text'
      name=''
      id=''
      placeholder='Start typing to search ..'
      disabled={searchState.loading}
      onChange={triggerSearch}
    />
  );
}
