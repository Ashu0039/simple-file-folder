import React from 'react';
import PropTypes from 'prop-types';

import './Explorer.css';
import { FOLDER, FILE } from '../constants';
import Folder from './Folder';
import File from './File';

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

const Explorer = ({ content }) => {
  
  return (
    <div className="Explorer">
      {
        content.map(c => 
          <RenderEntity entity={c} />)
      }
    </div>
  );
}

Explorer.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string),
};

Explorer.defaultProps = {
  content: [],
};

export default Explorer;
