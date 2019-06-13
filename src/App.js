import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Explorer from './components/Explorer';
import initialData from './initialData';

import './App.css';
import { FOLDER, FILE } from './constants';

class App extends Component {
  state = {
    data: initialData,
  }

  addNewEntityAndChildren = (entity) => {
    console.log('adding new entity ==> ', entity);
    const { id, parent } = entity;
    const { data } = this.state;

    const updatedData = { ...data };
    // Add new entity
    updatedData[id] = entity;

    // Add new children in parent folder
    const oldParent = updatedData[parent];
    const { children } = oldParent;
    const newChildren =  [...children, id];
    const newParent = { ...oldParent, children: newChildren };
    updatedData[parent] = newParent;

    this.setState({ data: updatedData });
  }

  addFolder = ({ id, title, parent }) => {
    const newFolder = {
      id,
      title,
      type: FOLDER,
      parent,
      children: [],
    };

    this.addNewEntityAndChildren(newFolder);
  }

  addFile = ({ id, title, parent }) => {
    const newFile = {
      id,
      title,
      type: FILE,
      parent,
    };

    this.addNewEntityAndChildren(newFile);
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
              addFile={this.addFile}
              addFolder={this.addFolder}
              {...props}
            />
          } 
        />
      </div>
    );
  }
}

export default App;
