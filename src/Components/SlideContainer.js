import React, { useEffect } from "react";
import { connect } from "react-redux";
import Slide from "./Slide";
import { setSelectedSlide } from "../Redux/actions";

const mapStateToProps = (state) => {
  return {
    isDragging: state.isDragging,
    isSlideDragging: state.isSlideDragging,
    droppedFiles: state.droppedFiles,
    savedFiles: state.savedFiles,
    selectedSlide: state.selectedSlide,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSlideSelection: (value) => dispatch(setSelectedSlide(value)),
  };
};

const SlideContainer = ({
  droppedFiles,
  savedFiles,
  onSlideSelection,
  setSlideDrag,
  isSlideDragging,
  onUpdateFiles,
  onDeleteSlide,
}) => {
  useEffect(() => {
    console.log(droppedFiles);
  }, [JSON.stringify(droppedFiles)]);

  const slides = droppedFiles.map((image, key) => (
    <Slide
      key={image.name + key}
      imageFile={image}
      setSlideDrag={setSlideDrag}
      droppedFiles={droppedFiles}
      savedFiles={savedFiles}
      isSlideDragging={isSlideDragging}
      selectSlide={onSlideSelection}
      updateFiles={onUpdateFiles}
      deleteSlide={onDeleteSlide}
    ></Slide>
  ));

  return (
    <div className="w-75 center mb4" id="slide-container">
      {!droppedFiles ? <h2>No files available</h2> : slides}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideContainer);
