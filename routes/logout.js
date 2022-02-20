const { Router } = require('express')
const router = Router()


router.post('/', (req, res) => {
  req.session.destroy()
  res.send({ "ok": true })
})

module.exports = router