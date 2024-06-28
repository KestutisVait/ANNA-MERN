import React, { useState } from 'react';
import styled from 'styled-components';

const DragArea = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    border: 3px dashed rgba(61, 61, 61, 0.5);
    transition: 0.2s;
    background-color: rgb(255, 255, 255,0.3);
    i {
        color: var(--dark);
        font-size: 2rem;
        padding: 0 3px ;
        transition: 0.2s;
    }
    p {
        color: rgba(61, 61, 61, 0.5);
        text-align: center;
        font-weight: 600;
        line-height: 1rem;
        margin: 5px;
        transition: 0.2s;
    }
    &:hover {
        border: 3px dashed var(--dark);
        background-color: rgb(255, 255, 255,0.6);
        p {
            color: var(--dark);
        }
    }
`;

const FileInput = ({ onFileChange }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file) => {
    const objectUrl = URL.createObjectURL(file);
    onFileChange(file, objectUrl);
  };


  return (
    <div>
      <DragArea
        className={dragOver ? 'dragover' : ''}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          type="file"
          id="fileInput"
          accept=".png, .jpg, .jpeg"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <i className="bi bi-file-image-fill" ></i>
        <p style={{ margin: '0', fontSize: '0.8rem' }}>Drag & Drop or click to upload</p>
      </DragArea>
    </div>
  );
};

export default FileInput;
