const { Router } = require('express')
const router = Router()
const User = require('../model/userSchema')

router.post('/', async (req, res) => {
  const { login, pass } = req.body
  const user = await User.findOne({ login, pass })


  if (user) {
    req.session.user_id = user._id
    await req.session.save()
    res.send({ 'ok': true })
  } else {
    res.send({ 'error': 'not found' })
  }
})

module.exports = router