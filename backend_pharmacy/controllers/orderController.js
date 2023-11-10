const Order= require('../models/OrderModel');
const PatientP = require('../models/PatientPModel');

const createOrder = async (req, res) => {
    try {
        // Extract request data from the request body
        const {
        
        username,
        statuss,
        shippingAddress,
        paymentMethod
          
        } = req.params;
    
        // Create a new request object
        const order = new Order({
          
          username,
          statuss,
          shippingAddress,
          paymentMethod
          
        });
        const patient=await PatientP.findOne({username:username});
    
        // Save the request to the database
        await order.save();
        patient.cart=[];
        await patient.save();
    
        // Respond with a success message
        res.status(201).json({ message: 'Order submitted successfully.' });
      } catch (error) {
        console.error('Error submitting Order:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await order.findOneAndUpdate(
        { orderId: orderId },
        { statuss: 'Cancelled' },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      return res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
      console.error('Error cancelling order:', error);
      return res.status(500).json({ error: 'An error occurred while cancelling the order' });
    }
  };

  const getPatientOrders = async (req, res) => {
    const { username } = req.params;
  
    try {
      const orders = await order.find({ username: username });
  
      if (!orders) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
  
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Error getting orders:', error);
      return res.status(500).json({ error: 'An error occurred while getting the orders' });
    }
  };


module.exports = {createOrder,cancelOrder,getPatientOrders};