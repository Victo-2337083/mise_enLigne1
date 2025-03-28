import express from 'express';
import dotenv from 'dotenv';

// À ajuster selon votre structure
import routes from './src/routes/pokemon.route.js'; 
// Créer une application express
const app = express();
dotenv.config();

// Importer les middlewares
app.use(express.json());


// Démarrer le serveur
const PORT = process.env.PORT || 3000;
const host = process.env.HOSTNAME||'localhost';

//app.use('/', routes);
// Changer la route de base pour /api/pokemons/
app.use('/api/pokemons/', routes);
app.listen(PORT, () => {
    console.log(`Serveur démarré sur ${host}:${PORT}`);
});






