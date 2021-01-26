import React from 'react';
import { useSelector } from 'react-redux';
import { Repository } from '../../state/models/repos.model';
import { User } from '../../state/models/users.model';
import { GlobalState, searchByEnum } from '../../state/search.types';
import { SearchListCardRepo } from './search-list-card-repo.component';
import { SearchListCardUser } from './search-list-card-user.component';

/**
 * @returns Jsx Element which will be rendered by react Engine
 * 
 * a react component to show a list of cards based on the data in the state 
 */
export function SearchList() {
  const searchState = useSelector((state: GlobalState) => state);
  const usersList: User[] = searchState.usersToBeShown;
  const repoList: Repository[] = searchState.repositoriesToBeShown;
  return searchState.searchType === searchByEnum.USERS ? (
    <div className='list-container'>
      {usersList.map((user, i) => {
        return <SearchListCardUser {...user} key={i}></SearchListCardUser>;
      })}
    </div>
  ) : (
    <div className='list-container'>
      {repoList.map((repo, i) => {
        return <SearchListCardRepo {...repo} key={i}></SearchListCardRepo>;
      })}
    </div>
  );
}