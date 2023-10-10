import { connect } from "react-redux";
import "./App.css";
import "../Sass/Styles.scss";
import "tachyons";
import bgimage from "../Images/pattern-randomized.svg";
import SlideViewer from "../Components/SlideViewer";
import SlideContainer from "../Components/SlideContainer";
import DragDrop from "../Components/DragDrop";
import {
  setDrag,
  setSlideDrag,
  processDrop,
  updateSlideFiles,
  setSelectedSlide,
  deleteSlide,
  updateSavedFiles,
  updateDeletedSlides,
} from "../Redux/actions";

const mapStateToProps = (state) => {
  return {
    isDragging: state.isDragging,
    isSlideDragging: state.isSlideDragging,
    droppedFiles: state.droppedFiles,
    filesAdded: state.filesAdded,
    deletedFiles: state.deletedFiles,
    selectedSlide: state.selectedSlide,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetDrag: (value) => dispatch(setDrag(value)),
    onSetSlideDrag: (value) => dispatch(setSlideDrag(value)),
    onProcessDrop: (event) => processDrop(event, dispatch),
    onUpdateFiles: (value) => dispatch(updateSlideFiles(value)),
    onUpdateDeleted: (value) => dispatch(updateDeletedSlides(value)),
    onSaveFiles: (value) => dispatch(updateSavedFiles(value)),
    onSlideSelection: (value) => dispatch(setSelectedSlide(value)),
    onDeleteSlide: (value) => dispatch(deleteSlide(value)),
  };
};

function App({
  onSetDrag,
  onSetSlideDrag,
  onProcessDrop,
  onUpdateFiles,
  onUpdateDeleted,
  onSaveFiles,
  droppedFiles,
  filesAdded,
  deletedFiles,
  selectedSlide,
  isDragging,
  isSlideDragging,
  onDeleteSlide,
}) {
  return (
    <div className="App" style={{ backgroundImage: `url(${bgimage})` }}>
      <DragDrop
        setDrag={onSetDrag}
        processDrop={onProcessDrop}
        isDragging={isDragging}
        isSlideDragging={isSlideDragging}
        droppedFiles={droppedFiles}
        filesAdded={filesAdded}
        deletedFiles={deletedFiles}
        onUpdateFiles={onUpdateFiles}
        updateDeletedFiles={onUpdateDeleted}
        onSaveFiles={onSaveFiles}
      >
        <SlideViewer
          droppedFiles={droppedFiles}
          selectedSlide={selectedSlide}
        />
        <SlideContainer
          droppedFiles={droppedFiles}
          isDragging={isDragging}
          setSlideDrag={onSetSlideDrag}
          isSlideDragging={isSlideDragging}
          onUpdateFiles={onUpdateFiles}
          onDeleteSlide={onDeleteSlide}
        />
      </DragDrop>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
