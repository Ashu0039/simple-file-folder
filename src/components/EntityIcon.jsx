import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FOLDER, FILE } from '../constants';

const EntityIcon = ({ type }) => {
  let icon = '';
  switch(type) {
    case FOLDER:
      icon = <FontAwesomeIcon icon="folder" size="5x" style={{ color: 'coral' }} />;
      break;
    case FILE:
      icon = <FontAwesomeIcon icon="file" size="5x" style={{ color: 'cornflowerblue' }} />;
      break;
    default:
      icon = 'UNKNOWN Type';
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      { icon }
    </div>
  )
}

export default EntityIcon;