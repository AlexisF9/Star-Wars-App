import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;
const SWAPI_BASE_URL = 'https://swapi.info/api';

app.get('/people/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${SWAPI_BASE_URL}/people/${id}`);
    res.json(response.data);
  } catch (error: any) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'Person not found' });
    } else {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});