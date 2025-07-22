const express = require('express')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

let persons = [
	{
		name: 'Arto Hellas',
		number: '21345231',
		id: '1',
	},
	{
		name: 'Ada Lovelace',
		number: '39-44-5323523',
		id: '2',
	},
	{
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
		id: '3',
	},
]

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.post('/api/persons', (request, response) => {
	const body = request.body
	const personToAdd = {
		name: body.name,
		number: body.number,
		id: body.id,
	}
	persons = persons.concat(personToAdd)
	response.status(204).end()
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	if (!persons.find((person) => person.id === id)) {
		response.status(404).end()
	}

	persons = persons.filter((person) => person.id !== id)
	response.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
