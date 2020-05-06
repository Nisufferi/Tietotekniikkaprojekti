const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Registration route
router.post('/register', async (req, res) => {
  // tarkistetaan, onko käyttäjä jo olemassa (verrataan siis käyttäjän syöttämää nimeä kannassa oleviin)
  const userExists = await User.findOne({ name: req.body.name });
  if (userExists) return res.status(400).send('User already exists');

  // Hashataan käyttäjän antama salasana bcryptillä
  const salt = await bcrypt.genSalt(10);
  const hashedPassWord = await bcrypt.hash(req.body.password, salt);

  // Luodaan uusi käyttäjä, jossa kaikki kentät tulevat frontista ja salasana on tuo hashattu salasana
  const user = new User({
    name: req.body.name,
    password: hashedPassWord,
    phone: req.body.phone,
    address: req.body.address
  });

  // yritetään viedä käyttäjä kantaan
  try {
    const createdUser = await user.save();
    res.send(createdUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login route
router.post('/login', async (req, res) => {
  // username tulee frontista req.body.namessa, etsitään kannasta, että löytyykö
  const user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send('Incorrect username or password');

  // bcrypt vertaa kannassa olevaa hashia käyttäjän syöttämään (req.body.password) salasanaan, että täsmääkö
  const validPassWord = await bcrypt.compare(req.body.password, user.password);
  if (!validPassWord)
    return res.status(400).send('Incorrect username or password');

  /* mikäli kannasta löytyi käyttäjä ja salasanakin oli oikea, status 200 ja 
     Bearer-tokeniin asetetaan thinger-token, jolla saa kutsua sensorien tietoja */
  if (user && validPassWord) {
    res.status(200).send({ user: user, Bearer: process.env.THINGER_TOKEN });
  }
});

// TODO: pitäisi poistaa Bearer-niminen cookie, mutta ei poista
router.get('/logout', async (req, res) => {
  res
    .clearCookie('Bearer', { domain: localhost, path: '/' })
    .send('Poistettu ehkä');
});

module.exports = router;
