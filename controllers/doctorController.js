const Doc = require('../models/doctors');
//const bcrypt = require('bcryptjs');

// User signup
//const User = require('../models/user');

// Get all users
exports.getAllDoc = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.signup = async (req, res) => {
  const { name, email, password,location,phone,insurancecover } = req.body;

  try {
    // Check if the user already exists
    const existingDoc = await Doc.findOne({ email });
    if (existingDoc) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    
    // Create a new user
    const newDoc = new Doc({ name, email,location,phone,insurancecover, password: hashedPassword });
    await newDoc.save();

    res.json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // User is authenticated, set the session
    req.session.userId = user._id;
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};