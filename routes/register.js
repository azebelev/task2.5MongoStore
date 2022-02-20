const { Router } = require('express')
const router = Router()
const User = require('../model/userSchema')

router.post('/', async (req, res) => {
  const { login, pass } = req.body
  let user = await User.findOne({ login, pass });
  if (!user) {
    user = new User({ login, pass, items: [] })
    await user.save()

    res.send({ 'ok': true })

  } else {
    console.log('данный юзер уже зарегистрирован, нажмите "войти"  ')
  }

})

module.exports = router