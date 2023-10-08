import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserSelection from './components/UserSelection';
import PatientRegistration from './pages/PatientReg';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
      <Route path="/" element={<UserSelection/>}/>
      <Route path="/register/patient" element={<PatientRegistration/>}/>
      </Routes>
      </div>
      </Router>
  );
}

export default App;
