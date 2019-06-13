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

const RenderEntity = ({ entity }) => {
  const { type } = entity;

  switch(type) {
    case FOLDER:
      return <Folder entity={entity} />;
    case FILE:
      return <File entity={entity} />
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

const Explorer = ({ data, addFile, addFolder, match }) => {
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
        title={title}
        addFolder={askNameForFolder}
        addFile={askNameForFile}
      />
      <div className="Explorer">
        {
          content.length ? content.map(c => 
            <RenderEntity key={c.id} entity={c} />)
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
};

Explorer.defaultProps = {
  data: {},
  addFolder: () => {},
  addFile: () => {},
};

export default Explorer;
