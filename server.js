require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT, CORS_ORIGINS } = require('./src/config/env');
const webhookRoutes = require('./src/routes/webhookRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const { setupNgrok } = require('./src/services/ngrokService');
const logger = require('./src/utils/logger');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: CORS_ORIGINS
}));

app.use('/webhook', webhookRoutes);
app.use(errorHandler);

app.listen(PORT, async () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  try {
    const url = await setupNgrok();
    logger.info(`Ngrok tunnel established at: ${url}`);
  } catch (error) {
    logger.error('Error establishing Ngrok tunnel:', error.message);
  }
});