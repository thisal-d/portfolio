import { useState } from "react";
import { Link } from "react-router-dom";
import { contact } from "@/lib/data";
import { img } from "@/lib/assets";
import { IconArrow, Reveal, SectionBar } from "@/components/ui";

const PUBLIC_LINKS = contact.socials.filter((l) => l.isPublic);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MSG = 1500;

const EMPTY = { name: "", email: "", subject: "", message: "" };

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = "Name is required.";
  if (!f.email.trim()) e.email = "Email is required.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!f.subject.trim()) e.subject = "Subject is required.";
  if (!f.message.trim()) e.message = "Message is required.";
  else if (f.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
  return e;
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name]) setErrors((p) => ({ ...p, [name]: validate({ ...form, [name]: value })[name] }));
    if (status === "success") setStatus("idle");
  };
  const onBlur = (e) => {
    const k = e.target.name;
    setTouched((p) => ({ ...p, [k]: true }));
    setErrors((p) => ({ ...p, [k]: validate(form)[k] }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("loading");
    try {
      // Set VITE_FORMSPREE_ID (see README) to send via Formspree; otherwise fall back to the visitor's mail client.
      const id = import.meta.env.VITE_FORMSPREE_ID;
      if (id) {
        const res = await fetch(`https://formspree.io/f/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Network response was not OK");
      } else {
        const body = `Message:\n${form.message}\n\nFrom: ${form.name} <${form.email}>`;
        window.open(`mailto:${contact.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`, "_blank");
      }
      setStatus("success"); setForm(EMPTY); setTouched({}); setErrors({});
    } catch {
      setStatus("error");
    }
  }

  const loading = status === "loading";
  const fld = (k) => ({
    id: `contact-${k}`, name: k, value: form[k], onChange, onBlur, disabled: loading,
    "aria-invalid": !!(errors[k] && touched[k]),
    "aria-describedby": errors[k] && touched[k] ? `error-${k}` : undefined,
    className: `field ${errors[k] && touched[k] ? "err" : ""}`,
  });
  const Err = ({ k }) =>
    errors[k] && touched[k] ? <span id={`error-${k}`} role="alert" className="mt-1.5 block text-xs text-red">{errors[k]}</span> : null;
  const Label = ({ k, children }) => (
    <label htmlFor={`contact-${k}`} className="mono mb-2 block text-ink2">{children} <span className="text-red" aria-hidden="true">*</span></label>
  );

  return (
    <>
      <section className="border-b border-line">
        <div className="frame">
          <SectionBar n="00" label="Get in touch" right="Replies usually within a few days" />
          <div className="sec-pad py-[clamp(3rem,8vw,6rem)]">
            <h1 className="display text-[clamp(3rem,10vw,9rem)]"><span className="mask"><span>Contact</span></span></h1>
            <p className="lede fade-up mt-6 max-w-2xl" style={{ "--d": "300ms" }}>
              Whether it's a project idea, a question about my code, or just saying hello — I'm always open to a good conversation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="frame grid lg:grid-cols-2">
          {/* links */}
          <div className="sec-pad border-b border-line lg:border-b-0 lg:border-r">
            <Reveal>
              <a href={`mailto:${contact.email}`} aria-label={`Send an email to ${contact.email}`} className="group relative flex items-center gap-4 overflow-hidden border border-ink bg-ink p-5 text-paper transition-transform hover:-translate-y-0.5">
                <span className="grid h-12 w-12 place-items-center border border-paper/30 text-xl" aria-hidden="true">✉️</span>
                <span className="min-w-0 flex-1">
                  <span className="mono block text-paper/60">Email directly</span>
                  <span className="block truncate font-display text-lg font-bold" style={{ fontStretch: "110%" }}>{contact.email}</span>
                </span>
                <IconArrow className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="mono mb-3 mt-10 text-ink3">Find me online</p>
              <ul className="divide-y divide-line border-y border-line">
                {PUBLIC_LINKS.map((l) => (
                  <li key={l.name}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 px-1 py-4 transition-all hover:bg-card hover:px-3">
                      <img src={img(l.icon)} alt={l.name} className={`h-7 w-7 object-contain ${l.name === "GitHub" ? "invert-dark" : ""}`} />
                      <span className="flex-1">
                        <span className="block font-semibold">{l.name}</span>
                        <span className="mono-sm text-ink3">{l.handle}</span>
                      </span>
                      <IconArrow className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border border-dashed border-line-strong p-4 text-sm text-ink2" style={{ borderColor: "var(--line-strong)" }}>
                🔒 Some links are private. <Link to="/classified" className="border-b border-ink font-semibold text-ink">Think you can unlock them?</Link>
              </p>
            </Reveal>
          </div>

          {/* form */}
          <div className="sec-pad bg-card/50">
            <Reveal dir="right">
              <p className="display-md text-2xl">Send a Message</p>
              {status === "success" && (
                <div role="alert" className="mt-5 flex items-center gap-3 border border-green bg-green/10 p-4 text-sm text-green">
                  <span aria-hidden="true">✓</span> Message sent — I'll get back to you soon!
                </div>
              )}
              {status === "error" && (
                <div role="alert" className="mt-5 flex items-center gap-3 border border-red bg-red/10 p-4 text-sm text-red">
                  <span aria-hidden="true">⚠</span> Something went wrong. Please try emailing me directly.
                </div>
              )}
              <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><Label k="name">Name</Label><input type="text" placeholder="Your name" autoComplete="name" {...fld("name")} /><Err k="name" /></div>
                  <div><Label k="email">Email</Label><input type="email" placeholder="your@email.com" autoComplete="email" {...fld("email")} /><Err k="email" /></div>
                </div>
                <div><Label k="subject">Subject</Label><input type="text" placeholder="What's this about?" {...fld("subject")} /><Err k="subject" /></div>
                <div>
                  <Label k="message">Message</Label>
                  <textarea rows={7} maxLength={MAX_MSG} placeholder="Tell me about your idea…" {...fld("message")} className={`field resize-y ${errors.message && touched.message ? "err" : ""}`} />
                  <div className="mt-1.5 flex justify-between"><Err k="message" /><span className="mono-sm ml-auto text-ink3">{form.message.length}/{MAX_MSG}</span></div>
                </div>
                <button type="submit" disabled={loading} className="btn btn-solid w-full disabled:opacity-60 sm:w-auto">
                  {loading ? "Sending…" : <>Send message <IconArrow className="arr" /></>}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
