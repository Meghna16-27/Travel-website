require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 4000;
const SECRET_KEY = process.env.SECRET_KEY || "default_secret";


// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log(" MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Failed", err));

// Schemas
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, unique: true, required: true },
  password:  { type: String, required: true },
  lastLogin: { type: Date },
  loginDuration: { type: Number, default: 0 },
});

const destinationSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  img1:        { type: String, required: true },
  img2:        { type: String, required: true },
  img3:        { type: String, required: true },
  img4:        { type: String, required: true },
  img6:        { type: String, required: true },
  description: { type: String, required: true },
});

const bookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  pin: String,
  adult: Number,
  child: Number,
  old: Number,
  food: String,
  from: String,
  to: String,
  cost:Number,
 
});


const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now }
});


const Contact = mongoose.model("Contact", contactSchema);
const User = mongoose.model("register", userSchema);
const Destination = mongoose.model("destination", destinationSchema);
const Booking = mongoose.model("Booking", bookingSchema);

// ====================== User APIs ========================
// Example Express register route
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required!"});
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Registration failed", error });
  }
});



// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Admin check
    if (email === 'admin123@gmail.com' && password === 'admin123') {
      return res.status(200).json({
        message: "Admin login successful!",
        token: "admin-token",
        firstName: "Admin"
      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials!" });

    user.lastLogin = Date.now();
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful!",
      token,
      firstName: user.firstName,
     email: user.email // include for logout use
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed!", error });
  }
});

// User Logout (sets loginDuration)
app.post("/logout", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const now = Date.now();
    const duration = Math.floor((now - (user.lastLogin || now)) / 1000); // in seconds

    user.loginDuration = duration;
    await user.save();

    res.status(200).json({ message: "Logout duration saved." });
  } catch (error) {
    res.status(500).json({ message: "Logout failed!", error });
  }
});


// ====================== Admin Panel APIs ========================

// Get all users
app.get("/registers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

// Create new user manually
app.post("/registers", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
});

// Update user info
app.put("/registers/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// ====================== Destination APIs ========================

// Get all destinations
app.get("/destinations", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching destinations", error });
  }
});

// Get a single destination
app.get("/destinations/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: "Error fetching destination", error });
  }
});

//add destinations
app.post("/destinations", async (req, res) => {
  try {
    const { title, img1, img2, img3, img4, img6, description } = req.body;

    if (!title || !img1 || !img2 || !img3 || !img4 || !img6 || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const tour = new Destination({ title, img1, img2, img3, img4, img6, description });
    await tour.save();

    res.status(201).json({ message: "Destination added", tour });
  } catch (error) {
    res.status(500).json({ message: "Error adding destination", error });
  }
});

// Update destination
app.put("/destinations/:id", async (req, res) => {
  try {
    const tour = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: "Error updating destination", error });
  }
});

// Delete destination
app.delete("/destinations/:id", async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting destination", error });
  }
});

// ====================== Booking API ========================

app.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving booking" });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const { email } = req.query;
    const bookings = email
      ? await Booking.find({ email })
      : await Booking.find(); // fallback to all if no email

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});

app.delete("/bookings/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
});

//===================conatct===============================
// POST route to handle form submission
app.post("/contacts", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(200).json({ success: true, message: "Message received!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();  // Correct model
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error });
  }
});


// ====================== Server Start ========================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
