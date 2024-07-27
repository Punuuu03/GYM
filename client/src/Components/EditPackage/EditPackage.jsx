import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditPackage.css'; 
const EditPackage = () => {
    const [packageDetails, setPackageDetails] = useState({
        package_name: '',
        price: '',
        center_id: '',
        no_of_days: '',
        training_type: 'General',
        package_type: 'Basic'
    });
    const [centers, setCenters] = useState([]);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/packages/${id}`)
            .then(response => setPackageDetails(response.data))
            .catch(error => {
                console.error('Error fetching package details:', error);
                setError('Failed to fetch package details');
            });
        
        axios.get('http://localhost:3000/api/centers')
            .then(response => setCenters(response.data))
            .catch(error => {
                console.error('Error fetching centers:', error);
                setError('Failed to fetch centers');
            });
    }, [id]);
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackageDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/packages/${id}`, packageDetails)

            .then(() => navigate('/packages'))
            .catch(error => {
                console.error('Error updating package:', error);
                setError('Failed to update package');
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Edit Package</h2>
                <br></br>
                <div className="field-row">
                    <label>
                        Package Name:
                        <input
                            type="text"
                            name="package_name"
                            value={packageDetails.package_name}
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
                            value={packageDetails.price}
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
                            value={packageDetails.center_id}
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
                            value={packageDetails.no_of_days}
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
                                checked={packageDetails.training_type === 'General'}
                                onChange={handleChange}
                            />
                            General
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="training_type"
                                value="Personal"
                                checked={packageDetails.training_type === 'Personal'}
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
                                checked={packageDetails.package_type === 'Basic'}
                                onChange={handleChange}
                            />
                            Basic
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="package_type"
                                value="Premium"
                                checked={packageDetails.package_type === 'Premium'}
                                onChange={handleChange}
                            />
                            Premium
                        </label>
                    </div>
                </div>
                <button type="submit">Update Package</button>
            </form>
        </div>
    );
};

export default EditPackage;
