const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/auth')
const { saveOrder, getOrders, getProductById } = require('../data/database')

// Create order
router.post('/', authenticateToken, (req, res) => {
  try {
    const { items, shippingAddress, total } = req.body

    if (!items || !shippingAddress || !total) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    if (!items.length) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    // Verify all products exist
    for (const item of items) {
      const product = getProductById(item.product)
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` })
      }
    }

    const order = {
      _id: Date.now().toString(),
      userId: req.user.userId,
      items: items.map(item => ({
        product: getProductById(item.product),
        quantity: item.quantity
      })),
      shippingAddress,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    saveOrder(order)
    res.status(201).json({ message: 'Order placed successfully', order })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' })
  }
})

// Get user's orders
router.get('/', authenticateToken, (req, res) => {
  try {
    const orders = getOrders(req.user.userId)
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' })
  }
})

module.exports = router

