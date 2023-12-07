const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors');
//const {createPatientP,getPatientsP, deletePatientP, addAddress, getAddresses}= require("./controllers/PatientPController")
const cookieParser = require('cookie-parser');
const {createPatientP,getPatientsP,deletePatientP,addToCart,getPatientCart,deleteFromCart,updateCart,updateWallet,getWallet,getPatientByUsername,updatePasswordPatient, addAddress, getAddresses}= require("./controllers/PatientPController")
const {createRequest,getRequests,rejectrequest,acceptrequest}=require("./controllers/requestsController")
const{ addMedicine, getMedicine, deleteMedicine, updateMedicine ,getMedicines,getMedicines2,archiveMedicine,unarchiveMedicine,getAlternativeMedicines,getOutOfStockMedicines,updateMedQuantity,getMedicinesWithSales}=require("./controllers/MedicineController")
const{createAdmin,getAdmin,getAdminByUsername, updatePasswordAdmin}=require("./controllers/adminController")
const{ createPharmacist, getPharmacists, deletepharmacist,createPharmacist1,getPharmacistByUsername, updatePasswordPharmacist,getPharmaWallet }=require("./controllers/PharmacistController")
const{login,logout, forgetPassword,resetPassword}=require("./controllers/userController")
const{requireAuthPharmacist,requireAuthPatient,requireAuthAdmin}=require("./Middleware/authMiddleware")
const{createSales,getSales}=require("./controllers/SalesController")
const{createOrder,cancelOrder,getPatientOrders,getCurrentOrders,getPastOrders}=require("./controllers/orderController")
const{createMessage,sendMessageAsPatient,sendMessageAsPharmacist,getChatMessages}=require("./controllers/messagesController")
const app = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // Replace with your frontend's URL
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//connect to DB
mongoose.connect('mongodb+srv://laylathabet:iwant28.@cluster0.vv8gqjs.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    // listen for req
app.listen(4000,()=>{
    console.log('Connected to DB & listenening on port 4000')
})

})
.catch((error)=>{
    console.log(error)
})

app.post('/register/patient',createPatientP)
app.post("/createRequest",createRequest)
app.post("/createMessage",createMessage)
app.get("/getChatMessages/:username/:doctor",getChatMessages)
app.post("/sendMessageAsPharmacist",sendMessageAsPharmacist)
app.post("/sendMessageAsPatient",sendMessageAsPatient)
app.get("/getMedicines",getMedicines)
app.get("/getAlternativeMedicines",getAlternativeMedicines)
app.get("/getMedicines2",getMedicines2)
app.post("/addMedicine",addMedicine)
app.get("/getMed/:id",getMedicine)
app.put("/updateMed/:id/:medicalUse/:description/:price/:available_quantity",updateMedicine)
app.put("/archiveMedicine/:id",archiveMedicine)
app.put("/unarchiveMedicine/:id",unarchiveMedicine)
app.post("/addAdmin",requireAuthAdmin,createAdmin)
app.get("/getPatients",requireAuthAdmin,getPatientsP)
app.delete("/deletePatient/:id",requireAuthAdmin,deletePatientP)

app.get("/getPharmacist",requireAuthAdmin,getPharmacists)
app.delete("/deletePharmacist/:id",requireAuthAdmin,deletepharmacist)
app.post("/addToCart",requireAuthPatient,addToCart)

app.get("/getRequests",requireAuthAdmin ,getRequests)
app.put("/acceptPRequest/:id",requireAuthAdmin,acceptrequest);
app.put("/rejectPRequest/:id",requireAuthAdmin,rejectrequest);
app.post("/acceptPRequest/:username/:password/:name/:email/:hourly_rate/:affiliation/:educational_background/:Working_license/:Pharmacy_degree",requireAuthAdmin,createPharmacist1)
app.put("/addAddress/:username/:address",requireAuthPatient,addAddress);
app.get("/getAddresses/:username",requireAuthPatient,getAddresses);
app.post('/login', login)
app.get('/logout', logout);
app.get('/getOutOfStockMedicines', requireAuthPharmacist, getOutOfStockMedicines);
app.get("/getPatientCart/:username",requireAuthPatient,getPatientCart)
app.delete("/deleteFromCart/:username/:medicineId",requireAuthPatient,deleteFromCart)
app.put("/updateCart/:username/:medicineId/:newAmount",requireAuthPatient,updateCart)
app.get("/getPatientByUsername/:username",getPatientByUsername);
app.put("/updatePassPatient",updatePasswordPatient);
app.get("/getPharamcistByUsername/:username",getPharmacistByUsername);
app.put("/updatePassPharmacist",updatePasswordPharmacist);
app.get("/getAdminByUsername/:username",getAdminByUsername);
app.put("/updatePassAdmin",updatePasswordAdmin);
app.post("/createOrder/:username/:statuss/:shippingAddress/:paymentMethod/:totalprice",requireAuthPatient,createOrder);
app.put("/cancelOrder/:orderId",requireAuthPatient,cancelOrder);
app.put ("/updateWallet/:username/:amount",updateWallet);
app.get ("/getWallet/:username",getWallet);
app.get("/getPatientOrders/:username",requireAuthPatient,getPatientOrders);
app.get("/getPastOrders/:username",requireAuthPatient,getPastOrders);
app.get("/getCurrentOrders/:username",requireAuthPatient,getCurrentOrders);
app.post("/forgetPassword",forgetPassword);
app.post("/resetPassword/:username",resetPassword);
app.get("/getPharmaWallet/:username",requireAuthPharmacist,getPharmaWallet)
app.post("/updateMedQuantity/:id/:amount",updateMedQuantity);
app.get("/getMedicinesWithSales",getMedicinesWithSales);
app.post("/createsales/:medicine_id/:amount",createSales);
app.get("/getSales",getSales);