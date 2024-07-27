import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCenter.css';

const EditCenter = () => {
    const { id } = useParams(); 
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/centers/${id}`)
            .then(result => {
                if (result.data.Status) {
                    setName(result.data.Result.name);
                    setAddress(result.data.Result.address);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error('Error fetching center:', err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/centers/${id}`, { name, address })
            .then(result => {
                if (result.data.Status) {
                    navigate('/centers'); 
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error('Error updating center:', err));
    };

    return (
        <div className='sen'> 
            <div className="add-center-container">

                <div>
                    <form onSubmit={handleSubmit}>
                        <h2>Edit Center</h2>
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
                        <button type="submit">Update Center</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCenter;
