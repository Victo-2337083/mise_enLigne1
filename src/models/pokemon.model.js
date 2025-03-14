import db from '../config/pg_db.js';

const getPokemonByType = (type_primaire, page = 1) => {
    return new Promise((resolve, reject) => {
        const pokemonPerPage = 25;
        const startIndex = (page - 1) * pokemonPerPage;

        let requete, countQuery, params;

        if (type_primaire) {
            requete = `SELECT * FROM pokemon WHERE type_primaire = $1 LIMIT $2 OFFSET $3`;
            countQuery = `SELECT COUNT(*) AS total FROM pokemon WHERE type_primaire = $1`;
            params = [type_primaire, pokemonPerPage, startIndex];
        } else {
            requete = `SELECT * FROM pokemon LIMIT $1 OFFSET $2`;
            countQuery = `SELECT COUNT(*) AS total FROM pokemon`;
            params = [pokemonPerPage, startIndex];
        }

        db.query(requete, params)
            .then(resultat => {
                return db.query(countQuery, type_primaire ? [type_primaire] : [])
                    .then(totalResult => {
                        const totalPokemon = totalResult.rows[0].total;
                        resolve({
                            pokemons: resultat.rows,
                            nombrePokemonTotal: totalPokemon,
                            page: page,
                            totalPage: Math.ceil(totalPokemon / pokemonPerPage)
                        });
                    });
            })
            .catch(erreur => {
                console.error(`Erreur SQL: ${erreur.message}`);
                reject(erreur);
            });
    });
};

const getPokemonById = (id) => {
    return new Promise((resolve, reject) => {
        const requete = `SELECT * FROM pokemon WHERE id = $1`;
        db.query(requete, [id])
            .then(resultat => resolve(resultat.rows))
            .catch(erreur => {
                console.error(`Erreur SQL: ${erreur.message}`);
                reject(erreur);
            });
    });
};

const updatePokemon = (data, id) => {
    return new Promise((resolve, reject) => {
        const requete = `UPDATE pokemon SET nom = $1, type_primaire = $2, type_secondaire = $3, pv = $4, attaque = $5, defense = $6 WHERE id = $7`;
        const params = [data.nom, data.type_primaire, data.type_secondaire, data.pv, data.attaque, data.defense, id];

        db.query(requete, params)
            .then(resultat => resolve(resultat))
            .catch(erreur => {
                console.error(`Erreur SQL: ${erreur.message}`);
                reject(erreur);
            });
    });
};

const addPokemon = (data) => {
    return new Promise((resolve, reject) => {
        const requete = `INSERT INTO pokemon (nom, type_primaire, type_secondaire, pv, attaque, defense) VALUES ($1, $2, $3, $4, $5, $6)`;
        const params = [data.nom, data.type_primaire, data.type_secondaire, data.pv, data.attaque, data.defense];

        db.query(requete, params)
            .then(resultat => resolve(resultat))
            .catch(erreur => {
                console.error(`Erreur SQL: ${erreur.message}`);
                reject(erreur);
            });
    });
};

const deletePokemon = (id) => {
    return new Promise((resolve, reject) => {
        const requete = `DELETE FROM pokemon WHERE id = $1`;
        db.query(requete, [id])
            .then(resultat => resolve(resultat))
            .catch(erreur => {
                console.error(`Erreur SQL: ${erreur.message}`);
                reject(erreur);
            });
    });
};

export default {
    getPokemonById, getPokemonByType, updatePokemon, addPokemon, deletePokemon
};
