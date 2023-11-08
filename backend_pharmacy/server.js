const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {createPatientP,getPatientsP, deletePatientP,addToCart}= require("./controllers/PatientPController")
const {createRequest,getRequests,rejectrequest,acceptrequest}=require("./controllers/requestsController")
const{ addMedicine, getMedicine, deleteMedicine, updateMedicine ,getMedicines}=require("./controllers/MedicineController")
const{createAdmin,getAdmin}=require("./controllers/adminController")
const{ createPharmacist, getPharmacists, deletepharmacist,createPharmacist1 }=require("./controllers/PharmacistController")
const{login,logout}=require("./controllers/userController")
const{requireAuthPharmacist,requireAuthPatient,requireAuthAdmin}=require("./Middleware/authMiddleware")
const app = express()
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's URL
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
app.get("/getMedicines",getMedicines)
app.post("/addMedicine",addMedicine)
app.get("/getMed/:id",getMedicine)
app.put("/updateMed/:id",updateMedicine)
app.post("/addAdmin",requireAuthAdmin,createAdmin)
app.get("/getPatients",requireAuthAdmin,getPatientsP)
app.delete("/deletePatient/:id",requireAuthAdmin,deletePatientP)

app.get("/getPharmacist",requireAuthAdmin,getPharmacists)
app.delete("/deletePharmacist/:id",requireAuthAdmin,deletepharmacist)
app.post("/addToCart",addToCart)

app.get("/getRequests",requireAuthAdmin,getRequests)
app.put("/acceptPRequest/:id",requireAuthAdmin,acceptrequest);
app.put("/rejectPRequest/:id",requireAuthAdmin,rejectrequest);
app.post("/acceptPRequest/:username/:password/:name/:email/:hourly_rate/:affiliation/:educational_background/:Working_license/:Pharmacy_degree",createPharmacist1)
app.post('/login', login)
app.get('/logout', logout);