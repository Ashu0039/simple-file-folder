import React from 'react';
import PropTypes from 'prop-types';

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

const Explorer = ({ data, match }) => {
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
      <TitleBar title={title} />
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
};

Explorer.defaultProps = {
  data: {},
};

export default Explorer;
