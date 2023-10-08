import React,{ useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const PharmaRegistration = () => {
    const navigate = useNavigate();

    const[username,setUsername]=useState('')
const[name,setName]=useState('')
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[date_of_birth,setDate_of_birth]=useState('')
const[hourly_rate,setHourly_rate]=useState('')
const[affiliation,setAffiliation]=useState('')
const [educational_background, setEducational_background] = useState('');

  const [error, setError] = useState(null);
  const [isPatientRegistered, setIsPatientRegistered] = useState(false);

  


    const handleSubmit = async (e) => {
        e.preventDefault();
        const p={username,name,email,password,hourly_rate,affiliation,educational_background}
        try {
          // Make a POST request to your backend API endpoint
          const response = await axios.post('http://localhost:4000/createRequest', p);
      
          if (response.status === 201) {
            console.log('Registration successful:', response.data);
            setUsername('');
            setName('');
            setEmail('');
            setPassword('');
            setDate_of_birth('');
            setHourly_rate('');
            setAffiliation('');
            setEducational_background('');
            setError(null);
            setIsPatientRegistered(true);
           // navigate(`/dashboard/patient/${username}`);
            console.log('Registration successful', response.data);
          }
        } catch (error) {
          // Handle errors, e.g., display an error message to the user
          console.error('Error registering patient:', error);
        }
      };


  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Patient Registration</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    onChange={(e)=>setUsername(e.target.value)}
            value={username}
                    placeholder="Enter your username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
            onChange={(e)=>setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
            onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
            onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>

               

                

                <div className="form-group">
                  <label htmlFor="hourlyRate">Hourly Rate</label>
                  <input
                    type="number"
                    className="form-control"
                    id="hourlyRate"
                    value={hourly_rate}
            onChange={(e) => setHourly_rate(e.target.value)}
                    placeholder="Enter your hourly rate"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="aff">Affiliation</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContactName"
                    value={affiliation}
            onChange={(e) =>
             setAffiliation(e.target.value)
            }
                    placeholder="Enter you Affiliation"
                  />
                </div>

                

                <div className="form-group">
                  <label htmlFor="relationToPatient">Educational Background</label>
                  <input
                    type="text"
                    className="form-control"
                    id="relationToPatient"
                    value={educational_background}
            onChange={(e) =>
              setEducational_background(e.target.value)
            }
                    placeholder="Enter your Educational Background"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>

              <div className="mt-3">
                <Link to="/" className="btn btn-secondary">
                  Back to Role Selection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmaRegistration;
