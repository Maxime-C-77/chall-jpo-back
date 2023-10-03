const express = require('express')
const cors = require('cors');
const app = express()
const lespokemon = require('./pokemons.json')
const InformationsPokemon = require('./infospokemons.json')
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(cors());

const DEFAULT_LIMIT = 10;


app.get('/api/pokemon', (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : DEFAULT_LIMIT;
  const startIndex = offset;
  const endIndex = startIndex + limit;
  const totalPokemon = lespokemon.length;
  const paginatedPokemon = lespokemon.slice(startIndex, endIndex);
  const nextOffset = startIndex + limit;
  const previousOffset = Math.max(0, startIndex - limit);
  const nextLink = `/api/pokemon/${nextOffset}/${limit}`;
  const previousLink = `/api/pokemon/${previousOffset}/${limit}`;

  res.status(200).json({
    totalPokemon,
    offset,
    limit,
    next: nextLink,
    previous: previousLink,
    data: paginatedPokemon,
  });
});

app.get('/api/pokemon/:offset/:limit', (req, res) => {
  const offset = req.params.offset ? parseInt(req.params.offset) : 0;
  const limit = req.params.limit ? parseInt(req.params.limit) : DEFAULT_LIMIT;
  const nextOffset = offset + limit;
  const previousOffset = Math.max(0, offset - limit);
  const nextLink = `/api/pokemon/${nextOffset}/${limit}`;
  const previousLink = `/api/pokemon/${previousOffset}/${limit}`;
  const paginatedPokemon = lespokemon.slice(offset, offset + limit);

  res.status(200).json({
    offset,
    limit,
    next: nextLink,
    previous: previousLink,
    data: paginatedPokemon,
  });
});

app.get('/api/infoPokemon/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const lePokemon = InformationsPokemon.find(jeu => jeu.id === id)
  res.status(200).json(lePokemon)
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
})