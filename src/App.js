import React, { Component } from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
import Explorer from './components/Explorer';
import initialData from './initialData';
import { ROOT } from './constants';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentFolder: ROOT,
      data: initialData,
    };
  }

  getFolderContent() {
    const { currentFolder, data } = this.state;
    const folder = data[currentFolder];

    if (!folder) {
      console.log('Folder non existent --> ', currentFolder);
      return;
    }

    const { content } = folder;
    const folderContent = content.map(c => data[c]);
    return folderContent;
  }

  setCurrentFolder = (folderId) => {
    this.setState({ currentFolder: folderId });
  }
  
  render() {
    const { currentFolder } = this.state;
    const folderContent = this.getFolderContent(currentFolder);

    return (
      <div className="App">
        <TitleBar />
        <Explorer content={folderContent} />
      </div>
    );
  }
}

export default App;
