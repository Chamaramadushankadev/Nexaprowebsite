const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Email transporter setup
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @desc    Submit contact form
// @route   POST /api/contacts
// @access  Public
const submitContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, company, subject, message, priority } = req.body;

    // Create contact record
    const contact = await Contact.create({
      name,
      email,
      company,
      subject,
      message,
      priority: priority || 'medium',
      metadata: {
        userAgent: req.get('User-Agent'),
        ipAddress: req.ip,
        referrer: req.get('Referrer')
      }
    });

    // Send email notification to admin
    try {
      const transporter = createTransporter();
      
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007AFF; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007AFF; margin-top: 0;">Contact Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
              <p><strong>Priority:</strong> ${priority || 'medium'}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0;">Subject</h3>
              <p style="font-size: 16px; font-weight: 500;">${subject}</p>
              
              <h3 style="color: #333;">Message</h3>
              <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
              <p style="margin: 0; color: #1976d2;">
                <strong>Contact ID:</strong> ${contact._id}
              </p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(adminMailOptions);

      // Send confirmation email to user
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Nexa Pro',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #007AFF; border-bottom: 2px solid #007AFF; padding-bottom: 10px;">
              Thank you for contacting us!
            </h2>
            
            <p>Hi ${name},</p>
            
            <p>Thank you for reaching out to Nexa Pro. We've received your message and will get back to you within 24 hours.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Message Summary</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Priority:</strong> ${priority || 'medium'}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>In the meantime, feel free to explore our <a href="${process.env.FRONTEND_URL}" style="color: #007AFF;">productivity features</a> or check out our <a href="${process.env.FRONTEND_URL}#faq" style="color: #007AFF;">FAQ section</a>.</p>
            
            <p>Best regards,<br>The Nexa Pro Team</p>
            
            <div style="margin-top: 30px; padding: 15px; background: #e8f5e8; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #2e7d32;">
                <strong>Need immediate help?</strong><br>
                Email us directly at <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #2e7d32;">${process.env.ADMIN_EMAIL}</a>
              </p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(userMailOptions);

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. We\'ll get back to you soon!',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        status: contact.status,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private (Admin)
const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const priority = req.query.priority;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const contacts = await Contact.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// @desc    Get contact by ID
// @route   GET /api/contacts/:id
// @access  Private (Admin)
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private (Admin)
const updateContact = async (req, res) => {
  try {
    const { status, priority, assignedTo, adminNote } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Update fields
    if (status) contact.status = status;
    if (priority) contact.priority = priority;
    if (assignedTo) contact.assignedTo = assignedTo;

    // Add admin note if provided
    if (adminNote) {
      contact.adminNotes.push({
        note: adminNote,
        addedBy: req.user?.name || 'Admin', // Assuming you'll add auth later
        addedAt: new Date()
      });
    }

    // Set resolved date if status is resolved or closed
    if (status === 'resolved' || status === 'closed') {
      contact.resolvedAt = new Date();
    }

    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private (Admin)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
};