import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddVisitors.css'; 

const AddVisitors = () => {
    const [centers, setCenters] = useState([]);
    const [visitorData, setVisitorData] = useState({
        image: '',
        name: '',
        mobile: '',
        center_id: '',
        visiting_date: '',
        gender: '',
        enquiry_mode: '',
        address: '',
        interested_in_joining: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchCenters();
    }, []);

    const fetchCenters = async () => {
        const response = await axios.get('http://localhost:3000/api/centers');
        setCenters(response.data);
    };

    const handleChange = (e) => {
        setVisitorData({ ...visitorData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/add_visitors', visitorData);
        setVisitorData({
            image: '',
            name: '',
            mobile: '',
            center_id: '',
            visiting_date: '',
            gender: '',
            enquiry_mode: '',
            address: '',
            interested_in_joining: ''
        });
        navigate('/visitors');
    };

    return (
        <div className='aat'>
        <div className="add-visitor-container">
            <form onSubmit={handleSubmit}>
                <h2>Add Visitor</h2>
                <div className="image-field">
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" name="image" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={visitorData.name} onChange={handleChange} placeholder="Name" />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" id="mobile" name="mobile" value={visitorData.mobile} onChange={handleChange} placeholder="Mobile" />
                </div>
                <div>
                    <label htmlFor="center_id">Select Center</label>
                    <select id="center_id" name="center_id" value={visitorData.center_id} onChange={handleChange}>
                        <option value="">Select Center</option>
                        {centers.map(center => (
                            <option key={center.id} value={center.id}>{center.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="visiting_date">Visiting Date</label>
                    <input type="date" id="visiting_date" name="visiting_date" value={visitorData.visiting_date} onChange={handleChange} />
                </div>
                <div>
                    <label>Gender</label>
                    <label>
                        <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
                    </label>
                    <label>
                        <input type="radio" name="gender" value="Other" onChange={handleChange} /> Other
                    </label>
                </div>
                <div>
                    <label>Enquiry Mode</label>
                    <label>
                        <input type="radio" name="enquiry_mode" value="Call" onChange={handleChange} /> Call
                    </label>
                    <label>
                        <input type="radio" name="enquiry_mode" value="Visit" onChange={handleChange} /> Visit
                    </label>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <textarea id="address" name="address" value={visitorData.address} onChange={handleChange} placeholder="Address"></textarea>
                </div>
                <div>
                    <label>Interested in Joining</label>
                    <label>
                        <input type="radio" name="interested_in_joining" value="Yes" onChange={handleChange} /> Yes
                    </label>
                    <label>
                        <input type="radio" name="interested_in_joining" value="No" onChange={handleChange} /> No
                    </label>
                </div>
                <button type="submit">Add Visitor</button>
            </form>
        </div>
        </div>
    );
};

export default AddVisitors;
