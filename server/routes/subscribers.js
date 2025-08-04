const express = require('express');
const router = express.Router();
const {
  subscribe,
  getSubscribers,
  getSubscriber,
  updateSubscriber,
  deleteSubscriber,
  unsubscribe
} = require('../controllers/subscriberController');
const { validateSubscriber } = require('../middleware/validation');
const { subscribeLimiter } = require('../middleware/rateLimiter');

// Public routes
router.post('/', subscribeLimiter, validateSubscriber, subscribe);
router.get('/unsubscribe/:email', unsubscribe);

// Admin routes (add authentication middleware here when ready)
router.get('/', getSubscribers);
router.get('/:id', getSubscriber);
router.put('/:id', updateSubscriber);
router.delete('/:id', deleteSubscriber);

module.exports = router;