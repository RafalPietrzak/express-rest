const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const sea = await Seat.find();
    res.json(sea);
    res.io.on('connection', (socket) => {
    req.socket.emit('seatsUpdated', sea);
  });
  } catch (err){
    res.status(500).json({message: err});
  }
};
exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const sea = await Seat.findOne().skip(rand);
    if(!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.getById = async (req, res) => {
  try {
    const sea = await Seat.findById(req.params.id);
    if(!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.insert = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({
      day: day, seat: seat, client: client, email: email
    });
    await newSeat.save();
    const sea = await Seat.find();
    res.io.emit('seatsUpdated', sea);
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.update = async (req, res) => {
  const { id, day, seat, client, email } = req.body;
  try {
    await Seat.updateOne({ id: id }, { $set: {
      id: id, day: day, 
      seat: seat, client: client, email: email
    }});
    const sea = await Seat.findById(req.params.id);
    res.io.emit('seatsUpdated', sea);
    res.send({ message: status });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.remove= async (req, res) => {
  try {
    const sea = await(Seat.find({id: req.params.id}));
    if(sea) {
      await Seat.deleteOne({id: req.params.id });
      res.json({ message: 'OK' + req.params.id });
      res.io.emit('seatsUpdated', sea);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.book = async (req, res) => {
  try {
    const isTaken = await Seat.find({$and:[
      {day: req.body.day},
      {seat: req.body.seat}
    ]});
    if(isTaken.length > 0){
      res.send({ message: "The slot is already taken..."});
    } else {    
      exports.insert(req, res);
  };
  } catch(err) {
    console.log(err);     
    res.status(500).json({ message: err });
  }
};