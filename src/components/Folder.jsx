import React from 'react';

import EntityIcon from './EntityIcon';

import './Entity.css';
import './Folder.css';

const Folder = ({ entity }) => (
  <div className="folder entity">
    <EntityIcon type={entity.type} />
    <div className="title">{ entity.title }</div>
  </div>
);

export default Folder;
