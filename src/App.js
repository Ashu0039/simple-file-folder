import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Explorer from './components/Explorer';
import initialData from './initialData';

import './App.css';
import { FOLDER, FILE } from './constants';

class App extends Component {
  state = {
    data: initialData,
    selectedEntity: null,
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

  entitySelected = (entity) => {
    console.log('select entity --> ', entity);
    const { selectedEntity } = this.state;
    // Reset selection if same entity clicked again
    const newSelectedEntity = selectedEntity && selectedEntity.id === entity.id ? null : entity;
    this.setState({ selectedEntity: newSelectedEntity });
  }

  deleteEntity = (entity) => {
    
  }

  deleteSelectedEntity = () => {
    const { selectedEntity } = this.state;
    if (selectedEntity) {
      const answer = prompt(`Please enter YES if you want to delete ${selectedEntity.title}`);
      if (answer && answer.trim().toLowerCase === 'yes') {
        console.log('delete selected entity --> ', selectedEntity);
        this.deleteEntity(selectedEntity);
      }
    }
    this.setState({ selectedEntity: null });
  }
  
  render() {
    const { data, selectedEntity } = this.state;

    return (
      <div className="App">
        <Route path="/:folderId?"
          render={
            (props) =>
            <Explorer
              data={data}
              addFile={this.addFile}
              addFolder={this.addFolder}
              entitySelected={this.entitySelected}
              selectedEntity={selectedEntity}
              deleteSelectedEntity={this.deleteSelectedEntity}
              {...props}
            />
          } 
        />
      </div>
    );
  }
}

export default App;
