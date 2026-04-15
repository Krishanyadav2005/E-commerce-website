const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'Messages are required' })
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'GEMINI_API_KEY is not configured on server' })
    }

    const genaiMessages = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }))

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: genaiMessages
      })
    })

    const data = await response.json()

    if (!response.ok) {
      const errorMessage = data?.error?.message || 'Chat API request failed'
      return res.json({
        reply: `I could not reach the AI service right now. ${errorMessage}`
      })
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'
    res.json({ reply })
  } catch (error) {
    res.status(500).json({ message: 'Failed to process chat request' })
  }
})

module.exports = router
