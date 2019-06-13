import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import './Explorer.css';
import { FOLDER, FILE, ROOT } from '../constants';
import Folder from './Folder';
import File from './File';
import TitleBar from './TitleBar';
import NotFound from './NotFound';
import EmptyFolder from './EmptyFolder';

const DefaultEntity = () => (
  <div>Entity type not compatible</div>
);

const RenderEntity = ({ ...props }) => {
  const { entity } = props;
  const { type } = entity;

  switch(type) {
    case FOLDER:
      return <Folder {...props} />;
    case FILE:
      return <File {...props} />
    default:
      return <DefaultEntity />
  }
};

const getFolder = ({ folderId, data }) => {
  // If there is some folderId return its content else return ROOT folder content
  const folder = folderId ? data[folderId] : data[ROOT];

  return folder;
}

const getFolderContents = ({ children, data }) => {
  const folderContent = children.map(c => data[c]);
  return folderContent;
}

class Explorer extends Component {
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      // Reset entity selected on route change
      this.props.entitySelected(null);
    });
  }

  componentWillUnmount() {
      this.unlisten();
  }

  createNewEntity = ({ fn, title }) => {
    const { folderId } = this.props.match.params;
    fn({ id: uuid(), title, parent: folderId || ROOT });
  }

  askNameForFolder = () => {
    const { addFolder } = this.props;
    const title = prompt('Enter folder name', 'New Folder');

    if (title) {
      console.log('adding new folder --> ', title);
      this.createNewEntity({ fn: addFolder, title });
    }
  }

  askNameForFile = () => {
    const title = prompt('Enter file name', 'New File');
    const { addFile } = this.props;
    if (title) {
      console.log('adding new file --> ', title);
      this.createNewEntity({ fn: addFile, title });
    }
  }

  openFolder = (folderId) => {
    console.log('open folder --> ', folderId);
    this.props.history.push(folderId);
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    const {
      data,
      entitySelected,
      deleteSelectedEntity,
      renameEntity,
      selectedEntity,
    } = this.props;

    const { folderId } = this.props.match.params;

    if (folderId && !data.hasOwnProperty(folderId)) {
      return (
        <NotFound />
      )
    }
  
    const { title, children } = getFolder({ folderId, data});
    const content = getFolderContents({ children, data });
  
    return (
      <>
        <TitleBar
          title={ selectedEntity ? selectedEntity.title : title}
          addFolder={this.askNameForFolder}
          addFile={this.askNameForFile}
          selectedEntity={selectedEntity}
          deleteSelectedEntity={deleteSelectedEntity}
          renameEntity={renameEntity}
          unselect={() => entitySelected(null)}
          canGoBack={!!folderId}
          back={this.goBack}
          openFolder={() => selectedEntity.type === FOLDER && this.openFolder(selectedEntity.id)}
        />
        <div className="Explorer">
          {
            content.length ? content.map(c => 
              <RenderEntity
                key={c.id} 
                entity={c}
                open={c.type === FOLDER ? this.openFolder : null}
                select={(e) => entitySelected(e)}
                selected={selectedEntity && selectedEntity.id === c.id}
              />)
              : <EmptyFolder />
          }
        </div>
      </>
    );
  }
}

Explorer.propTypes = {
  data: PropTypes.shape({}),
  addFolder: PropTypes.func,
  addFile: PropTypes.func,
  entitySelected: PropTypes.func,
  selectedEntity: PropTypes.shape({}),
  deleteSelectedEntity: PropTypes.func.isRequired,
  renameEntity: PropTypes.func.isRequired,
};

Explorer.defaultProps = {
  data: {},
  addFolder: () => {},
  addFile: () => {},
  entitySelected: () => {},
  selectedEntity: null,
};

export default Explorer;
