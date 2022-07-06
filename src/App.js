import './App.css';
import Header from './Components/Header/Header'
import Tracker from './Components/Tracker/Tracker'
import TrackerList from './Components/TrackerList/TrackerList'

function App() {
  return (
    <div className="App">
      <Header/>
      <Tracker/>
      <TrackerList/>
    </div>
  );
}

export default App;
