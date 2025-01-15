const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow cross-origin requests
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const apiKey = '62719b77623132400c87e567f8b588dadc9b5205';
  const { url } = req.query; // Extract the `url` query parameter

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  const apiUrl = `https://linkshortify.com/st?api=${apiKey}&url=${encodeURIComponent(url)}`;

  try {
    const response = await axios.get(apiUrl);
    res.status(200).json(response.data); // Send the shortened URL as JSON
  } catch (error) {
    console.error('Error shortening URL:', error.message);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
};
