import React from 'react';
import './App.scss';
import { MainLayout } from './layout/main-layout.component';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <main>
          <MainLayout></MainLayout>
        </main>
        <footer></footer>
      </div>
    );
  }
}


