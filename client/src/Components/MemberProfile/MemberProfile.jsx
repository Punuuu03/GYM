import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './MemberProfile.css'; 
import defaultProfileImage from '../../Assets/default.jpeg'; 

const MemberProfile = () => {
  const { id } = useParams(); 
  const [member, setMember] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isPersonalInfoVisible, setIsPersonalInfoVisible] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const { data: memberData } = await axios.get(`http://localhost:3000/api/members/${id}`);
        setMember(memberData);

        const { data: transactionData } = await axios.get(`http://localhost:3000/api/transactions/${id}`);
        setTransactions(transactionData);

        setLoading(false);
      } catch (err) {
        setErrorMessage('Error fetching data: ' + err.message);
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p className="error">{errorMessage}</p>; 
  if (!member) return <p>No member data available.</p>;

  const packageId = transactions.length > 0 ? transactions[0].package_id : '';
  const offerPrice = transactions.length > 0 ? transactions[0].offer_price : 0;

  let remainingAmount = offerPrice; 
  const showAddButton = remainingAmount > 0; 
  return (
    <div className='profile-container'>
      <div className="profile-header">
        <img
          src={member.image ? defaultProfileImage : defaultProfileImage}
          alt={`${member.name}'s profile`}
        />
        <h1>{member.name}</h1>
      </div>

      <div className="button-container">
        <button onClick={() => setIsPersonalInfoVisible(true)}>Personal Info</button>
        <button onClick={() => setIsPersonalInfoVisible(false)}>Transactions</button>
      </div>

      {isPersonalInfoVisible ? (
        <div className="personal-info">
          <h2>Personal Information</h2>
          <p>Name: {member.name}</p>
          <p>Phone: {member.phone}</p>
          <p>Joining Date: {new Date(member.joining_date).toLocaleDateString()}</p>
          <p>Center Name: {member.center_name}</p>
        </div>
      ) : (
        <div className="transactions">
          <h2>Transactions</h2>
          {successMessage && <div className="success">{successMessage}</div>}
          {errorMessage && <div className="error">{errorMessage}</div>}
          {transactions.length > 0 ? (
            <div>
              {showAddButton && (
                <div className="add-transaction-button">
                  <button onClick={() => navigate(`/add_transaction/${id}`)}>
                    Add Transaction
                  </button>
                </div>
              )}
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Package ID</th>
                    <th>Offer Price</th>
                    <th>Paid Amount</th>
                    <th>Remaining Amount</th>
                    <th>Payment Date</th>
                    <th>Payment Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => {
                    const currentRemainingAmount = remainingAmount - transaction.paid_amount;
                    remainingAmount = currentRemainingAmount;

                    return (
                      <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.package_id}</td>
                        <td>${offerPrice.toFixed(2)}</td>
                        <td>${transaction.paid_amount.toFixed(2)}</td>
                        <td>
                          {remainingAmount > 0 ? `$${remainingAmount.toFixed(2)}` : 'Clear Transaction'}
                        </td>
                        <td>{new Date(transaction.payment_date).toLocaleDateString()}</td>
                        <td>{transaction.payment_mode}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No transactions available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberProfile;
