import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserSelection from './components/UserSelection';
import PatientRegistration from './pages/PatientReg';
import PharmaRegistration from './pages/PharmaRequest';
import MedicineListPage from './pages/MedicineListPage';
import MedicineListPagep from './pages/MedicineListPharma'
import AddMedicineForm from './components/AddMedForm';
import EditMedicinePage from './pages/editMed';
import AdminRegistrationForm from './pages/AddAdmin';
import PatientListPage from './pages/PatientList';
import PharmacistListPage from './pages/PharmacistList';
import RequestsListPage from './pages/requestList';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
      <Routes>
      <Route path="/" element={<UserSelection/>}/>
      <Route path="/addAdmin" element={<AdminRegistrationForm/>}/>
      <Route path="/viewPatients" element={<PatientListPage/>}/>
      <Route path="/viewPharmacists" element={<PharmacistListPage/>}/>
      <Route path="/viewRequests" element={<RequestsListPage/>}/>
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/addMed" element={<AddMedicineForm/>}/>
      <Route path="/edit/:medicineId" element={<EditMedicinePage/>}/>

      <Route path="/getMedicines" element={<MedicineListPage/>}/>
      <Route path="/getMedicines/pharmacist" element={<MedicineListPagep/>}/>
      <Route path="/register/patient" element={<PatientRegistration/>}/>
      <Route path="/register/pharmacist" element={<PharmaRegistration/>}/>
      </Routes>
      </div>
      </Router>
  );
}

export default App;
