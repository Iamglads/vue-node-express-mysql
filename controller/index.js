// controller 
const bcrypt = require('bcrypt') 
const uuid = require('uuid')
const jwt = require('jsonwebtoken')

const database = require('../database/database')


exports.signup = () => {
    database.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${database.escape(
            req.body.username)});`, (err, result) => {
                if (result.length) {
                    return res.status(409).send({
                        Message: 'Ce nom existe déjà!'
                    })
                } else {
                    // username is available 
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).send({
                                Message: err
                            })
                        } else {
                            // mot de passe haché, ajouté à la base de données
                            database.query(
                                `INSERT INTO users (id, username, password, registered) VALUES ('${uuid.v4}', ${database.escape(
                                    req.body.username )}, ${database.escape(hash)}, now())`, (err, result) => {
                                    if (err) {
                                        throw err
                                        return res.status(400).send({
                                          msg: err
                                        })
                                      }
                                
                                    return res.status(201).send({
                                        Message: 'Utilisateur enregistré!!'
                                      })

                                })
                        }
                    })
                }
            }
    
    )
}

exports.login = () => {
    database.query(
        `SELECT * FROM users WHERE username = ${database.escape(req.body.username)};`, (err, result) => {

            // l'utilisateur n'existe pas 

            if (err) {
                throw err;
                return res.status(400).send({
                  msg: err
                });
              }

              if(!result.length) {
                  return res.status(401).send({ Message: "Le nom de l'utilisateur ou le mot de passe est incorect!"})
              }

              // verifier le mot de passe 

              bcrypt.compare( req.body.password, result[0]['password'], (bErr, bResult) => {
                if (bErr) {
                    throw bErr;
                    return res.status(401).send({
                      msg: 'Username or password is incorrect!'
                    });
                  }

                  if (bResult) {
                      const token = jwt.sign({
                          username: result[0].username, userId: result[0].id
                      }, 'SECRETKEY', { expiresIn: '1h'})

                      database.query(
                          `ÙPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                      )
                      return res.status(200).send({
                          Message: 'Connecté',
                          token,
                          user: result[0]
                      })
                  }

                  return res.status(401).send({ Message: "L'identifiant ou le mot de passe est incorect!"})
              })

        }
    )
}

exports.secretRoute = () => {
    consolel.og(req.userData)
    res.send('Ceci est le contenu secret')
} 