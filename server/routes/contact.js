import { Router } from 'express';
import { transporter, formatContactEmail, formatQuoteEmail } from '../config/email.js';

const router = Router();

// In-memory storage for development (replace with database in production)
const inquiries = [];
const quotes = [];

// Validation helpers
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => !phone || /^[\d\s\-+()]{7,20}$/.test(phone);

// POST /api/contact - Submit contact form
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required.',
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid phone number.',
      });
    }

    // Store inquiry
    const inquiry = {
      id: `INQ-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      service: service || 'General Inquiry',
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    inquiries.unshift(inquiry);

    // Send email
    try {
      const mailOptions = formatContactEmail(req.body);
      await transporter.sendMail(mailOptions);
      console.log(`✉️  Contact email sent for inquiry ${inquiry.id}`);
    } catch (emailErr) {
      console.error('Email send failed (inquiry still saved):', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
      id: inquiry.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again or call us directly.',
    });
  }
});

// POST /api/quote - Submit quote request
router.post('/quote', async (req, res) => {
  try {
    const { name, email, phone, projectType, budget, timeline, location, description } = req.body;

    // Validation
    if (!name || !email || !phone || !projectType || !description) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields.',
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    // Store quote
    const quote = {
      id: `QTE-${Date.now()}`,
      name,
      email,
      phone,
      projectType,
      budget: budget || 'Not specified',
      timeline: timeline || 'Not specified',
      location: location || 'Not specified',
      description,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    quotes.unshift(quote);

    // Send email
    try {
      const mailOptions = formatQuoteEmail(req.body);
      await transporter.sendMail(mailOptions);
      console.log(`✉️  Quote email sent for ${quote.id}`);
    } catch (emailErr) {
      console.error('Email send failed (quote still saved):', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your quote request has been received! Our team will prepare a detailed estimate and contact you within 48 hours.',
      id: quote.id,
    });
  } catch (error) {
    console.error('Quote form error:', error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again or call us directly.',
    });
  }
});

// GET /api/inquiries - Get all contact inquiries (admin)
router.get('/inquiries', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== (process.env.ADMIN_KEY || 'rasc-admin-2024')) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  res.json({ success: true, data: inquiries });
});

// GET /api/quotes - Get all quote requests (admin)
router.get('/quotes', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== (process.env.ADMIN_KEY || 'rasc-admin-2024')) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  res.json({ success: true, data: quotes });
});

// PATCH /api/inquiries/:id/status - Update inquiry status
router.patch('/inquiries/:id/status', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== (process.env.ADMIN_KEY || 'rasc-admin-2024')) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const { id } = req.params;
  const { status } = req.body;
  const inquiry = inquiries.find((i) => i.id === id);

  if (!inquiry) {
    return res.status(404).json({ success: false, error: 'Inquiry not found' });
  }

  inquiry.status = status;
  res.json({ success: true, data: inquiry });
});

// PATCH /api/quotes/:id/status - Update quote status
router.patch('/quotes/:id/status', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== (process.env.ADMIN_KEY || 'rasc-admin-2024')) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const { id } = req.params;
  const { status } = req.body;
  const quote = quotes.find((q) => q.id === id);

  if (!quote) {
    return res.status(404).json({ success: false, error: 'Quote not found' });
  }

  quote.status = status;
  res.json({ success: true, data: quote });
});

// POST /api/admin/login - Admin authentication
router.post('/admin/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'rasc2024';

  if (password === adminPassword) {
    const adminKey = process.env.ADMIN_KEY || 'rasc-admin-2024';
    res.json({ success: true, adminKey });
  } else {
    res.status(401).json({ success: false, error: 'Invalid password' });
  }
});

export default router;
