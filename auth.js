const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { getUsers, saveUsers, getUserByEmail } = require('../data/database')
const { authenticateToken } = require('../middleware/auth')

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const users = getUsers()
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      _id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    saveUsers(users)

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = getUserByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get current user
router.get('/me', authenticateToken, (req, res) => {
  const users = getUsers()
  const user = users.find(u => u._id === req.user.userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email
  })
})

module.exports = router

