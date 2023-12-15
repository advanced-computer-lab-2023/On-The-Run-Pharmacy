
import React from 'react';
const PharmacistDetailsModal = ({ setOpenModal, pharmacist }) => {


    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">

                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className='title'>
                    <h1>Pharmacist</h1>
                </div>
                <div className="metadata">
                <table style={{ fontSize: '16px' }}>
                        <tbody>
                            <tr><td><strong>ID:</strong></td><td>{pharmacist._id}</td></tr>
                            <tr><td><strong>Username:</strong></td><td>{pharmacist.username}</td></tr>
                            <tr><td><strong>Name:</strong></td><td>{pharmacist.name}</td></tr>
                            <tr><td><strong>Affiliation:</strong></td><td>{pharmacist.affiliation}</td></tr>
                            <tr><td><strong>Hourly Rate:</strong></td><td>{pharmacist.hourly_rate} $</td></tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default PharmacistDetailsModal;
