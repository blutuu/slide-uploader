import { connect } from "react-redux";
import "./App.css";
import "../Sass/Styles.scss";
import "tachyons";
import bgimage from "../Images/pattern-randomized.svg";
import SlideViewer from "../Components/SlideViewer";
import SlideContainer from "../Components/SlideContainer";
import DragDrop from "../Components/DragDrop";
import { setDrag, processDrop } from "../Redux/actions";

const mapStateToProps = (state) => {
  return {
    isDragging: state.isDragging,
    droppedFiles: state.droppedFiles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetDrag: (value) => dispatch(setDrag(value)),
    onProcessDrop: (event) => processDrop(event, dispatch),
  };
};

function App({ onSetDrag, onProcessDrop, droppedFiles, isDragging }) {
  return (
    <div className="App" style={{ backgroundImage: `url(${bgimage})` }}>
      <DragDrop
        setDrag={onSetDrag}
        processDrop={onProcessDrop}
        isDragging={isDragging}
      >
        <SlideViewer />
        <SlideContainer droppedFiles={droppedFiles} isDragging={isDragging} />
      </DragDrop>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
