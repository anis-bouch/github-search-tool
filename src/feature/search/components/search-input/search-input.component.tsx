import { ChangeEvent } from 'react';
import { proceedSearch } from '../../state/searchActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { searchByEnum } from '../../state/searchTypes';
import { RootStore } from '../../../../store';
import { debounce } from '../../../../helpers/debounce';
/**
 * SearchInput, is the definition of our inpuit component, which will be used to type term of our search.
 */
export function SearchInput() {
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootStore) => state.search);
  const triggerSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 2) {
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
  }, 1000);

  return (
    <input
      type='text'
      name=''
      id=''
      placeholder='Start typing to search ..'
      onChange={triggerSearch}
    />
  );
}
