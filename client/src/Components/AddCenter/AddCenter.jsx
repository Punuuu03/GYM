import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCenter.css';

const AddCenter = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/add_center', { name, address })
            .then(result => {
                if (result.data.Status) {
                    navigate('/centers');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error('Error adding center:', err));
    };

    return (
        <div className='sen'>
        <div className="add-center-container">
            <div>
                
                <form onSubmit={handleSubmit}>
                <h2>Add Center</h2>
                    <div>
                        <label htmlFor='name'><strong>Center Name:</strong></label>
                        <input
                            type='text'
                            name='name'
                            placeholder='Enter center name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='address'><strong>Address:</strong></label>
                        <input
                            type='text'
                            name='address'
                            placeholder='Enter center address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Add Center</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default AddCenter;
