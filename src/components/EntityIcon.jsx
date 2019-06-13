import React from 'react';
import { FOLDER, FILE } from '../constants';

const EntityIcon = ({ type }) => {
  switch(type) {
    case FOLDER:
      return <div>FOLDER Icon</div>;
    case FILE:
      return <div>FILE Icon</div>;
    default:
      return <div>UNKNOWN Type</div>
  }
}

export default EntityIcon;