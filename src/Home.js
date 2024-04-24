import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import animi from './animi.json';
import Lottie from 'lottie-react';

const Home = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
        <Link className="navbar-brand" to="/">
  EXPENSES TRACKER
  <span style={{ color: 'green', fontSize: '15px', marginLeft: '5px' }}>●</span>
</Link>

        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <div className="row">
          {/* Left Side - Animation */}
          <div className="col-md-6">
            <Lottie animationData={animi} />
          </div>
          
          {/* Right Side - Text and Button */}
          <div className="col-md-6 d-flex align-items-center">
            <div style={{ textAlign: 'center' }}>
              <h2>Track Your Expenses Here</h2>
              <p>Get started now by tracking your expenses with our easy-to-use Expense Tracker.</p>
              <Link to="/ExpenseTracker" className="btn btn-primary">Get Started</Link> {/* Use Link to navigate */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
