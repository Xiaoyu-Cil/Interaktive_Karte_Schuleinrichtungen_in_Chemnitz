const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const facility = require("./routes/facility.routes");
const user = require("./routes/user.routes");
const authRoutes = require('./routes/auth.routes');
const axios = require('axios');


const app = express();
const port = 3000;
const mongoDbUrl = "mongodb://localhost:27017/project";
app.use(cors());
app.use(express.json());

mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected ...');
    const db = mongoose.connection.db;
    db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Error listing collections:', err);
      } else {
        const collectionNames = collections.map(c => c.name);
        console.log('Connected to database:', db.databaseName);
        console.log('Collections:', collectionNames.join(', '));
      }
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

  const apiKey = '5b3ce3597851110001cf6248a22c76c39d804d7c9e9dd55d9c9b16bf'; // 使用你的OpenRouteService API密钥

  app.get('/api/geocode', async (req, res) => {
    const { address } = req.query;
    const url = 'https://photon.komoot.io/api/';
    const params = new URLSearchParams({
      q: address,
      limit: 1
    });
  
    try {
      const response = await axios.get(`${url}?${params}`);
      const data = response.data;
  
      if (data.features.length > 0) {
        const location = data.features[0].geometry.coordinates;
        const lat = location[1];
        const lon = location[0];
        res.json({ lat, lon });
      } else {
        res.status(404).json({ message: 'No results found.' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error fetching geocode', error });
    }
  });
  
  app.get('/api/directions', async (req, res) => {
    const { start, end } = req.query;
  
    try {
      const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
        params: {
          api_key: apiKey,
          start,
          end
        }
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching route:', error);
      res.status(500).json({ message: 'Error fetching route', error });
    }
  });

  app.post('/api/route', async (req, res) => {
    const { start, end } = req.body;

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start}&end=${end}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching route data:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching route data', error: error.response ? error.response.data : error.message });
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/facilities", facility);
app.use("/api/v1/users", user);
app.use('/api/v1/auth', authRoutes);


app.listen(port, ()=>{
    console.log("Server is running..." + port)
}) 
