const requiredEnvVars = ['WHATSAPP_VERIFY_TOKEN', 'NGROK_AUTH_TOKEN'];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is not set!`);
  }
});

module.exports = {
  PORT: process.env.PORT || 8000,
  WHATSAPP_VERIFY_TOKEN: process.env.WHATSAPP_VERIFY_TOKEN,
  NGROK_AUTH_TOKEN: process.env.NGROK_AUTH_TOKEN,
  CORS_ORIGINS: ['http://localhost:5174', 'https://localhost:5174/webhook/data'],
  MAIN_BACKEND_URL: 'http://localhost:5174/webhook/data',
};