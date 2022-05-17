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
  deleteSlide,
} from "../Redux/actions";

const mapStateToProps = (state) => {
  return {
    isDragging: state.isDragging,
    isSlideDragging: state.isSlideDragging,
    droppedFiles: state.droppedFiles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetDrag: (value) => dispatch(setDrag(value)),
    onSetSlideDrag: (value) => dispatch(setSlideDrag(value)),
    onProcessDrop: (event) => processDrop(event, dispatch),
    onUpdateFiles: (value) => dispatch(updateSlideFiles(value)),
    onDeleteSlide: (value) => dispatch(deleteSlide(value)),
  };
};

function App({
  onSetDrag,
  onSetSlideDrag,
  onProcessDrop,
  onUpdateFiles,
  droppedFiles,
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
      >
        <SlideViewer />
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
