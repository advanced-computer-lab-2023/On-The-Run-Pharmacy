const Request = require('../models/requestsModel'); 



const createRequest = async (req, res) => {
    try {
        // Extract request data from the request body
        const {
          username,
          name,
          email,
          password,
          date_of_birth,
          hourly_rate,
          affiliation,
          educational_background,
        } = req.body;
    
        // Create a new request object
        const request = new Request({
          username,
          name,
          email,
          password,
          date_of_birth,
          hourly_rate,
          affiliation,
          educational_background,
          
        });
    
        // Save the request to the database
        await request.save();
    
        // Respond with a success message
        res.status(201).json({ message: 'Doctor registration request submitted successfully.' });
      } catch (error) {
        console.error('Error submitting doctor registration request:', error);
        res.status(500).json({ message: 'Internal server error' });
      }


      

};
const getRequests = async (req, res) => {
  try {
    const pharmacists = await Request.find({}).sort({ createdAt: -1 });

    res.status(200).json(pharmacists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the Pharmacists' });
  }
};

const rejectrequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Finds the request by ID and updates the status to "rejected"
    const updatedRequest = await Request.findByIdAndUpdate(
      { _id: id },
      { statuss: 'rejected' },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Request rejected successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while rejecting the request.' });
  }
};

const acceptrequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Finds the request by ID and updates the status to "rejected"
    const updatedRequest = await Request.findByIdAndUpdate(
      { _id: id },
      { statuss: 'accepted' },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Request rejected successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while rejecting the request.' });
  }
};

module.exports = { createRequest ,getRequests,rejectrequest,acceptrequest};






