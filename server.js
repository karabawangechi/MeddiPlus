// Import required modules
const connectDB = require('./config/db.config');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController'); // Import the userController
const bodyParser = require('body-parser');
const User = require('./models/user');
//const Med = require('./models/med');
const Doc = require('./models/doctors');
const Pharm = require('./models/pharmacy');
const multer = require('multer');
const path = require('path');
const locationController = require('./controllers/locationController');
const userProfileController = require('./controllers/userProfileContoller');
const docController = require('./controllers/docController');
const router = express.Router();

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/Mediplus" })
}));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Auth routes
app.put('/users/profile', upload.single('profilePhoto'), userProfileController.updateUserProfile);
app.post('/users/detect-location', locationController.detectUserLocation);

app.post('/signup', authController.signup);
app.post('/login', authController.login);
//app.post('/doc', docController.signup);


// User routes
app.get('/users', userController.getAllUsers); // Pass the function as a callback
app.get('/users/:id', userController.getUserById); // Pass the function as a callback
app.get('/doctor', docController.getAllDoc); // Pass the function as a callback
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('node_modules'));
app.use('/', router);
router.get('/index', (req, res) => {
  res.render("index.ejs");
});
router.get('/main', (req, res) => {
  res.render("main.ejs");
});
router.get('/contact', (req, res) => {
  res.render("contact.ejs");
});
router.get('/checkout', (req, res) => {
  res.render("checkout.ejs");
});
router.get('/cart', (req, res) => {
  res.render("cart.ejs");
});
router.get('/shop-single', (req, res) => {
  res.render("shop-single.ejs");
});
router.get('/shop', (req, res) => {
  res.render("shop.ejs");
});
// Route to update user's live location
app.put('/users', async (req, res) => {
  const userId = req.params.userId;
  const { latitude, longitude } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.location.coordinates = [latitude, longitude];
    user.updatedAt = Date.now();
    await user.save();

    res.json({ message: 'User location updated successfully' });
  } catch (err) {
    console.error('Error updating user location', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});