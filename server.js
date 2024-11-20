const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // for hashing passwords

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse incoming requests with JSON payload
app.use(express.json());

// Dummy user data for testing (You can replace this with a database later)
const users = [
  { email: 'test@example.com', password: 'password123' }, // Dummy user for login
];

// Secret key for JWT signing (use a more secure key in production)
const JWT_SECRET = 'yourSecretKey'; 

// Function to generate JWT token
function generateToken(email) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
}

// Example route for login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the users array
  const user = users.find(u => u.email === email);

  if (user) {
    // Compare the provided password with the stored password (in this case plain text)
    if (password === user.password) {
      const token = generateToken(user.email); // Generate JWT token
      return res.status(200).json({ message: 'Login successful!', token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Profile update route - requires authentication
app.post('/updateProfile', (req, res) => {
  const { token, newEmail, newPassword } = req.body;

  // Verify JWT token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the user by email (decoded email from JWT)
    const user = users.find(u => u.email === decoded.email);

    if (user) {
      // Update the email or password if provided
      if (newEmail) user.email = newEmail;
      if (newPassword) user.password = newPassword;

      res.status(200).json({ message: 'Profile updated successfully!' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// Route for registration
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    // If the email already exists, return an error
    console.log(`Registration attempt failed: User ${email} already exists.`);
    return res.status(400).json({ message: 'Email already in use' });
  }

  // Hash the password before saving
  const hashedPassword = bcrypt.hashSync(password, 10);  // Hash password with 10 rounds
  const newUser = { email, password: hashedPassword };
  users.push(newUser);

  // Respond with success message
  console.log(`New user registered: ${email}`);
  res.status(201).json({ message: 'User registered successfully' });
});

// Route for the homepage (test if server works)
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  