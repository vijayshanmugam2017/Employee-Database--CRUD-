import './App.css';
import Employees from './employees'
import image1 from './inter.jpg'

function App() {
  return (
    <div className="App">
      <img src={image1} alt='Vktechnology'/>
      <Employees/>
    </div>
  );
}

export default App;
