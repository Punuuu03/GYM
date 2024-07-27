import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPackage.css';

const AddPackage = () => {
    const [centers, setCenters] = useState([]);
    const [newPackage, setNewPackage] = useState({
        package_name: '',
        price: '',
        center_id: '',
        no_of_days: '',
        training_type: 'General',
        package_type: 'Basic',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/centers')
            .then(response => setCenters(response.data))
            .catch(error => {
                console.error('Error fetching centers:', error);
                setError('Failed to fetch centers');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPackage(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/packages', newPackage)
            .then(response => {
                navigate('/packages');
            })
            .catch(error => {
                console.error('Error adding package:', error);
                setError('Failed to add package');
            });
    };

    return (
        <div>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <h2>Add New Package</h2>
<br></br>
                <div className="field-row">
                    <label>
                        Package Name:
                        <input
                            type="text"
                            name="package_name"
                            value={newPackage.package_name}
                            onChange={handleChange}
                            required
                        />
                        </label>
                        </div>
                     <div className="field-row">
                        <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={newPackage.price}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </label>
                </div>

                <div className="field-row">
                    <label>
                        Center:
                        <select
                            name="center_id"
                            value={newPackage.center_id}
                            onChange={handleChange}
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
                        </div>
                        <div className="field-row">
                    <label>
                    
                        Number of Days:
                        <input
                            type="number"
                            name="no_of_days"
                            value={newPackage.no_of_days}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                    <div className="field-group">
                        <label>
                            Training Type:
                            
                                </label>
                                <div>
                                    <label>
                                    <input
                                        type="radio"
                                        name="training_type"
                                        value="General"
                                        checked={newPackage.training_type === 'General'}
                                        onChange={handleChange}
                                    />
                                    General
                                    </label>
                                    <label>
                               
                                    <input
                                        type="radio"
                                        name="training_type"
                                        value="Personal"
                                        checked={newPackage.training_type === 'Personal'}
                                        onChange={handleChange}
                                    />
                                    Personal
                                </label>
                            </div>
                    
                    </div>
                    <div className="field-group">
                        <label>
                            Package Type:
                            </label>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="package_type"
                                        value="Basic"
                                        checked={newPackage.package_type === 'Basic'}
                                        onChange={handleChange}
                                    />
                                    Basic
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="package_type"
                                        value="Premium"
                                        checked={newPackage.package_type === 'Premium'}
                                        onChange={handleChange}
                                    />
                                    Premium
                                </label>
                            </div>
                        
                    </div>
                

                <button type="submit">Add Package</button>
            </form>
        </div>
    );
};

export default AddPackage;
