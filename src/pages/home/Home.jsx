
import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials.jsx";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-left">

          <span className="badge">Online Learning Platform</span>

          <h1>
            Upgrade Your Skills <br />
            With Modern Learning
          </h1>

          <p>
            Explore high quality courses, learn from experienced instructors
            and build skills that help you grow in your career.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/courses")}
            >
              Explore Courses
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/about")}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="info-card">
            <h3>10K+</h3>
            <p>Active Students</p>
          </div>

          <div className="info-card">
            <h3>120+</h3>
            <p>Courses Available</p>
          </div>

          <div className="info-card">
            <h3>50+</h3>
            <p>Expert Mentors</p>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default Home;