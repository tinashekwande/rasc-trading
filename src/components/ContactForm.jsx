// ============================================
// ContactForm — Clean Modern Form (Tailwind v4)
// ============================================

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { services } from '../data/siteData';

const initialState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const formRef = useRef(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Invalid email address';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm(initialState);
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <>
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full space-y-5"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Your name"
          />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
          />
        </div>

        {/* Phone & Service Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="083 000 0000"
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Service Needed
            </label>
            <div className="relative">
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all duration-200 text-sm appearance-none cursor-pointer"
              >
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your project requirements..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all duration-200 text-sm resize-y min-h-[130px]"
          />
          {errors.message && (
            <span className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
              <FiAlertCircle /> {errors.message}
            </span>
          )}
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-medium transition-all duration-300 hover:scale-[1.01] hover:shadow-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 text-sm cursor-pointer"
          disabled={status === 'sending'}
          whileTap={{ scale: 0.99 }}
        >
          {status === 'sending' ? (
            'Sending Inquire...'
          ) : (
            <>
              Send Message <FiSend size={14} />
            </>
          )}
        </motion.button>
      </motion.form>

      {/* Success / Error Toast notification */}
      <AnimatePresence>
        {(status === 'success' || status === 'error') && (
          <motion.div
            className={`fixed bottom-8 right-8 flex items-center gap-2.5 py-4 px-6 rounded-2xl text-white text-sm font-semibold shadow-lg z-50 border ${
              status === 'success'
                ? 'bg-green-900 border-green-800'
                : 'bg-red-950 border-red-900'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            {status === 'success' ? (
              <>
                <FiCheck size={18} /> Message sent successfully!
              </>
            ) : (
              <>
                <FiAlertCircle size={18} /> Something went wrong. Please try again.
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FormField({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:bg-white transition-all duration-200 text-sm"
      />
      {error && (
        <span className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
          <FiAlertCircle /> {error}
        </span>
      )}
    </div>
  );
}
