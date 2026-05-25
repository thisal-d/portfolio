import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Contact.css";

const PUBLIC_LINKS = [
  {
    name: "GitHub",
    handle: "thisal-d",
    url: "https://github.com/Thisal-D",
    icon: "/icons/social/github.png",
  },
  {
    name: "LinkedIn",
    handle: "Thisal Dilmith",
    url: "https://www.linkedin.com/in/thisal-dilmith",
    icon: "/icons/social/linkedin.png",
  },
  {
    name: "Stack Overflow",
    handle: "Thisal Dilmith",
    url: "https://stackoverflow.com/users/thisal-dilmith",
    icon: "/icons/social/stack-overflow.png",
  },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    /* Mailto fallback — swap for a real API (EmailJS, Formspree, etc.) when ready */
    const mailto = `mailto:contact@thisaldilmith.dev?subject=Portfolio Contact — ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + "\n\nFrom: " + form.email)}`;
    window.open(mailto, "_blank");
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="contact-page">
      <div className="contact-inner">
        {/* Header */}
        <div className="contact-header">
          <p className="section-label">Get in touch</p>
          <h1 className="section-title">Contact</h1>
          <p className="section-description">
            Whether it's a project idea, a question about my code, or just saying hello —
            I'm always open to a good conversation.
          </p>
        </div>

        <div className="contact-layout">
          {/* ── Left: social links ── */}
          <div>
            <p className="contact-links-title">Find Me Online</p>
            <div className="contact-links">
              {PUBLIC_LINKS.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <img src={link.icon} alt={link.name} className="contact-link-icon" />
                  <div className="contact-link-info">
                    <div className="contact-link-name">{link.name}</div>
                    <div className="contact-link-handle">{link.handle}</div>
                  </div>
                  <span className="contact-link-arrow">↗</span>
                </a>
              ))}
            </div>

            {/* Private links hint */}
            <div className="contact-private-hint">
              🔒 Some links are private.{" "}
              <Link to="/classified">Think you can unlock them?</Link>
            </div>
          </div>

          {/* ── Right: contact form ── */}
          <div>
            <p className="contact-form-title">Send a Message</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  className="contact-form-input"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  className="contact-form-input"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  className="contact-form-textarea"
                  name="message"
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="contact-form-submit">
                Send Message →
              </button>
              {sent && (
                <div className="contact-success">
                  ✓ Your mail client opened — thanks for reaching out!
                </div>
              )}
              <p className="contact-form-note">
                This opens your mail client. You can also email me directly.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
