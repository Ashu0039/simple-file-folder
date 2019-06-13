import React from 'react';

import EntityIcon from './EntityIcon';

const File = ({ entity }) => (
  <div className="folder entity">
    <EntityIcon type={entity.type} />
    <div className="title">{ entity.title }</div>
  </div>
);

export default File;
