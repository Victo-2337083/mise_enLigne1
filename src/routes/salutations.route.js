import express from 'express';
import { AjouterSalutation,  afficherSalutationAleatoire , afficherSalutation} from '../controllers/salutations.controller.js'; 


const router = express.Router();


router.get('/api', (req, res) => {
    //Message de bienvenue à l'api
    
    res.send("<h1> Bienvenue à l\'API des salutations </h1>");
});

router.get('/api/salutations/liste', afficherSalutation);


//Ajouter une salutation (voir aide plus bas)
router.get('/api/salutations', afficherSalutationAleatoire);


//Ajouter une salutation (voir aide plus bas)
router.post('/api/salutations', AjouterSalutation);


export default router;