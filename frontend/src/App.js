import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'
import UserSelection from './components/UserSelection';
import PatientRegistration from './pages/PatientReg';
import PharmaRegistration from './pages/PharmaRequest';
import MedicineListPage from './pages/MedicineListPage';
import MedicineListAdmin from './pages/MedicineListAdmin';
import MedicineListPagep from './pages/MedicineListPharma'
import AddMedicineForm from './components/AddMedForm';
import EditMedicinePage from './pages/updateMedicine';
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
import SalesReport from './pages/SalesReport';
import PastOrders from './pages/PastOrders';
import CurrentOrders from './pages/CurrentOrders';
import AlternativeMedicinesPage from './pages/AlternativeMedicinesPage';
import AdminSettings from './components/AdminSettings';
import PharmacistSettings from './components/PharmacistSettings';
import PatientChatPage from './pages/PatientChatPage';
import PharmacistChatPage from './pages/PharmacistChatPage';
import NotificationsPage from './pages/NotificationsPage';
import PatientSettings from './pages/PatientSettings';


function App() {
  const { user } = useAuthContext()
  if(user){
    console.log(user.role)
  }


  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/admin/:username"
            element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart/:username"
            element={user && user.role === 'patient' ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route
            Route path="/chat/:username/:doctor"
            element={user && user.role === 'patient' ? <PatientChatPage /> : (user && user.role === 'pharmacist' ? <PharmacistChatPage /> : <Navigate to="/login" />)}
          />
           <Route
            path="/addAdmin"
            element={user && user.role === 'admin' ? <AdminRegistrationForm /> : <Navigate to="/login" />}
          />
           <Route
            path="/viewPatients"
            element={user && user.role === 'admin' ? <PatientListPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/Notifications"
            element={user && user.role === 'pharmacist' ? <NotificationsPage /> : <Navigate to="/login" />}
          />
           <Route
            path="/viewPharmacists"
            element={user && user.role === 'admin' ? <PharmacistListPage /> : <Navigate to="/login" />}
          />
           <Route
            path="/viewRequests"
            element={user && user.role === 'admin' ? <RequestsListPage /> : <Navigate to="/login" />}
          />
           <Route
            path="/addMed"
            element={user && user.role === 'pharmacist' ? <AddMedicineForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:medicineId"
            element={user && user.role === 'pharmacist' ? <EditMedicinePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/getMedicines/:username"
            element={user && (user.role === 'patient') ? <MedicineListPage /> : user && (user.role === 'admin') ? <MedicineListAdmin /> : <Navigate to="/login" />} 
          />
           <Route
            path="/alternativeMedicines/:medicineId" 
            element={user && (user.role === 'patient') ? <AlternativeMedicinesPage /> : user && (user.role === 'patient') ? <AlternativeMedicinesPage /> : <Navigate to="/login" />} 
          />
          <Route
            path="/getMedicines/:username"
            element={user && (user.role === 'admin') ? <MedicineListAdmin /> : <Navigate to="/login" />}
          />
          <Route
            path="/getMedicines/pharmacist/:username"
            element={user && user.role === 'pharmacist' ? <MedicineListPagep /> : <Navigate to="/login" />}
          />
          <Route
            path="/changePatientPassword/:username"
            element={user && user.role === 'patient' ? <ChangePatientPass /> : <Navigate to="/login" />}
          />
           <Route
            path="/changePharmacistPassword/:username"
            element={user && user.role === 'pharmacist' ? <ChangePharmacistPass /> : <Navigate to="/login" />}
          />
           <Route
            path="/changeAdminPassword/:username"
            element={user && user.role === 'admin' ? <ChangeAdminPass /> : <Navigate to="/login" />}
          />
          <Route
            path="/getMedicines/pharmacist/:username"
            element={user && user.role === 'pharmacist' ? <MedicineListPagep /> : <Navigate to="/login" />}
          />
          <Route
            path="/Checkout/:username"
            element={user && user.role === 'patient' ? <Checkout /> : <Navigate to="/login" />}
          /><Route
          path="/patientOrders/:username"
          element={user && user.role === 'patient' ? <PatientOrders /> : <Navigate to="/login" />}
        />

          <Route
            path="/patientSettings/:username"
            element={user && user.role === 'patient' ? <PatientSettings /> : <Navigate to="/login" />}
          />


<Route
            path="/adminSettings/:username"
            element={user && user.role === 'admin' ? <AdminSettings /> : <Navigate to="/login" />}
            />

           <Route
            path="/PharmacistSettings/:username"
            element={user && user.role === 'pharmacist' ? <PharmacistSettings /> : <Navigate to="/login" />}
            />

        
        <Route path="/pastOrders/:username" element={user && user.role === 'patient' ? <PastOrders /> : <Navigate to="/login" />  } />
        <Route path="/currentOrders/:username" element={user && user.role === 'patient' ? <CurrentOrders /> : <Navigate to="/login" /> } />




          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/patient" element={<PatientRegistration />} />
          <Route path="/register/pharmacist" element={<PharmaRegistration />} />
          <Route path="/sales" element={<SalesReport />} />

         
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword/:username" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
