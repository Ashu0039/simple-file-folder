import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TitleBar.css';

const TitleBar = ({ title, addFolder, addFile, selectedEntity, deleteSelectedEntity, renameEntity, unselect, canGoBack, back }) => (
  <div className={`title-bar ${selectedEntity ? 'selected' : ''}`}>
    <span className="title">
      {
        !selectedEntity && canGoBack ? 
        <FontAwesomeIcon
          onClick={() => back()}
          icon="arrow-left" 
          size="sm"
          style={{marginRight: 12, cursor: 'pointer' }}
        /> : ''
      }
      { selectedEntity ? 
        <FontAwesomeIcon
          onClick={() => unselect()}
          icon="times" 
          size="sm"
          style={{marginRight: 12, cursor: 'pointer' }}
        />
        : ''}
      {title}
    </span>
    <div className="options">
      {
        selectedEntity ? (
          <>
            <span onClick={() => renameEntity()}>
              <FontAwesomeIcon icon="edit" size="1x" /> Rename
            </span>
            <span onClick={() => deleteSelectedEntity()}>
              <FontAwesomeIcon icon="trash" size="1x" /> Delete
            </span>
          </>
        ) : (
          <>
            <span onClick={() => addFolder()}>
              <FontAwesomeIcon icon="folder" size="1x" /> Add Folder
            </span>
            <span onClick={() => addFile()}>
              <FontAwesomeIcon icon="file" size="1x"/> Add File
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
  unselect: PropTypes.func.isRequired,
  canGoBack: PropTypes.bool,
  goBack: PropTypes.func,
};

TitleBar.defaultProps = {
  title: '',
  addFolder: () => {},
  addFile: () => {},
  selectedEntity: null,
  canGoBack: false,
  goBack: () => {},
};

export default TitleBar;
