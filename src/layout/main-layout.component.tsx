import React from 'react';
import { SearchInput } from '../feature/search/components/search-input/search-input.component';
import { SearchType } from '../feature/search/components/type-select-box/search-type.component';
import './main-layout.module.scss';
/**
 * MainLayout, is a react component which hold the layout of our app.
 */
export function MainLayout() {
  return (
    <div className='main-container'>
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
        <SearchInput></SearchInput>
        <SearchType></SearchType>
      </div>
    </div>
  );
}
