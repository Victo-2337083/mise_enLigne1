import express from 'express';
import dotenv from 'dotenv';

// À ajuster selon votre structure
import routes from './src/routes/salutations.route.js'; 
//,AjouterSalutation
//import { salutations} from './src/models/salutations.model.js';

const app = express();
dotenv.config();

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Utiliser les vari ables d'environnement
const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME||'localhost'


app.use('/', routes);

app.listen(port, () => {
    console.log(`Serveur démarré sur ${host}:${port}`);
});