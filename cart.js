const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/auth')
const { getCart, saveCart, getProductById } = require('../data/database')

// Get user's cart
router.get('/', authenticateToken, (req, res) => {
  try {
    const cart = getCart(req.user.userId)
    res.json({ items: cart.items || [] })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart' })
  }
})

// Add item to cart
router.post('/', authenticateToken, (req, res) => {
  try {
    const { productId, quantity } = req.body

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' })
    }

    const product = getProductById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const cart = getCart(req.user.userId)
    const existingItem = cart.items.find(item => item.product._id === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({ product, quantity })
    }

    saveCart(req.user.userId, cart)
    res.json({ message: 'Item added to cart', cart })
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart' })
  }
})

// Update cart item
router.put('/', authenticateToken, (req, res) => {
  try {
    const { productId, quantity } = req.body

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Product ID and quantity are required' })
    }

    const cart = getCart(req.user.userId)
    
    if (quantity === 0) {
      cart.items = cart.items.filter(item => item.product._id !== productId)
    } else {
      const item = cart.items.find(item => item.product._id === productId)
      if (item) {
        item.quantity = quantity
      } else {
        return res.status(404).json({ message: 'Item not found in cart' })
      }
    }

    saveCart(req.user.userId, cart)
    res.json({ message: 'Cart updated', cart })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart' })
  }
})

// Clear cart
router.delete('/', authenticateToken, (req, res) => {
  try {
    saveCart(req.user.userId, { items: [] })
    res.json({ message: 'Cart cleared' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart' })
  }
})

module.exports = router

