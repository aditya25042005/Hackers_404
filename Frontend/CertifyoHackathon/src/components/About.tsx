import React from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import '../static/about.css'; // Make sure to create this file

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">About Us</h1>
          <p className="about-description">
            Welcome to our company! We specialize in building cutting-edge AI tools that empower individuals and businesses to solve complex problems with ease and efficiency. Our mission is to innovate and create AI-powered solutions that drive the future.
          </p>
          <div className="team-grid">
            <div className="team-card">
              <h2>Aditya Gupta</h2>
              <p className="role">Frontend Developer</p>
              <p>Responsible for crafting engaging and user-friendly interfaces.</p>
            </div>
            <div className="team-card">
              <h2>Aditya Karn</h2>
              <p className="role">Backend Developer</p>
              <p>Builds robust and scalable server-side applications and APIs.</p>
            </div>
            <div className="team-card">
              <h2>Ansh Singh</h2>
              <p className="role">ML Developer</p>
              <p>Develops intelligent machine learning models for real-world problems.</p>
            </div>
            <div className="team-card">
              <h2>Sristik</h2>
              <p className="role">ML Developer</p>
              <p>Works on training, optimizing, and deploying AI models.</p>
            </div>
          </div>
          <div id='students'>We are the Sutdents of Indian Institute of Thechnology Kottayam </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
