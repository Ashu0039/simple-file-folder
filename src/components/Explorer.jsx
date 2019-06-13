import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import './Explorer.css';
import { FOLDER, FILE, ROOT } from '../constants';
import Folder from './Folder';
import File from './File';
import TitleBar from './TitleBar';
import NotFound from './NotFound';

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

const Explorer = ({ 
    data,
    addFile,
    addFolder,
    entitySelected,
    deleteSelectedEntity,
    renameEntity,
    selectedEntity,
    match,
    history
  }) => {
  const createNewEntity = ({ fn, title }) => {
    const { folderId } = match.params;
    fn({ id: uuid(), title, parent: folderId || ROOT });
  };
  
  const askNameForFolder = () => {
    const title = prompt('Enter folder name', 'New Folder');

    if (title) {
      console.log('adding new folder --> ', title);
      createNewEntity({ fn: addFolder, title });
    }
  };

  const askNameForFile = () => {
    const title = prompt('Enter file name', 'New File');

    if (title) {
      console.log('adding new file --> ', title);
      createNewEntity({ fn: addFile, title });
    }
  };

  const openFolder = (folderId) => {
    console.log('open folder --> ', folderId);
    history.push(folderId);
  }

  const { folderId } = match.params;

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
        addFolder={askNameForFolder}
        addFile={askNameForFile}
        selectedEntity={selectedEntity}
        deleteSelectedEntity={deleteSelectedEntity}
        renameEntity={renameEntity}
      />
      <div className="Explorer">
        {
          content.length ? content.map(c => 
            <RenderEntity
              key={c.id} 
              entity={c}
              open={c.type === FOLDER ? openFolder : null}
              select={(e) => entitySelected(e)}
              selected={selectedEntity && selectedEntity.id === c.id}
            />)
            : 'Folder is empty'
        }
      </div>
    </>
  );
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
