const express = require('express');
const cors = require('cors');
const axios = require('axios');  // We will use axios to make HTTP requests
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const API_KEY = '62719b77623132400c87e567f8b588dadc9b5205'; // Your LinkShortify API key

app.get('/api/shorten', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Call the LinkShortify API to shorten the URL
    const response = await axios.get(`https://linkshortify.com/st?api=${API_KEY}&url=${encodeURIComponent(url)}`);
    res.json({ shortenedUrl: response.data });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
