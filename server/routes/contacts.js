const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');
const { formLimiter } = require('../middleware/rateLimiter');

// Public routes
router.post('/', formLimiter, validateContact, submitContact);

// Admin routes (add authentication middleware here when ready)
router.get('/', getContacts);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;