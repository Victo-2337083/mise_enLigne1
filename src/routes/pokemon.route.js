import express from 'express';
import { PokemonBytype, PokemonById, modifierUnPokemon, ajouterPokemons, suprimerPokemonById} from '../controllers/pokemon.controller.js'; 

//, , modifierUnPokemon, ajouterPokemons, suprimerPokemonById
const router = express.Router();
// Afficher un pokemon types
router.get('/liste/', PokemonBytype);


// Afficher un pokemon selon son id

router.get('/:id', PokemonById );

router.put('/:id', modifierUnPokemon);

router.post('/', ajouterPokemons);

router.delete('/:id', suprimerPokemonById);



export default router; 

