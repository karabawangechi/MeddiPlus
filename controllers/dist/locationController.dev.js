"use strict";

var axios = require('axios');

var User = require('../models/user');

exports.detectUserLocation = function _callee(req, res) {
  var phoneNumber, response, _response$data$locati, lat, lng, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          phoneNumber = req.body.phone; // Get the phone number from the request body

          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(axios.post('https://www.googleapis.com/geolocation/v1/geolocate', {
            considerIp: false,
            wifiAccessPoints: [],
            cellTowers: [{
              cellId: 12345,
              // Replace with appropriate cell tower information
              locationAreaCode: 67890,
              mobileCountryCode: 254,
              mobileNetworkCode: 769362302,
              age: 0,
              signalStrength: -60,
              timingAdvance: 15
            }]
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'AIzaSyCqVGnU-dhnEsiLy2bFs89d4w349Xt6CQI' // Replace 'YOUR_API_KEY' with your actual API key

            }
          }));

        case 4:
          response = _context.sent;
          _response$data$locati = response.data.location, lat = _response$data$locati.lat, lng = _response$data$locati.lng; // Find the user by phone number and update their location

          _context.next = 8;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            phone: phoneNumber
          }, {
            location: {
              coordinates: [lng, lat]
            }
          }, {
            "new": true
          }));

        case 8:
          user = _context.sent;

          if (user) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 11:
          res.json({
            message: 'User location updated successfully',
            location: user.location.coordinates
          });
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 14]]);
};
//# sourceMappingURL=locationController.dev.js.map
