const Subscriber = require('../models/Subscriber');
const { validationResult } = require('express-validator');

// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
const subscribe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email } = req.body;
    
    // Check if subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    
    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return res.status(400).json({
          success: false,
          message: 'Email is already subscribed'
        });
      } else {
        // Reactivate unsubscribed user
        existingSubscriber.status = 'active';
        existingSubscriber.subscribedAt = new Date();
        existingSubscriber.unsubscribedAt = undefined;
        await existingSubscriber.save();
        
        return res.status(200).json({
          success: true,
          message: 'Successfully resubscribed to newsletter',
          data: existingSubscriber
        });
      }
    }

    // Create new subscriber
    const subscriber = await Subscriber.create({
      email,
      metadata: {
        userAgent: req.get('User-Agent'),
        ipAddress: req.ip,
        referrer: req.get('Referrer')
      }
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscriber
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// @desc    Get all subscribers
// @route   GET /api/subscribers
// @access  Private (Admin)
const getSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const sortBy = req.query.sortBy || 'subscribedAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const query = {};
    if (status) query.status = status;

    const subscribers = await Subscriber.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Subscriber.countDocuments(query);

    res.status(200).json({
      success: true,
      data: subscribers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// @desc    Get subscriber by ID
// @route   GET /api/subscribers/:id
// @access  Private (Admin)
const getSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    res.status(200).json({
      success: true,
      data: subscriber
    });

  } catch (error) {
    console.error('Get subscriber error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// @desc    Update subscriber
// @route   PUT /api/subscribers/:id
// @access  Private (Admin)
const updateSubscriber = async (req, res) => {
  try {
    const { status } = req.body;

    const subscriber = await Subscriber.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    if (status === 'unsubscribed' && subscriber.status === 'active') {
      subscriber.unsubscribedAt = new Date();
    } else if (status === 'active' && subscriber.status === 'unsubscribed') {
      subscriber.unsubscribedAt = undefined;
    }

    subscriber.status = status || subscriber.status;
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Subscriber updated successfully',
      data: subscriber
    });

  } catch (error) {
    console.error('Update subscriber error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// @desc    Delete subscriber
// @route   DELETE /api/subscribers/:id
// @access  Private (Admin)
const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    await subscriber.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Subscriber deleted successfully'
    });

  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// @desc    Unsubscribe via email link
// @route   GET /api/subscribers/unsubscribe/:email
// @access  Public
const unsubscribe = async (req, res) => {
  try {
    const { email } = req.params;

    const subscriber = await Subscriber.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    subscriber.status = 'unsubscribed';
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

module.exports = {
  subscribe,
  getSubscribers,
  getSubscriber,
  updateSubscriber,
  deleteSubscriber,
  unsubscribe
};