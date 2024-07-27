import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddMember.css'; 

const AddMember = () => {
    const [centers, setCenters] = useState([]);
    const [packages, setPackages] = useState([]);
    const [newMember, setNewMember] = useState({
        name: '',
        phone: '',
        center_id: '',
        joining_date: '',
        image: null
    });
    const [transaction, setTransaction] = useState({
        package_id: '',
        offer_price: '',
        start_date: '',
        end_date: '',
        paid_amount: '',
        payment_date: '',
        payment_mode: 'Cash'
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCentersAndPackages = async () => {
            try {
                const [centersResponse, packagesResponse] = await Promise.all([
                    axios.get('http://localhost:3000/api/centers'),
                    axios.get('http://localhost:3000/api/packages')
                ]);
                setCenters(centersResponse.data);
                setPackages(packagesResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data');
            }
        };
        fetchCentersAndPackages();
    }, []);

    const handleMemberChange = (e) => {
        const { name, value } = e.target;
        setNewMember(prev => ({ ...prev, [name]: value }));
    };

    const handleTransactionChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prev => {
            const updatedTransaction = { ...prev, [name]: value };

            if (name === 'start_date' || name === 'package_id') {
                const selectedPackage = packages.find(p => p.id === Number(updatedTransaction.package_id));
                if (selectedPackage && updatedTransaction.start_date) {
                    const startDate = new Date(updatedTransaction.start_date);
                    const endDate = new Date(startDate);
                    endDate.setDate(endDate.getDate() + selectedPackage.no_of_days);
                    updatedTransaction.end_date = endDate.toISOString().split('T')[0];
                }
            }
            return updatedTransaction;
        });
    };

    const handleImageChange = (e) => {
        setNewMember(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in newMember) {
            formData.append(key, newMember[key]);
        }

        try {
            const memberResponse = await axios.post('http://localhost:3000/api/members', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const memberId = memberResponse.data.id;
            const { package_id, offer_price, start_date, end_date, paid_amount, payment_date, payment_mode } = transaction;

            await axios.post('http://localhost:3000/api/transactions', {
                member_id: memberId,
                package_id,
                offer_price,
                start_date,
                end_date,
                paid_amount,
                payment_date,
                payment_mode
            });

            navigate('/members');
        } catch (err) {
            console.error('Error adding member or transaction:', err);
            setError('Failed to add member or transaction');
        }
    };

    return (
        <div className='baher'>
                  <div className="add-member-container">
            <h2>Add New Member</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newMember.name}
                        onChange={handleMemberChange}
                        required
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="tel"
                        name="phone"
                        value={newMember.phone}
                        onChange={handleMemberChange}
                        required
                    />
                </label>
                <label>
                    Center:
                    <select
                        name="center_id"
                        value={newMember.center_id}
                        onChange={handleMemberChange}
                        required
                    >
                        <option value="">Select Center</option>
                        {centers.map(center => (
                            <option key={center.id} value={center.id}>
                                {center.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Joining Date:
                    <input
                        type="date"
                        name="joining_date"
                        value={newMember.joining_date}
                        onChange={handleMemberChange}
                        required
                    />
                </label>
                <label>
                    Package:
                    <select
                        name="package_id"
                        value={transaction.package_id}
                        onChange={handleTransactionChange}
                        required
                    >
                        <option value="">Select Package</option>
                        {packages.map(pkg => (
                            <option key={pkg.id} value={pkg.id}>
                                {pkg.package_name}
                            </option>
                        ))}
                    </select>
                </label>
                {transaction.package_id && (
                    <>
                        <div>Price: {packages.find(pkg => pkg.id === Number(transaction.package_id))?.price}</div>
                        <div>Days: {packages.find(pkg => pkg.id === Number(transaction.package_id))?.no_of_days}</div>
                    </>
                )}
                <label>
                    Offer Price:
                    <input
                        type="number"
                        name="offer_price"
                        value={transaction.offer_price}
                        onChange={handleTransactionChange}
                    />
                </label>
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="start_date"
                        value={transaction.start_date}
                        onChange={handleTransactionChange}
                        required
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        name="end_date"
                        value={transaction.end_date}
                        readOnly
                    />
                </label>
                <label>
                    Paid Amount:
                    <input
                        type="number"
                        name="paid_amount"
                        value={transaction.paid_amount}
                        onChange={handleTransactionChange}
                        required
                    />
                </label>
                <label>
                    Payment Date:
                    <input
                        type="date"
                        name="payment_date"
                        value={transaction.payment_date}
                        onChange={handleTransactionChange}
                        required
                    />
                </label>
                <label>
                    Payment Mode:
                    <select
                        name="payment_mode"
                        value={transaction.payment_mode}
                        onChange={handleTransactionChange}
                        required
                    >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="Online">Online</option>
                    </select>
                </label>
                <label>
                    Upload Image:
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                </label>
                <button type="submit">Add Member</button>
            </form>
        </div>
        </div>
  
    );
};

export default AddMember;
