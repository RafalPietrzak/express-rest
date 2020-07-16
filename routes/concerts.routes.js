const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concert.controller')

router.route('/concerts').get(ConcertController.getAll);
router.route('/concerts/random').get(ConcertController.getRandom);
router.route('/concerts/:id').post(ConcertController.insert);
router.route('/concerts/:id').put(ConcertController.update);
router.route('/concerts').post(ConcertController.insert);
router.route('/concerts/:id').delete(ConcertController.remove);
    
module.exports = router;