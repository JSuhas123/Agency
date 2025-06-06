// Example Express handler for newsletter subscription
const express = require('express');
const router = express.Router();

router.post('/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }
  // TODO: Integrate with your newsletter provider here (e.g., Mailchimp, ConvertKit, etc.)
  // For demo, just return success:
  return res.json({ success: true });
});

module.exports = router;
