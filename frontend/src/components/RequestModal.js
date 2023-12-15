import React from 'react';
import { useNavigate } from 'react-router-dom';

const RequestModal = ({ setOpenModal, request }) => {

    const navigate = useNavigate();
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
                    <h1>Request</h1>
                </div>
                <div className="metadata">
                    <table style={{ fontSize: '16px' }}>
                        <tbody>
                            <tr><td><strong>Request ID:</strong></td><td>{request._id}</td></tr>
                            <tr><td><strong>Username:</strong></td><td>{request.username}</td></tr>
                            <tr><td><strong>Name:</strong></td><td>{request.name}</td></tr>
                            <tr><td><strong>Email:</strong></td><td>{request.email}</td></tr>
                            <tr><td><strong>Date of Birth:</strong></td><td>{request.date_of_birth} $</td></tr>
                            <tr><td><strong>Hourly Rate:</strong></td><td>{request.hourly_rate}</td></tr>
                            <tr><td><strong>Affiliation:</strong></td><td>{request.affiliation}</td></tr>
                            <tr><td><strong>Educational Background:</strong></td><td>{request.educational_background}</td></tr>
                            <tr><td><strong>status:</strong></td><td>{request.statuss}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RequestModal;