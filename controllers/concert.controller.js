const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err){
    res.status(500).json({message: err});
  }
};
exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const con = await Concert.findOne().skip(rand);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.getById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.insert = async (req, res) => {
  try {
    const { id, performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({
      id: id, performer: performer, 
      genre: genre, price: price, day: day, image: image
    });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.update = async (req, res) => {
  const { id, performer, genre, price, day, image } = req.body;
  try {
    await Concert.updateOne({ id: id }, { $set: {
      id: id, performer: performer, 
      genre: genre, price: price, day: day, image: image
    }});
    const con = await Concert.findById(req.params.id);
    res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.remove= async (req, res) => {
  try {
    const con = await(Concert.find({id: req.params.id}));
    if(con) {
      await Concert.deleteOne({id: req.params.id });
      res.json(con);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
