
import React from 'react'
import './Testimonials.css'

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Rohan Kumar",
      position: "Web Development Student",
      message:
        "Before joining this platform, I struggled with understanding JavaScript. Now I build full-stack apps confidently! The mentors are so helpful.",
        image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80", // ✅ new image of male student with laptop
    },

    {
      id: 2,
      name: "Mohan Singh",
      position: "Data Science Learner",
      message:
        "The hands-on projects gave me real industry exposure. I even landed an internship thanks to the portfolio I built here!",
      image:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=500&q=80", // young professional with laptop
    },
    {
      id: 3,
      name: "Chhavi Bisht",
      position: "AI & ML Enthusiast",
      message:
        "The AI course made complex topics like neural networks and deep learning super simple. Loved every bit of it!",
      image:
        "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=500&q=80", // young woman smiling indoor
    },
    {
      id: 4,
      name: "Sonia Singh",
      position: "App Development Student",
      message:
        "This platform motivated me to keep learning. The practical lessons helped me publish my first Android app on Play Store!",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80", // confident woman portrait
    },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Students Say</h2>
      <div className="testimonials-cards">
        {testimonialsData.map((e) => (
          <div className="testimonial-card" key={e.id}>
            <div className="student-image">
              <img src={e.image} alt={e.name} />
            </div>
            <p className="message">“{e.message}”</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
