import mongoose from 'mongoose';

const args = process.argv.slice(2)

if (args.length < 1) {
  console.log('give password as argument')
  process.exit(1)
}

const password = args[0]

const url = `mongodb+srv://kimarimt:${password}@cluster0.of2o7.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (args.length === 3) {
  const person = new Person({
    name: args[1],
    number: args[2]
  })

  person.save().then(result => {
    console.log(`added ${person.name} ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person
    .find({})
    .then(result => {
      console.log('Phonebook:')

      for (const person of result) {
        console.log(`${person.name} ${person.number}`)
      }
      mongoose.connection.close()
    })
}

