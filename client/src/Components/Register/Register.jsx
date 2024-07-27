import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import video from '../../Assets/video.mp4';
import logo from '../../Assets/logo.jpg';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';

const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigateTo = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUserNameChange = (e) => setUserName(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const createUser = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/register', {
            Email: email,
            UserName: userName,
            Password: password
        }).then(() => {
            navigateTo('/');
            setEmail('');
            setUserName('');
            setPassword('');
        });
    };

    return (
        <div className="registerPage flex">
            <div className="container flex">
                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>
                    <div className="textDiv">
                        <h2 className="title">What seems impossible today will one day be your warm-up</h2>
                        <p>Impossible is nothing</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className="text">Have an account?</span>
                        <Link to={'/'}>
                            <button className="btn">Login</button>
                        </Link>
                    </div>
                </div>
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo" />
                        <h3>Let Us Know You!</h3>
                    </div>
                    <form className="form grid" onSubmit={createUser}>
                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className="icon" />
                                <input
                                    type="email"
                                    id='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input
                                    type="text"
                                    id='username'
                                    placeholder='Enter Username'
                                    value={userName}
                                    onChange={handleUserNameChange}
                                />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />
                                <input
                                    type="password"
                                    id='password'
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>
                        <button type='submit' className='btn flex'>
                            <span>Register</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>
                        <span className="forgotPassword">
                            Forgot your password? <Link to="/forgot-password">Click Here</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
