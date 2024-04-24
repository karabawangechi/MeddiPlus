"use strict";

var User = require('../models/user');

var path = require('path');

var fs = require('fs');

exports.updateUserProfile = function _callee(req, res) {
  var userId, user, photoPath;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.params.userId;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 4:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 7:
          // Update user location
          if (req.body.latitude && req.body.longitude) {
            user.location.coordinates = [req.body.latitude, req.body.longitude];
          } // Upload profile photo


          if (req.file) {
            photoPath = path.join('uploads', req.file.filename);
            user.profilePhoto = photoPath;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          res.json({
            message: 'User profile updated successfully'
          });
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};
//# sourceMappingURL=userProfileContoller.dev.js.map
