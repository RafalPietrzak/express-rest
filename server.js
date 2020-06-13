const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({
  "origin": "http://localhost:3000", 
  "methods": "GET,POST,PUT,DELETE", 
}));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api', concertsRoutes); 
app.use('/api', seatsRoutes); 
app.use('/api', testimonialsRoutes);
app.use(express.static(path.join(__dirname, '/public')));
app.use((req, res) => {
  res.status(404).send('404 not found...');
})
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});