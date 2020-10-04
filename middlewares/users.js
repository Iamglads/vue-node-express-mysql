// middleware 


module.exports = {
    validateRegister: (req, res, next) => {

        // username min length 3
        if(!req.body.username || req.body.username.length < 4) {
            return res.status(400).send({ message: 'Veuillez rentrer un nom avec 4 caractères minimum!'})
        }

         // password min 6 chars
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
            message: 'Le mot de passe requiert au minimim 6 caractères!'
            });
        }

        if (!req.body.password_reapeat || req.body.password != req.body.password_reapeat) {
            return res.status(400).send({ message: 'Les deux mots de passes doivent être identiques!'})
        }

        next()

    },

    isLoggedIn: (req, res, next) => {
        try {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(
            token,
            'SECRETKEY'
          );
          req.userData = decoded;
          next();
        } catch (err) {
          return res.status(401).send({
            msg: 'Your session is not valid!'
          });
        }
      }
}