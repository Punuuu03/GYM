import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Center.css';

const Center = () => {
    const [centers, setCenters] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRefs = useRef({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/centers')
            .then(result => {
                if (result.data.Status) {
                    setCenters(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error('Error fetching centers:', err));
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
        if (window.confirm('Are you sure you want to delete this center?')) {
            axios.delete(`http://localhost:3000/centers/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        setCenters(prevCenters => prevCenters.filter(center => center.id !== id));
                        setOpenDropdownId(null);
                    } else {
                        alert(result.data.Error);
                    }
                })
                .catch(err => console.error('Error deleting center:', err));
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit_center/${id}`);
        setOpenDropdownId(null);
    };

    return (
        <div className="center-container">
            <Link to="/add_center" className="add-center-link">Add Center</Link>
            <div>
                <h3>Center List</h3>
            </div>
            <div>
                <table id="center-table">
                    <thead>
                        <tr>
                            <th>Center Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {centers.map(center => (
                            <tr key={center.id}>
                                <td>{center.name}</td>
                                <td>{center.address}</td>
                                <td>
                                    <div className="dropdown" ref={el => dropdownRefs.current[center.id] = el}>
                                        <button onClick={() => setOpenDropdownId(openDropdownId === center.id ? null : center.id)}>
                                            &#x2022;&#x2022;&#x2022;
                                        </button>
                                        {openDropdownId === center.id && (
                                            <div className="dropdown-content">
                                                <button onClick={() => handleEdit(center.id)}>Edit</button>
                                                <button onClick={() => handleDelete(center.id)}>Delete</button>
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

export default Center;
