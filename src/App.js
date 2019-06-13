import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFile, faFolder, faEdit, faTrash, faTimes, faArrowLeft, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

import Explorer from './components/Explorer';
import initialData from './initialData';

import './App.css';
import { FOLDER, FILE } from './constants';

library.add(faFile, faFolder, faEdit, faTrash, faTimes, faArrowLeft, faFolderOpen);

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
    const newSelectedEntity = selectedEntity && entity && selectedEntity.id === entity.id ? null : entity;
    this.setState({ selectedEntity: newSelectedEntity });
  }

  removeEntityAndItsChildren = (data, entityId) => {
    let updatedData = { ...data };
    const entity = updatedData[entityId];

    const { children } = entity;

    if (children || children) {
      for(let i=0; i<children.length;i++) {
        const childEntity = children[i];
        updatedData = this.removeEntityAndItsChildren(updatedData, childEntity);
      }
    }

    delete updatedData[entityId];

    return updatedData;
  }

  removeEntityAsChild = ({ data, parentId, entityId }) => {
    const updatedData = { ...data };
    const parentOfEntity = updatedData[parentId];
    const { children } = parentOfEntity;
    const posOfEntity = children.findIndex(i => i === entityId);

    if (posOfEntity > -1) {
      const updatedChildren = [...children.slice(0, posOfEntity), ...children.slice(posOfEntity + 1)];
      const updatedParent = {
        ...parentOfEntity,
        children: updatedChildren,
      };
      updatedData[parentId] = updatedParent;
    }
    return updatedData;
  }

  deleteEntity = (entity) => {
    const { data } = this.state;
    // Remove entity as a children from dataset
    const uData = this.removeEntityAsChild({ data, parentId: entity.parent, entityId: entity.id });
    // Remove entity and its children from dataset
    const updatedData = this.removeEntityAndItsChildren(uData, entity.id);
    this.setState({ data: updatedData });
  }

  deleteSelectedEntity = () => {
    const { selectedEntity } = this.state;
    if (selectedEntity) {
      const answer = prompt(`Please enter YES if you want to delete ${selectedEntity.title}`);
      if (answer && answer.trim().toLowerCase() === 'yes') {
        console.log('delete selected entity --> ', selectedEntity);
        this.deleteEntity(selectedEntity);
      }
    }
    this.setState({ selectedEntity: null });
  }

  updateEntityName = ({ id, newName }) => {
    const { data } = this.state;
    const updatedData = { ...data };
    const entity = updatedData[id];
    const updatedEntity = {
      ...entity,
      title: newName,
    };

    updatedData[id] = updatedEntity;
    this.setState({ data: updatedData });
  }

  renameEntity = () => {
    const { selectedEntity } = this.state;
    if (selectedEntity) {
      const newName = prompt('Enter new name', selectedEntity.title);
      if (newName) {
        this.updateEntityName({ id: selectedEntity.id, newName });
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
              renameEntity={this.renameEntity}
              {...props}
            />
          } 
        />
      </div>
    );
  }
}

export default App;
