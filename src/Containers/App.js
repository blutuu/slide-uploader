import './App.css';
import '../Sass/Styles.scss';
import 'tachyons';
import bgimage from '../Images/pattern-randomized.svg';
import SlideViewer from '../Components/SlideViewer';
import SlideContainer from '../Components/SlideContainer';
import DragDrop from '../Components/DragDrop';

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${bgimage})`}}>
      <DragDrop>
        <SlideViewer />
        <SlideContainer />
      </DragDrop>
    </div>
  );
}

export default App;
