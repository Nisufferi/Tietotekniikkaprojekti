const router = require('express').Router();
const authorize = require('./verifyToken');
const axios = require('axios');
const Sensor = require('../models/Sensor');

router.get('/', authorize, (req, res) => {
  const token = req.cookies['Bearer'];

  const config = {
    headers: { authorization: `Bearer ${token}` },
  };

  axios
    .get(
      'https://api.thinger.io/v1/users/jirituk/devices/esp8266/dht11',
      config
    )
    .then(function (response) {
      // handle success
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      console.log('meni läpi');
    });
});

router.post('/new', async (req, res) => {
  const sensor = new Sensor({
    name: 'sensori123',
    location: {
      name: 'jokuhuone',
      xcoord: req.body.coordinateX,
      ycoord: req.body.coordinateY,
    },
    user: req.body.userid,
  });

  try {
    const createdSensor = await sensor.save();
    res.send(createdSensor);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/get/:id', async (req, res) => {
  console.log(req.params.id);
  const sensor = await Sensor.find({
    user: req.params.id,
  });

  res.send(sensor);
});

router.post('/add', async (req, res) => {
  console.log(req.body.device_id);
  console.log(req.body.device_description);
  console.log(req.body.device_credentials);
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJpb3Rwcm9qZWt0aSIsInVzciI6InNhbnRlcGlnZyJ9.9XTOoH-BQLmsQJsiOUWllx9H8kNv2RnG8XrriE6yrzA';

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };

  const body = {
    device_id: req.body.device_id,
    device_description: req.body.device_description,
    device_credentials: req.body.device_credentials,
  };
  axios
    .post('https://api.thinger.io/v1/users/santepigg/devices', body, config)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
});
module.exports = router;
