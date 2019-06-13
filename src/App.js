import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Explorer from './components/Explorer';
import initialData from './initialData';

import './App.css';

class App extends Component {
  state = {
    data: initialData,
  }
  
  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <Route path="/:folderId?"
          render={
            (props) =>
            <Explorer
              data={data}
              {...props}
            />
          } 
        />
      </div>
    );
  }
}

export default App;
