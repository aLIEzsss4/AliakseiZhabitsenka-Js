import * as React from 'react';
import MainWrapper from './../common-components/MainWrapper/MainWrapper';
import {HashRouter, Route} from 'react-router-dom';
import './App-styles/App.css';

class App extends React.Component {
  public render() {
    return (
      <HashRouter>
        <Route path='/' component={MainWrapper} />
      </HashRouter>
    );
  }
}

export default App