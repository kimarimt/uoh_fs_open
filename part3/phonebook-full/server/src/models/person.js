import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

export default mongoose.model('Person', personSchema)