"use strict";

var Doc = require('../models/doctors'); //const bcrypt = require('bcryptjs');
// User signup
//const User = require('../models/user');
// Get all users


exports.getAllDoc = function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context.sent;
          res.json(users);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.signup = function _callee2(req, res) {
  var _req$body, name, email, password, location, phone, insurancecover, existingDoc, salt, hashedPassword, newDoc;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, location = _req$body.location, phone = _req$body.phone, insurancecover = _req$body.insurancecover;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Doc.findOne({
            email: email
          }));

        case 4:
          existingDoc = _context2.sent;

          if (!existingDoc) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'User already exists'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 9:
          salt = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 12:
          hashedPassword = _context2.sent;
          // Create a new user
          newDoc = new Doc({
            name: name,
            email: email,
            location: location,
            phone: phone,
            insurancecover: insurancecover,
            password: hashedPassword
          });
          _context2.next = 16;
          return regeneratorRuntime.awrap(newDoc.save());

        case 16:
          res.json({
            message: 'User created successfully'
          });
          _context2.next = 23;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 19]]);
}; // User login


exports.login = function _callee3(req, res) {
  var _req$body2, email, password, user, isMatch;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context3.sent;

          if (user) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'Invalid credentials'
          }));

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          isMatch = _context3.sent;

          if (isMatch) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'Invalid credentials'
          }));

        case 12:
          // User is authenticated, set the session
          req.session.userId = user._id;
          res.json({
            message: 'Login successful'
          });
          _context3.next = 20;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 16]]);
};
//# sourceMappingURL=doctorController.dev.js.map
