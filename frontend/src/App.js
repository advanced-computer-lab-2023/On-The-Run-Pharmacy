import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserSelection from './components/UserSelection';
import PatientRegistration from './pages/PatientReg';
import PharmaRegistration from './pages/PharmaRequest';
import MedicineListPage from './pages/MedicineListPage';
import MedicineListPagep from './pages/MedicineListPharma'
import AddMedicineForm from './components/AddMedForm';
import EditMedicinePage from './pages/editMed';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
      <Route path="/" element={<UserSelection/>}/>
      <Route path="/addMed" element={<AddMedicineForm/>}/>
      <Route path="/edit/:medicineId" element={<EditMedicinePage/>}/>

      <Route path="/getMedicines" element={<MedicineListPage/>}/>
      <Route path="/getMedicines/pharmasist" element={<MedicineListPagep/>}/>
      <Route path="/register/patient" element={<PatientRegistration/>}/>
      <Route path="/register/pharmacist" element={<PharmaRegistration/>}/>
      </Routes>
      </div>
      </Router>
  );
}

export default App;
