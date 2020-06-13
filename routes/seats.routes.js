const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.send(db.seats);
});
router.route('/seats/random').get((req, res) => {
  res.send(db.seats[Math.floor(Math.random() * db.seats.length)]);
});
router.route('/seats/:id').get((req, res) => {
  res.send(db.seats.find(item => {
    return item.id === parseInt(req.params.id);
  }));
});
router.route('/seats/:id').post((req, res) => {
  db.seats.push({ 
    id: req.params.id, 
    day: req.body.day, 
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email
  },
);
  res.send({ message: 'OK' });
});
router.route('/seats/:id').put((req, res) => {
  let status = 'FAILED'
  db.seats.map(item => {
    if(item.id === req.params.id){
      item = {
        id: req.params.id, 
        day: req.body.day, 
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email
      }
      status = 'OK';
    }
  });
  res.send({ message: status });
});
router.route('/seats').post((req, res) => {
  db.seats.push({ 
    id: uuidv4(), 
    day: req.body.day, 
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email
  },
);
  res.send({ message: 'OK' });
});
router.route('/seats/:id').delete((req, res) => {
  db.seats = db.seats.filter((item) => {
    return item.id != req.params.id
  });
    res.send({ message: 'OK' + req.params.id });
});

module.exports = router;