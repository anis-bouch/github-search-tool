import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { toggleSearchType } from "../../state/searchActionCreators";
import { searchByEnum } from "../../state/searchTypes";
/**
 * SearchType, is the definition of our select component, which will be used to choose the type of search we want to do.
 */
export function SearchType () {
    const types = [
        { value: searchByEnum.USERS, label: 'Users' },
        { value: searchByEnum.REPOSITORY, label: 'Repository' }
    ];
    const dispatch = useDispatch();
    const selectSearchType = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        dispatch(toggleSearchType(event.target.value));
    }
    return (
        <select onChange={selectSearchType}>
        {types.map((type, index) =>
          <option key={index} value={type.value}>{type.label}</option>
        )}
      </select>
    )
}
