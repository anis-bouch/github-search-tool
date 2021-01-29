import { KeyboardEvent } from 'react';
import { clearList, proceedSearch } from '../../state/search.action';
import { useDispatch } from 'react-redux';
import { GlobalState, searchByEnum } from '../../state/search.types';
import { debounce } from '../../../../helpers/helpers';
/**
 * SearchInput, is the definition of our inpuit component, which will be used to type term of our search.
 */
export function SearchInput(state: GlobalState) {
  const dispatch = useDispatch();
  const triggerSearch = debounce((event: KeyboardEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    if (element.value.length > 2) {
      dispatch(
        proceedSearch(
          element.value,
          state.searchType,
          state.searchType === searchByEnum.USERS
            ? !!state.previousSearchesUsers.includes(element.value)
            : !!state.previousSearchesRepositories.includes(element.value)
        )
      );
    } else {
      if (event.key === 'Backspace') {
        dispatch(clearList(element.value, state.searchType));
      }
        
    } 
  }, 800);

  return (
    <input
      type='text'
      name=''
      id=''
      placeholder='Start typing to search ..'
      onKeyUp={triggerSearch}
    />
  );
}
