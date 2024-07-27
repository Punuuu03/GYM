import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Transactions.css';

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) return '';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
};

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/transactions')
            .then(result => {
                console.log('Fetched transactions:', result.data); 
                setTransactions(result.data);
            })
            .catch(err => {
                console.error('Error fetching transactions:', err);
                if (err.response) {
                    console.error('Response data:', err.response.data);
                    console.error('Response status:', err.response.status);
                    console.error('Response headers:', err.response.headers);
                } else if (err.request) {
                    console.error('Request data:', err.request);
                } else {
                    console.error('Error message:', err.message);
                }
            });
    }, []);

    const groupByMemberId = (transactions) => {
        return transactions.reduce((grouped, transaction) => {
            const { member_id, member_name } = transaction;
            if (!grouped[member_id]) {
                grouped[member_id] = { name: member_name, transactions: [] };
            }
            grouped[member_id].transactions.push(transaction);
            return grouped;
        }, {});
    };

    const groupedTransactions = groupByMemberId(transactions);

    return (
        <div className="main-container">
            <div className="transaction-container">
                <h3>Transaction List</h3>
                <table id="transaction-table">
                    <thead id="transaction-thead">
                        <tr id="transaction-tr">
                            <th id="transaction-th">Member ID</th>
                            <th id="transaction-th">Member Name</th>
                            <th id="transaction-th">Transaction ID</th>
                            <th id="transaction-th">Package ID</th>
                            <th id="transaction-th">Offer Price</th>
                            <th id="transaction-th">Start Date</th>
                            <th id="transaction-th">End Date</th>
                            <th id="transaction-th">Paid Amount</th>
                            <th id="transaction-th">Payment Date</th>
                            <th id="transaction-th">Payment Mode</th>
                        </tr>
                    </thead>
                    <tbody id="transaction-tbody">
                        {Object.keys(groupedTransactions).length > 0 ? (
                            Object.keys(groupedTransactions).map(memberId => (
                                groupedTransactions[memberId].transactions.map((transaction, index) => (
                                    <tr id="transaction-tr" key={transaction.transaction_id}>
                                        {index === 0 && <td id="transaction-td" rowSpan={groupedTransactions[memberId].transactions.length}>{memberId}</td>}
                                        {index === 0 && <td id="transaction-td" rowSpan={groupedTransactions[memberId].transactions.length}>{groupedTransactions[memberId].name}</td>}
                                        <td id="transaction-td">{transaction.transaction_id}</td>
                                        <td id="transaction-td">{transaction.package_id}</td>
                                        <td id="transaction-td">{transaction.offer_price}</td>
                                        <td id="transaction-td">{formatDate(transaction.start_date)}</td>
                                        <td id="transaction-td">{formatDate(transaction.end_date)}</td>
                                        <td id="transaction-td">{transaction.paid_amount}</td>
                                        <td id="transaction-td">{formatDate(transaction.payment_date)}</td>
                                        <td id="transaction-td">{transaction.payment_mode}</td>
                                    </tr>
                                ))
                            ))
                        ) : (
                            <tr id="transaction-tr">
                                <td id="transaction-td" colSpan="10">No transactions found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;
