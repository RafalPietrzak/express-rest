const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({
  "origin": "http://localhost:3000", 
  "methods": "GET,POST,PUT,DELETE", 
}));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use((req, res, next) => {
  res.io = io;
  next();
});
app.use('/api', concertsRoutes); 
app.use('/api', seatsRoutes); 
app.use('/api', testimonialsRoutes);
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.use((req, res) => {
  res.status(404).send('404 not found...');
})
mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
}); 
const io = socket(server);
