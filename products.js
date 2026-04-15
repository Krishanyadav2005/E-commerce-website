const express = require('express')
const router = express.Router()
const { getProducts, getProductById } = require('../data/database')

// Get all products
router.get('/', (req, res) => {
  try {
    const products = getProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' })
  }
})

// Get single product
router.get('/:id', (req, res) => {
  try {
    const product = getProductById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product' })
  }
})

module.exports = router

