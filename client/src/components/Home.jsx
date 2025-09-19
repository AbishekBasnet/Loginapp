import React from 'react';


const Environment = () => {
  return (
    <div className="home-container">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">EcoWorld</h2>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Home Section */}
   
  
      <section id="home" className="section home-section">
        <h1>🌱 Welcome to EcoWorld</h1>
        <p>
          Protecting our environment is not just a choice — it's our responsibility.
          Learn, act, and make a difference for a greener planet.
        </p>
      </section>

    

      {/* About Section */}
      <section id="about" className="section about-section">
        <h2>About Environment</h2>
        <p>
          The environment includes everything around us: air, water, soil, plants, and animals.
          Conserving resources, reducing pollution, and planting trees can create a sustainable
          future. Every small step counts!
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <h2>Contact Us</h2>
        <p>Email: contact@ecoworld.com</p>
        <p>Phone: +1 4376085193</p>
        <p>Address: 55 Brenda Crescent, Toronto, Canada</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 EcoWorld. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Environment;
