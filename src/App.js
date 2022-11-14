import logo from './logo.svg';
import './App.css';
import ModelViewer from './ModelViewer';

function App() {
  return (
    <div className="App">
        <button onclick="reset3DView()" className="Reset-button">
          Reset 3D View
        </button>
        <ModelViewer/>
    </div>
  );
}

export default App;
