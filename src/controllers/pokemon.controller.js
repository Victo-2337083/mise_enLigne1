import pokemon from "../models/pokemon.model.js";

// Trouver un Pokémon par type avec pagination

const PokemonById = async (req, res) => {

    const id = req.params.id;

    if (!id || parseInt(id) <= 0) {
        res.status(400);
        res.send({
            message: "L'id du Pokémon est obligatoire et doit être supérieur à 0"
        });
        return;
    }
    
    pokemon.getPokemonById(id)
    .then((pokemon) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        if (!pokemon[0]) {
            res.status(404);
            res.send({
                message: `PokemonDDD introuvable avec l'id ${req.params.id}`
            });
            return;
        }
        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
        res.send(pokemon[0]);
    })

    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération du pokemon avec l'id " + req.params.id
        });
    });

};

const PokemonBytype = (req, res) => {
    const { type, page = 1 } = req.query;
    const pageNumber = parseInt(page, 10) || 1;

   // console.log(`Requête reçue : Type = ${type}, Page = ${pageNumber}`);

    pokemon.getPokemonBytype(type, pageNumber)
        .then((result) => {
            //console.log("Résultat obtenu :", result);

            if (result.pokemons.length === 0) {
                return res.status(200).json({
                    pokemons: [],
                    nombrePokemonTotal: 0,
                    page: 1,
                    totalPage: 1
                });
            }

            res.json(result);
        })
        .catch((error) => {
            console.error('Erreur SQL ou serveur :', error);
            res.status(500).json({ message: "Erreur lors de la récupération des Pokémon", erreur: error.message });
        });
};



const modifierUnPokemon = (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({ message: "ID invalide." });
    }

    const { nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;

    if (!nom && !type_primaire && !type_secondaire && !pv && !attaque && !defense) {
        return res.status(400).json({ message: "Veuillez fournir au moins un champ à modifier." });
    }

    pokemon.updatePokemon({ nom, type_primaire, type_secondaire, pv, attaque, defense }, id)
        .then(resultat => {
            if (resultat.affectedRows > 0) {
                res.status(200).json({ message: "Pokémon modifié avec succès !" });
            } else {
                res.status(500).json({ message: "Erreur lors de la modification du Pokémon." });
            }
        })
        .catch(erreur => {
            console.error("Erreur SQL :", erreur);
            res.status(500).json({ message: "Erreur serveur lors de la modification du Pokémon." });
        });
};

const ajouterPokemons = (req, res) => {
    const { nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;
    if (!nom || !type_primaire || !pv || !attaque || !defense) {
        return res.status(400).send({ message: "Certains champs obligatoires sont manquants." });
    }

    const data = { nom, type_primaire, type_secondaire, pv, attaque, defense };

    pokemon.adPokemon(data)
        .then(resultat => {
            if (resultat.affectedRows > 0) {
                return res.status(201).json({ message: "Pokémon ajouté avec succès !" });
            }
            res.status(500).json({ message: "Erreur lors de l'ajout du Pokémon." });
        })
        .catch(erreur => {
            console.error("Erreur SQL :", erreur);
            res.status(500).json({ message: "Erreur serveur lors de l'ajout du Pokémon." });
        });
};


const suprimerPokemonById = (req, res) => {
    const { id } = req.params;
    
    if (!id || parseInt(id) <= 0) {
        return res.status(400).send({ message: "L'id du Pokémon est obligatoire et doit être supérieur à 0" });
    }

    pokemon.deletePokemon(id)
        .then(resultat => {
            if (!resultat.affectedRows) {
                return res.status(404).send({ message: `Pokémon introuvable avec l'id ${id}` });
            }
            res.send({ message: "Pokémon supprimé avec succès" });
        })
        .catch(erreur => {
            console.error('Erreur :', erreur);
            res.status(500).send({ message: `Erreur lors de la suppression du Pokémon avec l'id ${id}` });
        });
};

///////////mkekfhjlvnke;jlr

export { PokemonById, PokemonBytype, modifierUnPokemon, ajouterPokemons, suprimerPokemonById };

