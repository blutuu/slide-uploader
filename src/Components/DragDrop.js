import React from 'react';
import { useState, useEffect } from 'react';

const DragDrop = ({ children }) => {
  return (
    <div className='drag-drop'>
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
