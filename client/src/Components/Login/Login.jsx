import React, { useState } from 'react';
import '../Register/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import video from '../../Assets/video.mp4';
import logo from '../../Assets/logo.jpg';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigateTo = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/login', {
            LoginUserName: username,   
            LoginPassword: password   
        }).then((response) => {
            navigateTo('/home');
            setUsername('');
            setPassword('');
        }).catch((error) => {
            console.error('Login failed:', error);
        });
    };
    
    

    return (
        <div className="registerPage flex">
            <div className="container flex">
                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>
                    <div className="textDiv">
                        <h2 className="title">Welcome Back!</h2>
                        <p>Let's get you logged in.</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className="text">Don't have an account?</span>
                        <Link to={'/register'}>
                            <button className="btn">Register</button>
                        </Link>
                    </div>
                </div>
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Welcome Back!</h3>
                    </div>
                    <form className="form grid" onSubmit={loginUser}>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUser className="icon" />
                                <input type="text" id='username' placeholder='Enter Username'
                                    onChange={(event) => setUsername(event.target.value)} />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />
                                <input type="password" id='password' placeholder='Enter Password'
                                    onChange={(event) => setPassword(event.target.value)} />
                            </div>
                        </div>
                        <button type='submit' className='btn flex'>
                            <span>Login</span>
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

export default Login;
