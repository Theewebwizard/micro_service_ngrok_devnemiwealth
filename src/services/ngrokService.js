const ngrok = require('@ngrok/ngrok');
const { NGROK_AUTH_TOKEN, PORT } = require('../config/env');

exports.setupNgrok = async () => {
  try {
    await ngrok.authtoken(NGROK_AUTH_TOKEN);
    const url = await ngrok.connect(PORT);
    return url;
  } catch (error) {
    throw new Error(`Failed to establish Ngrok tunnel: ${error.message}`);
  }
};