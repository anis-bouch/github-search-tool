import React from 'react';
import { SearchInput } from '../feature/search/components/search-input/search-input.component';
import { SearchType } from '../feature/search/components/type-select-box/search-type.component';
import './main-layout.module.scss'
export function MainLayout() {
  return (
    <div className='container'>
      <div className='search-header'>
          <img src="github.svg" className="logo" alt=""/>
      </div>
      <div className='search-container'>
        <SearchInput></SearchInput>
        <SearchType></SearchType>
      </div>
    </div>
  );
}
