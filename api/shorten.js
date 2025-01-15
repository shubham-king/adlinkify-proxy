const axios = require('axios');

module.exports = async (req, res) => {
  const apiKey = '62719b77623132400c87e567f8b588dadc9b5205'; // Your LinkShortify API Key
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  const apiUrl = `https://linkshortify.com/st?api=${apiKey}&url=${encodeURIComponent(url)}`;

  try {
    const response = await axios.get(apiUrl);
    res.status(200).send(response.data); // Send the shortened URL back
  } catch (error) {
    console.error('Error shortening URL:', error.message);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
};
