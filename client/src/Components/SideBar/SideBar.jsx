import React from 'react';
import './SideBar.css';
import { IoMdSpeedometer } from 'react-icons/io';
import { MdDeliveryDining, MdOutlineExplore, MdOutlinePermContactCalendar } from 'react-icons/md';
import { BsTrophy, BsCreditCard2Front, BsQuestionCircle } from 'react-icons/bs';
import { AiOutlinePieChart } from 'react-icons/ai';
import { BiTrendingUp, BiLogOutCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import NavBar from '../NavBar/NavBar'; 

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    

    Axios.post('http://localhost:3000/logout')
      .then(response => {
        if (response.data.message === 'Logout successful') {
          navigate('/'); 
        } else {
          console.error('Logout failed:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
        navigate('/');
      });
  };

  return (
   
    <div>
       <NavBar /> 
      
      
      <div className='sideBar grid'>


        <div className="menuDiv">
          <h3 className="divTitle">
            QUICK MENU
          </h3>
          <ul className="menuLists grid">
            <li className="listItem">
              <a href="/home" className="menuLink flex">
                <IoMdSpeedometer className="icon" />
                <span className="smallText">
                  Dashboard
                </span>
              </a>
            </li>

            <li className="listItem">
              <a href="/members" className="menuLink flex">
                <MdDeliveryDining className="icon" />
                <span className="smallText">
                  Member
                </span>
              </a>
            </li>

            <li className="listItem">
              <a href="/visitors" className="menuLink flex">
                <MdOutlineExplore className="icon" />
                <span className="smallText">
                  Visitors
                </span>
              </a>
            </li>

            <li className="listItem">
              <a href="/transactions" className="menuLink flex">
                <BsTrophy className="icon" />
                <span className="smallText">
                  Transactions
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="settingsDiv">
          <h3 className="divTitle">
            SETTINGS
          </h3>
          <ul className="menuLists grid">
            <li className="listItem">
              <a href="/centers" className="menuLink flex">
                <AiOutlinePieChart className="icon" />
                <span className="smallText">
                  Centers
                </span>
              </a>
            </li>

            <li className="listItem">
              <a href="/packages" className="menuLink flex">
                <BiTrendingUp className="icon" />
                <span className="smallText">
                  Packages
                </span>
              </a>
            </li>

            <li className="listItem">
              <a href="/export" className="menuLink flex">
                <MdOutlinePermContactCalendar className="icon" />
                <span className="smallText">
                  Export
                </span>
              </a>
            </li>

            

            <li className="listItem">
              <a href="#" className="menuLink flex" onClick={handleLogout}>
                <BiLogOutCircle className="icon" />
                <span className="smallText">
                  Log Out
                </span>
              </a>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default SideBar;
