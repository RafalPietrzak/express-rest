const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seat.controller');

router.route('/seats').all((req, res, next) => {
  req.parse = {};
  req.body.seat = parseInt(req.body.seat);
  req.body.day = parseInt(req.body.day); 
  return next();
});
router.route('/seats').get(SeatController.getAll);
router.route('/seats/random').get(SeatController.getRandom);
router.route('/seats/:id').get(SeatController.getById);
router.route('/seats/:id').post(SeatController.insert);
router.route('/seats/:id').put(SeatController.update);
router.route('/seats').post(SeatController.book);
router.route('/seats/:id').delete(SeatController.remove);

module.exports = router;