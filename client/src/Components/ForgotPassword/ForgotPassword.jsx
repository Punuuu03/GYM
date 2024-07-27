import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [status, setStatus] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const navigate = useNavigate();

    const handleVerifyEmail = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/verify-email', { email })
            .then(response => {
                if (response.data.message === 'Email exists') {
                    setStatus('Email verified. You can now update your password.');
                    setIsEmailVerified(true);
                } else {
                    setStatus('Email not found. Please check and try again.');
                    setIsEmailVerified(false);
                }
            })
            .catch(error => {
                setStatus('An error occurred. Please try again.');
                console.error('Error verifying email:', error);
            });
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/update-password', { email, newPassword })
            .then(response => {
                if (response.data.message === 'Password updated successfully') {
                    setStatus('Password updated successfully.');
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    setStatus('Failed to update password. Please try again.');
                }
            })
            .catch(error => {
                setStatus('An error occurred. Please try again.');
                console.error('Error updating password:', error);
            });
    };

    return (
        <div className="forgotPasswordPage">
            <form className="form">
                <h2 className="full-width">Forgot Password</h2>
                <br></br>
                {!isEmailVerified ? (
                    <>
                        <div className="inputGroup">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button onClick={handleVerifyEmail}>Verify Email</button>
                    </>
                ) : (
                    <>
                        <div className="inputGroup">
                            <label>New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={handleUpdatePassword}>Update Password</button>
                    </>
                )}
                {status && <p>{status}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
