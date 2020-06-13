const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.send(db.concerts);
});
router.route('/concerts/random').get((req, res) => {
  res.send(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});
router.route('/concerts/:id').get((req, res) => {
  res.send(db.concerts.find(item => {
    return item.id === parseInt(req.params.id);
  }));
});
router.route('/concerts/:id').post((req, res) => {
  db.concerts.push({ 
    id: req.params.id, 
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image 
  },
);
  res.send({ message: 'OK' });
});
router.route('/concerts/:id').put((req, res) => {
  let status = 'FAILED'
  db.concerts.map(item => {
    if(item.id === req.params.id){
      item = {
        id: req.params.id,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image 
      };
      status = 'OK';
    }
  });
  res.send({ message: status });
});
router.route('/concerts').post((req, res) => {
  db.concerts.push({ 
    id: uuidv4(), 
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image 
  }
);
  res.send({ message: 'OK' });
});
router.route('/concerts/:id').delete((req, res) => {
  db.concerts = db.concerts.filter((item) => {
    return item.id != req.params.id
  });
    res.send({ message: 'OK' + req.params.id });
});

module.exports = router;