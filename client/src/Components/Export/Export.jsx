import React, { useState, useEffect } from 'react';
import axios from 'axios';
import exportPDF from './exportPDF';
import './Export.css'; 

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) return '';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
};

const Export = () => {
  const [members, setMembers] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [packages, setPackages] = useState([]);
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersResponse, visitorsResponse, transactionsResponse, packagesResponse, centersResponse] = await Promise.all([
          axios.get('http://localhost:3000/exp/members'),
          axios.get('http://localhost:3000/exp/visitors'),
          axios.get('http://localhost:3000/exp/transactions'),
          axios.get('http://localhost:3000/exp/packages'),
          axios.get('http://localhost:3000/exp/centers'),
        ]);

        setMembers(membersResponse.data);
        setVisitors(visitorsResponse.data);
        setTransactions(transactionsResponse.data);
        setPackages(packagesResponse.data);
        setCenters(centersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleExport = (type) => {
    let data, columns, title;
  
    switch (type) {
      case 'members':
        data = members.map(member => [
          member.id,
          member.name,
          member.phone,
          member.center_id,
          formatDate(member.joining_date),
          member.image || 'N/A'
        ]);
        columns = ['ID', 'Name', 'Phone', 'Center ID', 'Joining Date', 'Image'];
        title = 'Members';
        break;
      case 'visitors':
        data = visitors.map(visitor => [
          visitor.id,
          visitor.name,
          formatDate(visitor.visitDate)
        ]);
        columns = ['ID', 'Name', 'Visit Date'];
        title = 'Visitors';
        break;
      case 'transactions':
        data = transactions.map(transaction => [
          transaction.id,
          transaction.member_id,
          transaction.package_id,
          transaction.offer_price,
          formatDate(transaction.start_date),
          formatDate(transaction.end_date),
          transaction.paid_amount,
          formatDate(transaction.payment_date),
          transaction.payment_mode
        ]);
        columns = ['ID', 'Member ID', 'Package ID', 'Offer Price', 'Start Date', 'End Date', 'Paid Amount', 'Payment Date', 'Payment Mode'];
        title = 'Transactions';
        break;
      case 'packages':
        data = packages.map(pack => [
          pack.id,
          pack.package_name,
          pack.price,
          pack.center_id,
          pack.no_of_days,
          pack.training_type,
          pack.package_type
        ]);
        columns = ['ID', 'Package Name', 'Price', 'Center ID', 'Number of Days', 'Training Type', 'Package Type'];
        title = 'Packages';
        break;
      case 'centers':
        data = centers.map(center => [
          center.id,
          center.name,
          center.address
        ]);
        columns = ['ID', 'Name', 'Address'];
        title = 'Centers';
        break;
      default:
        return;
    }
  
    exportPDF(data, columns, title);
  };
  
  return (
    <div className='lila'>
    <div className="pageContainer">
      <div className="exportContainer">
        <h1>Export Data</h1>
        <p>Select the data type you want to export:</p>
        <button onClick={() => handleExport('members')}>Export Members</button>
        <button onClick={() => handleExport('visitors')}>Export Visitors</button>
        <button onClick={() => handleExport('transactions')}>Export Transactions</button>
        <button onClick={() => handleExport('packages')}>Export Packages</button>
        <button onClick={() => handleExport('centers')}>Export Centers</button>
      </div>
    </div>
    </div>
  );
};

export default Export;
