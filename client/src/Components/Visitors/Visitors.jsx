import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Visitors.css'; 
import defaultProfileImage from '../../Assets/default.jpeg';

const Visitors = () => {
    const [visitors, setVisitors] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRefs = useRef({});

    useEffect(() => {
        axios.get('http://localhost:3000/visitors')
            .then(result => {
                if (result.data.Status) {
                    setVisitors(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error('Error fetching visitors:', err));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRefs.current && !Object.values(dropdownRefs.current).some(ref => ref && ref.contains(event.target))) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this visitor?')) {
            axios.delete(`http://localhost:3000/visitors/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        setVisitors(prevVisitors => prevVisitors.filter(visitor => visitor.id !== id));
                        setOpenDropdownId(null);
                    } else {
                        alert(result.data.Error);
                    }
                })
                .catch(err => console.error('Error deleting visitor:', err));
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="visitor-container">
            <Link to="/add_visitors" className="add-visitor-link">Add Visitor</Link>
            <div>
                <h3>Visitor List</h3>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Center Name</th>
                            <th>Visiting Date</th>
                            <th>Gender</th>
                            <th>Enquiry Mode</th>
                            <th>Address</th>
                            <th>Interested in Joining</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.map(visitor => (
                            <tr key={visitor.id}>
                                <td>
                                    <img
                                        src={visitor.image ? defaultProfileImage : defaultProfileImage}
                                        className="visitor-image"
                                        
                                    />
                                </td>
                                <td>{visitor.name}</td>
                                <td>{visitor.mobile}</td>
                                <td>{visitor.center_name}</td>
                                <td>{formatDate(visitor.visiting_date)}</td>
                                <td>{visitor.gender}</td>
                                <td>{visitor.enquiry_mode}</td>
                                <td>{visitor.address}</td>
                                <td>{visitor.interested_in_joining}</td>
                                <td>
                                    <div className="dropdown" ref={el => dropdownRefs.current[visitor.id] = el}>
                                        <button onClick={() => setOpenDropdownId(openDropdownId === visitor.id ? null : visitor.id)}>
                                            &#x2022;&#x2022;&#x2022;
                                        </button>
                                        {openDropdownId === visitor.id && (
                                            <div className="dropdown-content">
                                                <button onClick={() => handleDelete(visitor.id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Visitors;
