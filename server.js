const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors');
const {createPatientP,getPatientsP, deletePatientP}= require("./controllers/PatientPController")
const {createRequest,getRequests}=require("./controllers/requestsController")
const{ addMedicine, getMedicine, deleteMedicine, updateMedicine ,getMedicines}=require("./controllers/MedicineController")
const{createAdmin,getAdmin}=require("./controllers/adminController")
const{ createPharmacist, getPharmacists,getPharmacistByUsername, deletepharmacist }=require("./controllers/PharmacistController")

const app = express()
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's URL
  };
  app.use(cors(corsOptions));
  app.use(express.json())
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
app.get("/getPatients",getPatientsP)
app.post('/register/patient',createPatientP)
app.post("/createRequest",createRequest)
app.get("/getMedicines",getMedicines)
app.post("/addMedicine",addMedicine)
app.get("/getMed/:id",getMedicine)
app.put("/updateMed/:id",updateMedicine)
app.post("/addAdmin",createAdmin)
app.get("/getPatients",getPatientsP)
app.delete("/deletePatient/:id",deletePatientP)

app.get("/getPharmacist",getPharmacists)
app.get("/getPatients",getPatientsP)
app.delete("/deletePharmacist/:id",deletepharmacist)
app.get("/searchPharmacistByUsername/:username",getPharmacistByUsername)

app.get("/getRequests",getRequests)

