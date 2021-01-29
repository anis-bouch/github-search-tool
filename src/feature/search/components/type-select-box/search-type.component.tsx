import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSearchType } from '../../state/search.action';
import { GlobalState, searchByEnum } from '../../state/search.types';
/**
 * SearchType, is the definition of our select component, which will be used to choose the type of search we want to do.
 */
export function SearchType(state: GlobalState) {
  const types = [
    { value: searchByEnum.USERS, label: 'Users' },
    { value: searchByEnum.REPOSITORY, label: 'Repository' },
  ];
  const dispatch = useDispatch();
  const selectSearchType = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      toggleSearchType(
        event.target.value,
        state.currentSearchTerm,
        !!state.previousSearchesUsers.find(
          (user) => user === state.currentSearchTerm
        ) &&
          !!state.previousSearchesRepositories.find(
            (repo) => repo === state.currentSearchTerm
          ),
        dispatch
      )
    );
  };
  return (
    <select onChange={selectSearchType}>
      {types.map((type, index) => (
        <option key={index} value={type.value}>
          {type.label}
        </option>
      ))}
    </select>
  );
}
