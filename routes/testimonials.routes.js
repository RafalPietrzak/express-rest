const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.send(db.testimonials);
});
router.route('/testimonials/random').get((req, res) => {
  res.send(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});
router.route('/testimonials/:id').get((req, res) => {
  res.send(db.testimonials.find(item => {
    return item.id === parseInt(req.params.id);
  }));
});
router.route('/testimonials/:id').post((req, res) => {
  db.testimonials.push({ 
    id: req.params.id, 
    author: req.body.author, 
    text: req.body.text },
);
  res.send({ message: 'OK' });
});
router.route('/testimonials/:id').put((req, res) => {
  let status = 'FAILED'
  db.testimonials.map(item => {
    if(item.id === req.params.id){
      item.author = req.body.author;
      item.text = req.body.text;
      status = 'OK';
    }
  });
  res.send({ message: status });
});
router.route('/testimonials').post((req, res) => {
  db.testimonials.push({ 
    id: uuidv4(), 
    author: req.body.author, 
    text: req.body.text },
);
  res.send({ message: 'OK' });
});
router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials = db.testimonials.filter((item) => {
    return item.id != req.params.id
  });
    res.send({ message: 'OK' + req.params.id });
});

module.exports = router;