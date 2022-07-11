import './App.css';
import Header from './Components/Header/Header'
import Tracker from './Components/Tracker/Tracker'
import Countdown from './Components/Timer/Timer'
import moment from 'moment'

function App() {
  const time = moment().format('LTS');
  console.log(time)
  return (
    <div className="App">
      <Header/>
      <Tracker/>
      <Countdown eventTime={Date.now()} interval={1000} />
    </div>
  );
}

export default App;
