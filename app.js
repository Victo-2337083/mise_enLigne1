import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './src/routes/pokemon.route.js';

dotenv.config();

const app = express();

// Permettre toutes les origines
app.use(cors());  // Permet toutes les origines (option par défaut)

app.use(express.json());

// Définir les routes
app.use('/api/pokemons/', routes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
const host = process.env.HOSTNAME || 'localhost';

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://${host}:${PORT}`);
});
