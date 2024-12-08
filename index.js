import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'

const app = express();
const port = 3000;

app.use(cors())

app.get('/download-tiktok', async (req, res) => {
  const tiktokUrl = req.query.url;

  if (!tiktokUrl) {
    return res.status(400).send('TikTok URL is required');
  }

  const apiUrl = `https://tiktok-video-no-watermark2.p.rapidapi.com?url=${encodeURIComponent(tiktokUrl)}`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '8cbccff5b3msh42eef1a39392ce6p13127bjsna74720952602',  // Replace with your RapidAPI key
      'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com',
    }
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();

    // Log the full response for troubleshooting
    console.log('Full API Response:', JSON.stringify(result, null, 2));

    // Check if the no-watermark video URL is available
    if (result.data && result.data.play) {
      const videoUrl = result.data.play; // Use the 'play' key for the video URL
      return res.json({ videoUrl });
    } else {
      return res.status(404).send('No no-watermark video found or invalid API response.');
    }
  } catch (error) {
    console.error('Error fetching TikTok video:', error);
    return res.status(500).send('Error fetching video.');
  }
});

app.use(express.static('public')); // Assuming index.html is in a folder named 'public'

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});