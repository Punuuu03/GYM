import React from 'react';
import { FaCheckCircle, FaDumbbell, FaTachometerAlt, FaRulerCombined, FaWeightHanging } from 'react-icons/fa'; 
import './Home.css';

const Home = () => {
  return (
    <div className='main'>
      <div className="home-header">
        <h3 className="header-title">Explore Our Collection</h3>
      </div>
      <div className="home-container">
        <div className="image-row">
          <div className="image-container" style={{ backgroundImage: 'url(https://cdn-magazine.nutrabay.com/wp-content/uploads/2023/02/strong-bodybuilder-doing-heavy-weight-exercise-back-machine-1-1067x800.jpg)' }}>
            <div className="image-overlay">
              <p className="overlay-text">Muscle Strainer</p>
            </div>
          </div>
          <div className="image-container" style={{ backgroundImage: 'url(https://i0.wp.com/goldsgym.in/wp-content/uploads/2023/12/compress-strong-man-training-gym-min-scaled.jpg?fit=2560%2C1707&ssl=1)' }}>
            <div className="image-overlay">
              <p className="overlay-text">Treadmill</p>
            </div>
          </div>
          <div className="image-container" style={{ backgroundImage: 'url(https://img.grouponcdn.com/deal/ttXVArM2U7oZcUd8CkSu/Di-2048x1229/v1/c870x524.jpg)' }}>
            <div className="image-overlay">
              <p className="overlay-text">Roping</p>
            </div>
          </div>
          <div className="image-container" style={{ backgroundImage: 'url(https://saajo.in/wp-content/uploads/2019/06/Benefits-of-Hitting-a-Gym-for-Women.jpg)' }}>
            <div className="image-overlay">
              <p className="overlay-text">Weight Lifting</p>
            </div>
          </div>
        </div>
        <div className="membership-plans">
          <h3 className="plans-heading">Choose Your Membership Plan</h3>
          <br></br>
          <div className="plan-container basic-plan">
  <FaDumbbell className="plan-icon" />
  <h4 className="plan-title">Basic Plan</h4>
  <p className="plan-description">Sweat Starter</p>
  <div className="plan-subscription-charges">
    <p className="plan-subscription">Subscription: Monthly</p>
    <p className="plan-charges"><b>Charges: ₹2000</b></p>
    
  </div>
  <ul className="plan-features">
    <li><FaCheckCircle className="feature-icon" /> Access to Gym Equipment</li>
    <li><FaCheckCircle className="feature-icon" /> Group Fitness Classes</li>
    <li><FaCheckCircle className="feature-icon" /> Free Consultation</li>
    <li><FaCheckCircle className="feature-icon" /> Personal Locker</li>
  </ul>
  <button className="plan-button">Join Now</button>
</div>
          
<div className="plan-container premium-plan">
  <FaTachometerAlt className="plan-icon" />
  <h4 className="plan-title">Premium Plan</h4>
  <p className="plan-description">Elite Experience</p>
  <div className="plan-subscription-charges">
    <p className="plan-subscription">Subscription: Monthly</p>
    <p className="plan-charges"><b>Charges: ₹4000</b></p>
  </div>
  <ul className="plan-features">
    <li><FaCheckCircle className="feature-icon" /> All Basic Plan Features</li>
    <li><FaCheckCircle className="feature-icon" /> Unlimited Group Classes</li>
    <li><FaCheckCircle className="feature-icon" /> Free Personal Training</li>
    <li><FaCheckCircle className="feature-icon" /> Premium Locker Access</li>
  </ul>
  <button className="plan-button">Join Now</button>
</div>

        </div>
      </div>
    </div>
  );
};

export default Home;
