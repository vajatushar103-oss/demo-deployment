import { useState } from 'react';
import Reveal from '../common/Reveal';
import { enquiryService } from '../../services/api';

export default function ContactSection() {
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      setSubmitting(true);
      setStatus({ type: '', text: '' });
      await enquiryService.create(payload);
      form.reset();
      setStatus({ type: 'success', text: 'Thanks — your enquiry has been submitted successfully.' });
    } catch (error) {
      setStatus({ type: 'error', text: error.message || 'Could not submit your enquiry.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <div className="eyebrow">Contact</div>
          <h2 className="section-title">Let's build a better <span className="text-PRIME-600">production line.</span></h2>
          <p className="mt-5 leading-8 text-slate-600">Reach prime Enterprises / PRIME Machines for machine enquiries, application discussions and quotations.</p>
          <div className="mt-8 space-y-5">
            <div className="contact-row"><div className="contact-icon">01</div><div><b>Manufacturing unit</b><p>Chitra GIDC, Bhavnagar, Gujarat 364004, India</p></div></div>
            <div className="contact-row"><div className="contact-icon">02</div><div><b>Phone</b><p>+91 9876543210 • +91 9012345678</p></div></div>
            <div className="contact-row"><div className="contact-icon">03</div><div><b>Email</b><p>info@primeent.com • prime@primeent.com</p></div></div>
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-soft sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="field"><span>Name</span><input required name="name" placeholder="Your name" /></label>
              <label className="field"><span>Company</span><input name="company" placeholder="Company name" /></label>
              <label className="field"><span>Phone</span><input required name="phone" placeholder="+91 ..." /></label>
              <label className="field"><span>Email</span><input required type="email" name="email" placeholder="you@company.com" /></label>
              <label className="field sm:col-span-2"><span>Machine requirement</span><select name="machine"><option>Pipe / Bar Cutting</option><option>Chamfering</option><option>Notching</option><option>Aluminium Profile Cutting</option><option>Laser Tube Cutting</option><option>Wire De-burring</option><option>Other / Need consultation</option></select></label>
              <label className="field sm:col-span-2"><span>Message</span><textarea required name="message" rows="5" placeholder="Tell us about material, tube size, quantity and automation requirement..." /></label>
            </div>
            <button disabled={submitting} className="mt-6 w-full rounded-xl border-2 border-PRIME-500 bg-PRIME-600 px-6 py-3.5 font-bold text-white hover:-translate-y-1 hover:bg-PRIME-700 disabled:cursor-not-allowed disabled:opacity-60" type="submit">
              {submitting ? 'Sending...' : 'Send enquiry'}
            </button>
            {status.text && <p className={`mt-3 text-center text-sm font-semibold ${status.type === 'error' ? 'text-red-600' : 'text-PRIME-700'}`}>{status.text}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
