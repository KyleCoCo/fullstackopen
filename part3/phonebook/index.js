const express = require('express')
const app = express()
const morgan = require('morgan')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
// Custom format for morgan to log POST data
morgan.token('post-data', (req, res) => {
  // Check if the method is POST and if body is available
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});
  
// Use morgan with a custom format
app.use(morgan(':method :url :status :response-time ms :post-data'));
  


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const generate_id = () => {
    const MAX = 100000
    const randomId = Math.floor(Math.random()*(MAX))

    return String(randomId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'body or number is missing'
        })
    }
    const contained = persons.find(p => p.name === body.name)
    if(contained) {
        return response.status(400).json({
            error: `duplicate name ${body.name}`
        })
    }
    const person = {
        id: generate_id(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if(person) {
        response.json(person)    
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const filtered = persons.filter(p => p.id !== id)
    if(filtered.length === persons.length) {
        response.status(404).end()
    } else {
        persons = filtered
        response.status(204).end()
    }
})

app.get('/info', (request, response) => {
    response.end(`Phonebook has info for ${persons.length} people\n\n${Date()}`)
    // response.json(persons)
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


