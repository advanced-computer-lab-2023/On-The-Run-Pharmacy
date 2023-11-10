import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
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
import AddAddress from './pages/AddAddress';
import ChooseAddress from './pages/ChooseAddress';
import Cookies from 'js-cookie';
import CartPage from './pages/cart';
import ChangeAdminPass from './pages/changeAdminPass';
import ChangePatientPass from './pages/changePatientPass';
import ChangePharmacistPass from './pages/changePharmacistPass';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Checkout from './pages/Checkout';
import PatientOrders from './pages/PatientOrders';



function App() {

  return (
    <Router>
      <div className="App">
        <Navbar/>
      <Routes>
      <Route path="/" element={<UserSelection/>}/>
      <Route path="/cart/:username" element={<CartPage/>}/>
      <Route path="/addAdmin" element={<AdminRegistrationForm/>}/>
      <Route path="/viewPatients" element={<PatientListPage/>}/>
      <Route path="/viewPharmacists" element={<PharmacistListPage/>}/>
      <Route path="/viewRequests" element={<RequestsListPage/>}/>
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/addMed" element={<AddMedicineForm/>}/>
      <Route path="/edit/:medicineId" element={<EditMedicinePage/>}/>
      <Route path="/addAddress/:username" element={<AddAddress/>}/>
      <Route path="/chooseAddress/:username" element={<ChooseAddress/>}/>
      <Route path="/getMedicines" element={<MedicineListPage/>}/>
     
      <Route path="/getMedicines/:username" element={<MedicineListPage/>}/>
      <Route path="/getMedicines/pharmacist" element={<MedicineListPagep/>}/>
      <Route path="/register/patient" element={<PatientRegistration/>}/>
      <Route path="/register/pharmacist" element={<PharmaRegistration/>}/>
      <Route path="/changeAdminPassword/:username" element={<ChangeAdminPass/>}/>
      <Route path="/changePatientPassword/:username" element={<ChangePatientPass/>}/>
      <Route path="/changePharmacistPassword/:username" element={<ChangePharmacistPass/>}/>
      <Route path="/forgetPassword" element={<ForgetPassword/>}/>
      <Route path="/resetPassword/:username" element={<ResetPassword/>}/>
      <Route path="/Checkout/:username" element={<Checkout/>}/>
      <Route path="/patientOrders/:username" element={<PatientOrders/>}/>

      </Routes>
      </div>
      </Router>
  );
}

export default App;
