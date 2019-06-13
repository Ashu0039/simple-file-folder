import React from 'react';
import PropTypes from 'prop-types';

import './TitleBar.css';

const TitleBar = ({ title, addFolder, addFile, selectedEntity, deleteSelectedEntity }) => (
  <div className={`title-bar ${selectedEntity ? 'selected' : ''}`}>
    <span className="title">{title}</span>
    <div className="options">
      {
        selectedEntity ? (
          <span onClick={() => deleteSelectedEntity()}>Delete</span>
        ) : (
          <>
            <span onClick={() => addFolder()}>Add Folder</span>
            <span onClick={() => addFile()}>Add File</span>
          </>
        )
      }
    </div>
  </div>
);

TitleBar.propTypes = {
  title: PropTypes.string,
  addFolder: PropTypes.func,
  addFile: PropTypes.func,
  selectedEntity: PropTypes.shape({}),
  deleteSelectedEntity: PropTypes.func.isRequired,
};

TitleBar.defaultProps = {
  title: '',
  addFolder: () => {},
  addFile: () => {},
  selectedEntity: null,
};

export default TitleBar;
