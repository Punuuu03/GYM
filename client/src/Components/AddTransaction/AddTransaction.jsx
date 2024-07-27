import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddTransaction.css';

const AddTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newTransaction, setNewTransaction] = useState({
    package_id: '',
    offer_price: 0,
    start_date: '',
    end_date: '',
    paid_amount: 0,
    payment_date: '',
    payment_mode: 'Cash'
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/transactions', {
        member_id: id,
        ...newTransaction,
      });

      if (response.status === 200) {
        setSuccessMessage('Transaction added successfully');
        setTimeout(() => {
          navigate(`/member_profile/${id}`, { state: { showTransactions: true } });
        }, 1000);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      setErrorMessage('Failed to add transaction');
    }
  };

  return (
    <div className='eth'>
    <div className="add-transaction-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <form onSubmit={handleAddTransaction}>
      <h3>Add New Transaction</h3>
        <label>
          Package ID:
          <input type="number" value={newTransaction.package_id} onChange={(e) => setNewTransaction({ ...newTransaction, package_id: parseInt(e.target.value) })} required />
        </label>
        <label>
          Offer Price:
          <input type="number" step="0.01" value={newTransaction.offer_price} onChange={(e) => setNewTransaction({ ...newTransaction, offer_price: parseFloat(e.target.value) })} required />
        </label>
        <label>
          Paid Amount:
          <input type="number" step="0.01" value={newTransaction.paid_amount} onChange={(e) => setNewTransaction({ ...newTransaction, paid_amount: parseFloat(e.target.value) })} required />
        </label>
        <label>
          Payment Date:
          <input type="date" value={newTransaction.payment_date} onChange={(e) => setNewTransaction({ ...newTransaction, payment_date: e.target.value })} required />
        </label>
        <label>
          Payment Mode:
          <select value={newTransaction.payment_mode} onChange={(e) => setNewTransaction({ ...newTransaction, payment_mode: e.target.value })}>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Online">Online</option>
          </select>
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
    </div>
  );
};

export default AddTransaction;
