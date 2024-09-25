const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');

const secretKey = "mySecretKey"; // Simplified secret for JWT

exports.register = async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = createUser({ email, password: hashedPassword });
    
    res.status(201).json({ message: 'User registered successfully', user });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
};