require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');   
const ngrok = require('@ngrok/ngrok');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:3000/webhookdata']
}));
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
    
    // Parse the query params
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
  
    // Validate the request
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook validation successful!');
      res.status(200).send(challenge);
    } else {
      console.error('Webhook validation failed!');
      res.status(403).send('Forbidden');
    }
  });

  app.post('/webhook', async (req, res) => {
    try {
        const correctdata = JSON.stringify(req.body, null, 2);
        
        const response = await axios.post('http://localhost:3000/webhookdata', {
            correctdata
        });

        console.log('Response:', response.data);
        res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error');
    }
});


app.listen(PORT, async () => {
    try {
        await ngrok.authtoken(process.env.NGROK_AUTH_TOKEN);  // Ensure authtoken is set
        const url = await ngrok.connect(PORT);  // ngrok.connect is async, so use await
        console.log(`Ngrok tunnel established at: ${url}`);
    } catch (error) {
        console.error('Error establishing Ngrok tunnel:', error.message);
    }
});
