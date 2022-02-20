const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  items: [{
    text: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  }]

})

userSchema.methods.addNewTask = async function (text) {
  this.items.push({ text })
  await this.save()

  return this.items[this.items.length - 1]._id
}

userSchema.methods.deleteTaskById = async function (task_idForDelete) {

  this.items = this.items.filter(task =>
    task._id.toString() !== task_idForDelete)
  await this.save()
}

userSchema.methods.updateTask = async function ({ text, id, checked }) {
  this.items = this.items.map(task => {
    if (task._id.toString() === id) {
      task = { text, checked }
    }

    return task
  })
  await this.save()
}

module.exports = model('User', userSchema)