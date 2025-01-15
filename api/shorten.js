const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Add CORS middleware

const app = express();
const API_KEY = '62719b77623132400c87e567f8b588dadc9b5205';

// Enable CORS
app.use(cors({
  origin: 'https://xplayvine.blogspot.com',  // Only allow this domain to access your API
}));

app.get('/api/shorten', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Shorten the URL
    const response = await axios.get(`https://linkshortify.com/st?api=${API_KEY}&url=${encodeURIComponent(url)}`);
    res.json({ shortenedUrl: response.data });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
