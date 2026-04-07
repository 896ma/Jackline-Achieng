import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Contactpage.css";

const Contact = () => {
  const handleGlowMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <span className="pill">I'd Love to Hear From You</span>
        <h1 className="headline">
          Get In Touch
        </h1>
        <p className="subtitle">
          Have a question or want to work together? Drop me  a message and I'll get
          back to you as soon as possible.
        </p>
      </section>

      <section className="contact-content">
        <div className="contact-grid">
          <div className="card form-card">
            <h2 className="section-title">
              <span className="icon" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 5h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6l-3 3v-3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z"/>
                  <path d="M8 5h4"/> 
                  <path d="M18 17h-1"/>
                </svg>
              </span>
              Send me a message
            </h2>
            <p className="muted">
              Fill out the form below and I'll get back to you within 24 hours.
            </p>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <label className="label">Full Name
                <input className="input" type="text" placeholder="John Doe" />
              </label>
              <label className="label">Email Address
                <input className="input" type="email" placeholder="john@example.com" />
              </label>
              <label className="label">Phone Number
                <input className="input" type="tel" placeholder="+254 (757) 075-279" />
              </label>
              <label className="label">Message
                <textarea className="textarea" rows="5" placeholder="Let me know how I can be of help..."></textarea>
              </label>
              <button className="btn btn-primary" type="submit">
                Send  <span className="send" aria-hidden></span>
              </button>
            </form>
          </div>

          <div className="right-column">
            <div className="card action-card email-card" onMouseMove={handleGlowMove}>
              <div className="action-icon" aria-hidden>🖂</div>
              <div>
                <div className="action-title">Email me at </div>
                <div className="action-sub">jackline@jacklineachieng.com</div>
                <div className="action-meta">I'll get back to you within 24 hours</div>
              </div>
            </div>

            <div className="card action-card call-card" onMouseMove={handleGlowMove}>
              <div className="action-icon" aria-hidden>📞</div>
              <div>
                <div className="action-title">Call me</div>
                <div className="action-sub">+254 (711) 161-768</div>
                <div className="action-meta">Mon–Sun, 7am–8pm EAT</div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;


