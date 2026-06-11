import nodemailer from 'nodemailer';

// Create transporter - configure with actual SMTP credentials in .env
const createTransporter = () => {
  // Use environment variables for SMTP configuration
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback: Ethereal test account for development
  console.log('⚠️  No SMTP config found. Using Ethereal test account.');
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal-test@ethereal.email',
      pass: 'test-password',
    },
  });
};

// Format contact email
export const formatContactEmail = (data) => {
  return {
    from: `"RASC Trading Website" <${process.env.SMTP_FROM || 'noreply@rasctrading.co.za'}>`,
    to: process.env.CONTACT_EMAIL || 'info@rasctrading.co.za',
    subject: `New Contact Inquiry from ${data.name}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 40px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #1A1A1A; margin: 0; font-size: 24px;">New Contact Inquiry</h1>
          <p style="color: #8B2020; margin: 5px 0 0;">RASC Trading Website</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #666; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #1A1A1A; font-weight: 500;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #666;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #1A1A1A;"><a href="mailto:${data.email}" style="color: #8B2020;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #666;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #1A1A1A;">${data.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #666;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #1A1A1A;">${data.service || 'General Inquiry'}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px;">
          <h3 style="color: #1A1A1A; margin: 0 0 15px; font-size: 16px;">Message</h3>
          <p style="color: #2D2D2D; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
          This email was sent from the RASC Trading website contact form.
        </p>
      </div>
    `,
  };
};

// Format quote request email
export const formatQuoteEmail = (data) => {
  return {
    from: `"RASC Trading Website" <${process.env.SMTP_FROM || 'noreply@rasctrading.co.za'}>`,
    to: process.env.CONTACT_EMAIL || 'info@rasctrading.co.za',
    subject: `New Quote Request from ${data.name} - ${data.projectType}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 40px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #1A1A1A; margin: 0; font-size: 24px;">New Quote Request</h1>
          <p style="color: #8B2020; margin: 5px 0 0;">RASC Trading Website</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #666; width: 140px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #1A1A1A; font-weight: 500;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #666;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #1A1A1A;"><a href="mailto:${data.email}" style="color: #8B2020;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #666;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #1A1A1A;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #666;">Project Type</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #1A1A1A; font-weight: 500;">${data.projectType}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #666;">Budget Range</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #1A1A1A;">${data.budget || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #666;">Timeline</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #1A1A1A;">${data.timeline || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #666;">Location</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #F0EBE1; color: #1A1A1A;">${data.location || 'Not specified'}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px;">
          <h3 style="color: #1A1A1A; margin: 0 0 15px; font-size: 16px;">Project Description</h3>
          <p style="color: #2D2D2D; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.description}</p>
        </div>
        
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
          This email was sent from the RASC Trading website quote request form.
        </p>
      </div>
    `,
  };
};

export const transporter = createTransporter();
export default { transporter, formatContactEmail, formatQuoteEmail };
