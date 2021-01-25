import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../../store';
import { Repository } from '../../state/models/repos';
import { User } from '../../state/models/users';
import { searchByEnum } from '../../state/searchTypes';
import { SearchListCardRepo } from './search-list-card-repo.component';
import { SearchListCardUser } from './search-list-card-user.component';

export function SearchList() {
  const searchState = useSelector((state: RootStore) => state.search);
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
