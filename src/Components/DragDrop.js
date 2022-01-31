import React from 'react';
import { useState, useEffect } from 'react';

const DragDrop = ({ children }) => {

  const dropHandler = (event) => {
    event.preventDefault();

    console.log('File dropped');
  }

  const dragOverHandler = (event) => {
    event.preventDefault();

    console.log('File is in the drop zone');
  }

  const dragEnterHandler = (event) => {
    event.preventDefault();

    console.log('File entered dropzone');
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault();

    console.log('File exited dropzone');
  }

  return (
    <div className='drag-drop' >
      <div className='drop-screen'
        onDrop={dropHandler} 
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}>
      </div>

      {children}
      <div className='tc f5 mt4 mb5' id='drag-drop-message'>
        <strong>Click a slide to upload</strong>
        <span>or</span>
        <span>drag files here</span>
      </div>

    </div>
  );
};

export default DragDrop;
