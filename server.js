const express = require('express')
const { animals } = require('./data/animals.json')

const app = express()

const PORT = process.env.PORT || 3001

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = []
    let filteredResults = animalsArray
    if (query.personalityTraits) {
        // if it's a single personalityTrait which would be a string
        // put it inside an array
        if (typeof query.personalityTraity === 'string') {
            personalityTraitsArray = [query.personalityTraitsArray]
        } else {
            personalityTraitsArray = query.personalityTraits
        }
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1)
            // indexOf will return a -1 if it is NOT present
            // to match if it IS present, use !== -1
        })
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species)
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }
    return filteredResults
}

app.get('/api/animals', (req, res) => {
    let results = animals
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})