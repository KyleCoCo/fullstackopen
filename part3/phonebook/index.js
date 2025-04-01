require('dotenv').config()
const express = require('express')
const Person = require('./models/person')

const app = express()
// whenever Express gets an HTTP GET request it will first check 
// if the dist directory contains a file corresponding to the request's address. If a correct file is found, Express will return it.
app.use(express.static('dist'))
app.use(express.json())

// Custom format for morgan to log POST data
const morgan = require('morgan')
morgan.token('post-data', (req, res) => {
  // Check if the method is POST and if body is available
  return req.method === 'POST' || req.method === 'PUT' ? JSON.stringify(req.body) : '';
});
// Use morgan with a custom format
app.use(morgan(':method :url :status :response-time ms :post-data'));


app.get('/api/persons', (request, response) => {
    Person.find().then(persons => {
        console.log(persons)
        response.json(persons)
    })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'body or number is missing'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save()
    .then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        response.json(result)
    })
    .catch(error => next(error))
    // persons = persons.concat(person)
    
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'body or number is missing'
        })
    }
    Person.findById(request.params.id)
    .then(person => {
        if(!person) {
            return response.status(404).end()
        }
        person.name = body.name
        person.number = body.number

        return person.save()
        .then(result => {
            console.log(`updated ${person.id} ${person.name} number ${person.number} to phonebook`)
            response.json(person)
        })
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if(person) {
            response.json(person)    
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(person => {
        console.log("delete result: ", person)
        if (person) {
            response.status(204).end()
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.countDocuments({})
    .then(cnt => {
        response.end(`Phonebook has info for ${cnt} people\n\n${Date()}`)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    
    
  
    next(error)
  }
  
  // this has to be the last loaded middleware, also all the routes should be registered before this!
  app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


