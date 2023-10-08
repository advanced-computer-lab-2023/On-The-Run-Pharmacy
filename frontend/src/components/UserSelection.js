import React from 'react';
import { Link } from 'react-router-dom';

const UserSelection = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card text-center">
            <div className="card-body">
              <h1 className="card-title">Select Your Role</h1>
              <div className="mt-4">
                <Link to="/register/patient" className="btn btn-primary btn-lg btn-block mb-3">
                  Register as Patient
                </Link>
                <Link to="/register/pharmacist" className="btn btn-success btn-lg btn-block">
                  Register as Pharmacist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
