// ============================================
// QuoteForm — Extended Quote Form (Tailwind v4)
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { services } from '../data/siteData';

const initialState = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  timeline: '',
  location: '',
  description: '',
};

const budgetRanges = [
  'Under R50,000',
  'R50,000 – R150,000',
  'R150,000 – R500,000',
  'R50,0000 – R1,000,000',
  'R1,000,000+',
];

const timelineOptions = [
  'Immediate (within 2 weeks)',
  '1 – 3 months',
  '3 – 6 months',
  'Flexible / Not sure',
];

export default function QuoteForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Invalid email address';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (!form.projectType) errs.projectType = 'Please select a project type';
    if (!form.description.trim()) errs.description = 'Please describe your project';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm(initialState);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        className="text-center p-8 md:p-12 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 text-green-700 flex items-center justify-center mb-6 shadow-sm">
          <FiCheck size={28} />
        </div>
        <h3 className="font-semibold text-2xl text-gray-900 mb-2">
          Quote Request Received
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-8">
          Thank you. Our estimating team will review your requirements and get back to you with a detailed scope analysis within 24 to 48 hours.
        </p>
        <button
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={() => setStatus('idle')}
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className="w-full space-y-5"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Full Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Your full name"
          />
          <Field
            label="Email Address *"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
          />
        </div>

        {/* Row 2: Phone & Project Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Phone Number *"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="083 000 0000"
          />
          <SelectField
            label="Project Type *"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            error={errors.projectType}
            options={services.map((s) => ({ value: s.id, label: s.title }))}
            placeholder="Select project type"
          />
        </div>

        {/* Row 3: Budget & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <SelectField
            label="Estimated Budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            options={budgetRanges.map((b) => ({ value: b, label: b }))}
            placeholder="Select budget range"
          />
          <SelectField
            label="Target Timeline"
            name="timeline"
            value={form.timeline}
            onChange={handleChange}
            options={timelineOptions.map((t) => ({ value: t, label: t }))}
            placeholder="Select timeline"
          />
        </div>

        {/* Location */}
        <Field
          label="Project Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="City, Province (e.g. Johannesburg)"
        />

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Project Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Please detail your building requirements — structure, sizing, constraints..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all duration-200 text-sm resize-y min-h-[120px]"
          />
          {errors.description && (
            <span className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
              <FiAlertCircle /> {errors.description}
            </span>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-medium transition-all duration-300 hover:scale-[1.01] hover:shadow-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 text-sm cursor-pointer"
          disabled={status === 'sending'}
          whileTap={{ scale: 0.99 }}
        >
          {status === 'sending' ? (
            'Submitting Request...'
          ) : (
            <>
              Request a Quote <FiSend size={14} />
            </>
          )}
        </motion.button>
      </motion.form>

      {/* Toast Alert */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            className="fixed bottom-8 right-8 flex items-center gap-2.5 py-4 px-6 rounded-2xl bg-red-950 border border-red-900 text-white text-sm font-semibold shadow-lg z-50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <FiAlertCircle size={18} /> Something went wrong. Please try again.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
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

function SelectField({ label, name, value, onChange, error, options, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all duration-200 text-sm appearance-none cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {error && (
        <span className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
          <FiAlertCircle /> {error}
        </span>
      )}
    </div>
  );
}
