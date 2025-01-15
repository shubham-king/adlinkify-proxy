const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Enable JSON parsing
app.use(express.json());

// Proxy endpoint to shorten the URL
app.get('/api/shorten', async (req, res) => {
  const { url } = req.query;
  
  // Ensure the URL parameter is provided
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Make the request to the LinkShortify API to shorten the URL
    const response = await axios.get(`https://linkshortify.com/st?api=62719b77623132400c87e567f8b588dadc9b5205&url=${encodeURIComponent(url)}`);

    // Return the shortened URL in the response
    res.json({ shortenedUrl: response.data });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
