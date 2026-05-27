import { useState } from "react";
import { Link } from "react-router-dom";
import contactData from "../../data/contact.json";
import "./Contact.css";

const PUBLIC_LINKS = contactData.socials.filter(link => link.isPublic);

/* ── Validation helpers ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MSG  = 1500;

function validate(form) {
  const errs = {};
  if (!form.name.trim())                       errs.name    = "Name is required.";
  if (!form.email.trim())                      errs.email   = "Email is required.";
  else if (!EMAIL_RE.test(form.email.trim()))  errs.email   = "Enter a valid email address.";
  if (!form.subject.trim())                    errs.subject = "Subject is required.";
  if (!form.message.trim())                    errs.message = "Message is required.";
  else if (form.message.trim().length < 10)    errs.message = "Message must be at least 10 characters.";
  return errs;
}

const EMPTY = { name: "", email: "", subject: "", message: "" };

function Contact() {
  const [form,    setForm]    = useState(EMPTY);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [status,  setStatus]  = useState("idle"); // idle | loading | success | error

  /* ── Handlers ── */
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Re-validate touched field on every keystroke
    if (touched[name]) {
      const fresh = validate({ ...form, [name]: value });
      setErrors(prev => ({ ...prev, [name]: fresh[name] }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fresh = validate(form);
    setErrors(prev => ({ ...prev, [name]: fresh[name] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Mark all fields touched so errors all show at once
    setTouched({ name: true, email: true, subject: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");

    try {
      /* ── Formspree endpoint — swap YOUR_FORM_ID with your actual ID ──
         Sign up free at https://formspree.io and create a form to get an ID.
         Until then this will fail gracefully and fall back to mailto.       */
      const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method:  "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body:    JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
        });
        if (!res.ok) throw new Error("Network response was not OK");
      } else {
        /* Fallback: open mail client with all fields pre-filled */
        const body = `Message:\n${form.message}\n\nFrom: ${form.name} <${form.email}>`;
        window.open(
          `mailto:${contactData.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`,
          "_blank"
        );
      }

      setStatus("success");
      setForm(EMPTY);
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  const msgLen     = form.message.length;
  const isLoading  = status === "loading";

  return (
    <div className="contact-page">
      <div className="contact-inner">

        {/* ── Page header ── */}
        <div className="contact-header">
          <p className="section-label">Get in touch</p>
          <h1 className="section-title">Contact</h1>
          <p className="section-description">
            Whether it's a project idea, a question about my code, or just saying hello —
            I'm always open to a good conversation.
          </p>
        </div>

        <div className="contact-layout">

          {/* ══════════ LEFT — social links ══════════ */}
          <div>
            {/* Direct email card */}
            <a
              href={`mailto:${contactData.email}`}
              className="contact-email-card"
              aria-label={`Send an email to ${contactData.email}`}
            >
              <div className="contact-email-card-icon" aria-hidden="true">✉️</div>
              <div>
                <div className="contact-email-card-label">Email directly</div>
                <div className="contact-email-card-address">{contactData.email}</div>
              </div>
              <span className="contact-link-arrow">↗</span>
            </a>

            <p className="contact-links-title" style={{ marginTop: "1.5rem" }}>Find Me Online</p>
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

            <div className="contact-private-hint">
              🔒 Some links are private.{" "}
              <Link to="/classified">Think you can unlock them?</Link>
            </div>
          </div>

          {/* ══════════ RIGHT — form ══════════ */}
          <div>
            <p className="contact-form-title">Send a Message</p>

            {/* Success banner */}
            {status === "success" && (
              <div className="contact-success" role="alert">
                <span aria-hidden="true">✓</span>
                Message sent — I'll get back to you soon!
              </div>
            )}

            {/* Error banner */}
            {status === "error" && (
              <div className="contact-form-error-banner" role="alert">
                <span aria-hidden="true">⚠</span>
                Something went wrong. Please try emailing me directly.
              </div>
            )}

            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              {/* Name */}
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="contact-name">
                  Name <span className="contact-form-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  className={`contact-form-input ${errors.name && touched.name ? "input-error" : ""}`}
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby={errors.name && touched.name ? "error-name" : undefined}
                  aria-invalid={!!(errors.name && touched.name)}
                  autoComplete="name"
                  disabled={isLoading}
                />
                {errors.name && touched.name && (
                  <span className="contact-field-error" id="error-name" role="alert">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="contact-email">
                  Email <span className="contact-form-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  className={`contact-form-input ${errors.email && touched.email ? "input-error" : ""}`}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby={errors.email && touched.email ? "error-email" : undefined}
                  aria-invalid={!!(errors.email && touched.email)}
                  autoComplete="email"
                  disabled={isLoading}
                />
                {errors.email && touched.email && (
                  <span className="contact-field-error" id="error-email" role="alert">{errors.email}</span>
                )}
              </div>

              {/* Subject */}
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="contact-subject">
                  Subject <span className="contact-form-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-subject"
                  className={`contact-form-input ${errors.subject && touched.subject ? "input-error" : ""}`}
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby={errors.subject && touched.subject ? "error-subject" : undefined}
                  aria-invalid={!!(errors.subject && touched.subject)}
                  disabled={isLoading}
                />
                {errors.subject && touched.subject && (
                  <span className="contact-field-error" id="error-subject" role="alert">{errors.subject}</span>
                )}
              </div>

              {/* Message */}
              <div className="contact-form-group">
                <div className="contact-form-label-row">
                  <label className="contact-form-label" htmlFor="contact-message">
                    Message <span className="contact-form-required" aria-hidden="true">*</span>
                  </label>
                  <span
                    className={`contact-char-count ${msgLen > MAX_MSG ? "contact-char-count--over" : ""}`}
                    aria-live="polite"
                  >
                    {msgLen} / {MAX_MSG}
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  className={`contact-form-textarea ${errors.message && touched.message ? "input-error" : ""}`}
                  name="message"
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby={errors.message && touched.message ? "error-message" : undefined}
                  aria-invalid={!!(errors.message && touched.message)}
                  maxLength={MAX_MSG}
                  disabled={isLoading}
                />
                {errors.message && touched.message && (
                  <span className="contact-field-error" id="error-message" role="alert">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="contact-form-submit"
                disabled={isLoading || msgLen > MAX_MSG}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <><span className="contact-spinner" aria-hidden="true" /> Sending…</>
                ) : (
                  "Send Message →"
                )}
              </button>

              <p className="contact-form-note">
                * Required fields. I typically reply within 1–2 business days.
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
