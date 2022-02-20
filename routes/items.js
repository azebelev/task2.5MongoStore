const { Router } = require('express')
const router = Router()
const User = require('../model/userSchema')

router.get('/', async (req, res) => {
  const user_id = req.session.user_id

  if (!user_id) {
    res.send({ error: 'forbidden' })
  } else {
    const user = await User.findById(user_id)
    res.send({ items: user.items })
  }
})

router.post('/', async (req, res) => {
  const { text } = req.body
  const user = await User.findById(req.session.user_id)
  const task_id = await user.addNewTask(text)
  res.send({ id: task_id })

})

router.delete('/', async (req, res) => {
  try {
    const { id: task_id } = req.body
    const user = await User.findById(req.session.user_id)
    await user.deleteTaskById(task_id)

  } catch (error) {
    console.log(error)
  }
  res.send({ ok: true })
})

router.put('/', async (req, res) => {
  const { text, id, checked } = req.body
  const user = await User.findById(req.session.user_id)
  await user.updateTask({ text, id, checked })
})

module.exports = router