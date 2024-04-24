const axios = require('axios');
const User = require('../models/user');

exports.detectUserLocation = async (req, res) => {
  const phoneNumber = req.body.phone; // Get the phone number from the request body

  try {
    // Make a request to the Google Maps Geolocation API
    const response = await axios.post('https://www.googleapis.com/geolocation/v1/geolocate', {
      considerIp: false,
      wifiAccessPoints: [],
      cellTowers: [
        {
          cellId: 12345, // Replace with appropriate cell tower information
          locationAreaCode: 67890,
          mobileCountryCode: 254,
          mobileNetworkCode: 769362302,
          age: 0,
          signalStrength: -60,
          timingAdvance: 15,
        },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'AIzaSyCqVGnU-dhnEsiLy2bFs89d4w349Xt6CQI' // Replace 'YOUR_API_KEY' with your actual API key
      },
    });

    const { lat, lng } = response.data.location;

    // Find the user by phone number and update their location
    const user = await User.findOneAndUpdate({ phone: phoneNumber }, {
      location: {
        coordinates: [lng, lat],
      },
    }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User location updated successfully', location: user.location.coordinates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};