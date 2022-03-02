import React from 'react';
import Slide from './Slide';

const SlideContainer = ({droppedFiles}) => {
  
  return (
    <div className='w-75 center mb4' id='slide-container'>
      {droppedFiles.map((file, key) => (
        <Slide imageFile={file} key={key}/>
      ))}
    </div>
  )
};

export default SlideContainer;
