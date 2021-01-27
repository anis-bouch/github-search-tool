import React from 'react';
import { useSelector } from 'react-redux';
import { SearchList } from '../feature/search/components/list/search-list.component';
import { SearchInput } from '../feature/search/components/search-input/search-input.component';
import { SearchType } from '../feature/search/components/type-select-box/search-type.component';
import {
  GlobalState,
  searchByEnum,
} from '../feature/search/state/search.types';
import { ErrorPage } from './pages/error.component';
import './main-layout.module.scss';
import { NoResult } from './pages/no-result.component';
/**
 * MainLayout, is a react component which hold the layout of our app.
 */
export function MainLayout() {
  const searchState = useSelector((state: GlobalState) => state);
  const list: any[] =
    searchState.searchType === searchByEnum.USERS
      ? searchState.usersToBeShown
      : searchState.repositoriesToBeShown;
  const showNoResult: boolean =
    !list?.length && searchState?.currentSearchTerm?.length > 0;

  return (
    <div
      className={`main-container ${
        list.length || searchState.error.code || showNoResult
          ? 'mt-5p'
          : 'mt-15p'
      }`}
    >
      <div className='search-header'>
        <img src='github.svg' className='logo' alt='header logo' />
        <div className='search-header-title'>
          <span className='search-header-title-color--black bold big-font'>
            Github Searcher
          </span>
          <span className='search-header-title-color--grey'>
            search user or repositories below
          </span>
        </div>
      </div>
      <div className='search-container'>
        <SearchInput {...searchState}></SearchInput>
        <SearchType {...searchState}></SearchType>
      </div>
      <div className={searchState.loading ? 'progress-line' : 'hide'}></div>
      <ErrorPage {...searchState.error}></ErrorPage>
      <div className={!showNoResult ? 'hide' : ''}>
        <NoResult></NoResult>
      </div>
      <div className='search-list'>
        <SearchList></SearchList>
      </div>
    </div>
  );
}
