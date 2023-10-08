const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors');
const {createPatientP,getPatientsP}= require("./controllers/PatientPController")
const {createRequest}=require("./controllers/requestsController")

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
