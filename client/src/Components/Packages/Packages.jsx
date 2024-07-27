

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Packages.css';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRefs = useRef({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/packages')
            .then(response => setPackages(response.data))
            .catch(error => console.error('Error fetching packages:', error));
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
        if (window.confirm('Are you sure you want to delete this package?')) {
            axios.delete(`http://localhost:3000/api/packages/${id}`)
                .then(() => {
                    setPackages(packages.filter(pkg => pkg.id !== id));
                    setOpenDropdownId(null);
                })
                .catch(err => console.error('Error deleting package:', err));
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit_package/${id}`);
        setOpenDropdownId(null);
    };

    return (
        <div className="packages-container">
           
            <Link to='/add_package' className="add-package-link">Add New Package</Link>
            <h2>Package List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>Price & Days</th>
                        <th>Center</th>
                        <th>Training Type</th>
                        <th>Package Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map(pkg => (
                        <tr key={pkg.id}>
                            <td>{pkg.package_name}</td>
                            <td>{`Price: ${pkg.price}, Days: ${pkg.no_of_days}`}</td>
                            <td>{pkg.center_name}</td>
                            <td>{pkg.training_type}</td>
                            <td>{pkg.package_type}</td>
                            <td>
                                <div className="dropdown" ref={el => dropdownRefs.current[pkg.id] = el}>
                                    <button onClick={() => setOpenDropdownId(openDropdownId === pkg.id ? null : pkg.id)}>
                                        &#x2022;&#x2022;&#x2022;
                                    </button>
                                    {openDropdownId === pkg.id && (
                                        <div className="dropdown-content">
                                            <button onClick={() => handleEdit(pkg.id)}>Edit</button>
                                            <button onClick={() => handleDelete(pkg.id)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Packages;
