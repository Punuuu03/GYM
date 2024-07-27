import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Members.css';
import defaultProfileImage from '../../Assets/default.jpeg'; 

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date)) return '';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/adp/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  return (
    
      <div className="content">
       
        <Link to="/add_member" className="add-member-button">Add Member</Link>
        <div>
                <h3>Member List</h3>
            </div>
        
        
        <table className="members-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Center Name</th>
              <th>Joining Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>
                  <Link to={`/member_profile/${member.id}`}>
                    <img
                      src={member.image ?  defaultProfileImage : defaultProfileImage}
                      className="member-image"
                    />
                  </Link>
                </td>
                <td>{member.name}</td>
                <td>{member.phone}</td>
                <td>{member.centerName}</td>
                <td>{formatDate(member.joiningDate)}</td>
                <td>
                  <a href={`tel:${member.phone}`}><FaPhone /></a>
                  <a href={`https://wa.me/${member.phone}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
  );
};

export default Members;
