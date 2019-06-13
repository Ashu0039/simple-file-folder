import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TitleBar.css';

const TitleBar = ({ title, addFolder, addFile, selectedEntity, deleteSelectedEntity, renameEntity }) => (
  <div className={`title-bar ${selectedEntity ? 'selected' : ''}`}>
    <span className="title">
      { selectedEntity ? <FontAwesomeIcon icon="times" size="sm" style={{marginRight: 4 }} /> : ''}
      {title}
    </span>
    <div className="options">
      {
        selectedEntity ? (
          <>
            <span onClick={() => renameEntity()}>
              <FontAwesomeIcon icon="edit" size="sm" /> Rename
            </span>
            <span onClick={() => deleteSelectedEntity()}>
              <FontAwesomeIcon icon="trash" size="sm" /> Delete
            </span>
          </>
        ) : (
          <>
            <span onClick={() => addFolder()}>
              <FontAwesomeIcon icon="folder" size="sm" /> Add Folder
            </span>
            <span onClick={() => addFile()}>
              <FontAwesomeIcon icon="file" size="sm"/> Add File
            </span>
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
  renameEntity: PropTypes.func.isRequired,
};

TitleBar.defaultProps = {
  title: '',
  addFolder: () => {},
  addFile: () => {},
  selectedEntity: null,
};

export default TitleBar;
