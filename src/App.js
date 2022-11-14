import logo from './logo.svg';
import './App.css';
import ModelViewer from './ModelViewer';

function App() {

  const reset3DView = () => {
    console.log("Resetting 3D View in App");
  };

  return (
    <div className="App">
        <button onclick={reset3DView} className="Reset-button">
          Reset 3D View
        </button>
        <ModelViewer id="KitchenModel"/>
    </div>
  );
}



export default App;
