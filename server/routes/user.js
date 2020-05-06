const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const Image = require('../models/Image')

/* router.put('/modify', async (req, res) => {
  const user = await User.findOne({ _id: req.body.id });
  console.log(req.body.name);
  console.log(req.body.password);
  console.log(req.body.phone);
  console.log(req.body.address);
  console.log(req.body.id);
  console.log(user)
  res.send(user);
}); */
router.get('/uploadimage/:asd', async (req, res) => {
  console.log(req.query.asd);
  const image = new Image({
    image: req.query.asd,
    user: '5e63f028c614b03a44f23829'
  });

  try {
    const createdImage = await image.save();
    res.send(createdImage);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.put('/modify', async (req, res) => {
  console.log(req.body.password);
  console.log(req.body.confirmPassword);
  

  await User.findByIdAndUpdate({
      _id: req.body.id
    }, {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );

  if (req.body.password != "" && req.body.confirmPassword != "" && req.body.password === req.body.confirmPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassWord = await bcrypt.hash(req.body.password, salt);
    await User.findByIdAndUpdate({
        _id: req.body.id
      }, {
        password: hashedPassWord
      },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          console.log(result);
          //res.send(result);
        }
      }
    );
  }

  
  
});
module.exports = router;
