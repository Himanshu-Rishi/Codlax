import React from "react";
import "../style/about_page.css";
const About = () => {
  return (
    <div className="about_section">
      <div className="content_box">
        <div className="about-img">
          <img src="/Images/profile2.jpeg" alt="" />
        </div>
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            Hi, I'am Himanshu Full Stack Web Developer and coder. High level
            experience in web design and have a very good hand on coding skills.
            Web developer and coder, with an extensive knowledge and experience,
            working in web design and problem solving. Several other projects
            I’ve been working on are listed on my portfolio website.
          </p>
          <a href="https://rishiportfolio.vercel.app/">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default About;
