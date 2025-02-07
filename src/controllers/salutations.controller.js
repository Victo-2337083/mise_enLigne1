
// À ajuster selon votre structure
import db from '../config/db.js';
//import { salutations} from '../models/salutations.model.js';

/**
 * Fonction pour afficher toutes les salutations
 * Utilisation : GET http://127.0.0.1:3001/api/salutations
 * Pas de paramètres nécessaires
 */
const afficherSalutation = async (req, res) => {
  try {
    const requete = `SELECT message FROM  salutations`;
    
db.query(requete, (erreur, resultat) => {
   if(erreur){
    console.error(erreur.message);
    res.status(500).send('erreur de serveur')
   }else{
    res.status(200).json(resultat)
   }
});
 } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};



/**
 * Fonction pour afficher une salutation aléatoire en fonction de la langue
 * Utilisation : GET http://127.0.0.1:3001/api/salutations?langue=<code_langue>
 * Paramètre de requête : langue (valeurs possibles : en, fr, es, de)
 */

const afficherSalutationAleatoire = async (req, res) => {

  const { langue } = req.query;
  
  try {
    let  requete;

    if (langue == 'en') {
      requete = 'SELECT message FROM salutations WHERE code_langue = ?';
    } else if (langue == 'fr') {
      requete = 'SELECT message FROM salutations WHERE code_langue = ?';
    } else if (langue == 'es') {
      requete = 'SELECT message FROM salutations WHERE code_langue = ?';
    } else if (langue == 'de') {
      requete = 'SELECT message FROM salutations WHERE code_langue = ?';
    } else {
      return res.status(400).send("<h2>Requête invalide! Veuillez choisir une langue valide.</h2>");
    }
    db.query(requete, ["en","fr","es","de"], (erreur, resultat) => {
      if (erreur) {
        console.error(erreur.message);
        res.status(500).send('Erreur du serveur');
      } else {
        // Mélangez les résultats avant de les renvoyer
        const alea = resultat.sort(() => Math.random() - 0.5);
        res.status(200).json(alea);
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};


/**
 * Fonction pour ajouter une salutation
 * Utilisation : POST http://127.0.0.1:3001/api/ajouter-salutation
 * Corps de la requête : JSON contenant code_langue, langue, message
 * Exemple de corps de requête :
 * {
 *   "code_langue": "fr",
 *   "langue": "Français",
 *   "message": "salamalekoun"
 * }
 */

const AjouterSalutation = async (req, res) => {

  const { code_langue, langue, message } = req.body;

  if (!code_langue || !langue || !message) {
    return res.status(400).send("<h2>Requête invalide! Veuillez fournir un nom, un prénom et une langue.</h2>");
  }

  const requete = 'INSERT INTO salutations (code_langue, langue, message) VALUES (?, ?, ?)';
  const params = [code_langue, langue, message];

  db.query(requete, params, (erreur, resultat) => {
    if (erreur) {
      console.error(erreur.message);
      res.status(500).send('Erreur du serveur');
    } else {
      const idGenere = resultat.insertId;
      res.status(201).send(`Salutation ajoutée avec succès! ID: ${idGenere}`);
    }
  });
};

export { AjouterSalutation,  afficherSalutationAleatoire , afficherSalutation };


