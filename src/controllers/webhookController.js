const axios = require('axios');
const logger = require('../utils/logger');
const { WHATSAPP_VERIFY_TOKEN, MAIN_BACKEND_URL } = require('../config/env');

exports.verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
    logger.info('Webhook validation successful!');
    res.status(200).send(challenge);
  } else {
    logger.error('Webhook validation failed!');
    res.status(403).send('Forbidden');
  }
};

exports.handleWebhook = async (req, res) => {
  try {
    const correctdata = JSON.stringify(req.body, null, 2);
    
    const response = await axios.post(MAIN_BACKEND_URL, { correctdata });

    logger.info('Response from main backend:', response.data);
    res.status(200).send('EVENT_RECEIVED');
  } catch (error) {
    logger.error('Error forwarding webhook data:', error.message);
    res.status(500).send('Error');
  }
};