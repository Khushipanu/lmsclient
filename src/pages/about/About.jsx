
import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-section">

      <div className="about-container">

        <div className="about-text">
          <h1>Empowering Learning Everywhere</h1>

          <p>
            Our platform is designed to make learning simple, engaging,
            and practical. We focus on providing high-quality courses
            that help students develop real skills through clear
            explanations and hands-on examples.
          </p>

          <p>
            Whether you are a beginner or someone looking to upgrade
            your skills, our courses are built to help you learn at
            your own pace and gain confidence in modern technologies.
          </p>
        </div>

        <div className="about-features">

          <div className="feature-card">
            <h3>📚 Practical Courses</h3>
            <p>Learn through real projects and industry examples.</p>
          </div>

          <div className="feature-card">
            <h3>🎓 Student Focused</h3>
            <p>Designed to make complex topics simple and clear.</p>
          </div>

          <div className="feature-card">
            <h3>🚀 Career Growth</h3>
            <p>Build skills that help you grow in real careers.</p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default About;