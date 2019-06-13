import React from 'react';

import EntityIcon from './EntityIcon';

import './Entity.css';
import './Folder.css';

const Folder = ({ entity, select, selected, open }) => (
  <div className={`folder entity ${selected ? 'selected' : ''}`}
    onClick={() => select(entity)}
    onDoubleClick={() => open(entity.id)}
  >
    <EntityIcon type={entity.type} />
    <div className="title">{ entity.title }</div>
  </div>
);

export default Folder;
