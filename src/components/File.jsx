import React from 'react';

import EntityIcon from './EntityIcon';

const File = ({ entity, selected, select }) => (
  <div className={`file entity ${selected ? 'selected' : ''}`}
    onClick={() => select(entity)}
  >
    <EntityIcon type={entity.type} />
    <div className="title">{ entity.title }</div>
  </div>
);

export default File;
