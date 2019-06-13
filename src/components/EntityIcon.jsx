import React from 'react';
import { FOLDER, FILE } from '../constants';

const EntityIcon = ({ type }) => {
  let icon = '';
  switch(type) {
    case FOLDER:
      icon = 'FOLDER Icon';
      break;
    case FILE:
      icon = 'FILE Icon';
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