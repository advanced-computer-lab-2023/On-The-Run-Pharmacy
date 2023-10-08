import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserSelection from './components/UserSelection';
import PatientRegistration from './pages/PatientReg';
import PharmaRegistration from './pages/PharmaRequest';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
      <Route path="/" element={<UserSelection/>}/>
      <Route path="/register/patient" element={<PatientRegistration/>}/>
      <Route path="/register/pharmacist" element={<PharmaRegistration/>}/>
      </Routes>
      </div>
      </Router>
  );
}

export default App;
