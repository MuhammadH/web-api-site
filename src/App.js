import React from 'react';
import './App.css';

import MainPage from './components/mainPage';

import {HashRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <div>
            <Route exact path="/" render={()=><MainPage />}/>
          </div>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
