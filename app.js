const express = require('express');
const morgan = require('morgan');
const path = require('path');
const index = require('./routes');
const errorHandler = require('errorhandler');

require('./database');

const app = express();
exports.app = app;
const port = process.env.PORT || 3000;


// require après l'export de app car on l'utilise dans la config
require('./config/session.config');
//require après l'import de session sinon passport ne pourra pas acceder
// à req.session
require('./config/passport.config');

// Definition du dossier de views
app.set('views', path.join(__dirname, 'views'));

// Definition du moteur des views en pug
app.set('view engine', 'pug');

// Configuration short du middleware logger
app.use(morgan('short'));

// Configuration du middleware pour les ressources statiques (images et autres)
app.use(express.static(path.join(__dirname, 'public')));

// Utilisations des middleware pour parser le json ou le urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Nous montons le fichier de routing
app.use(index);

/*
* Utilisation du middleware errorHandler pour une gestion d'erreur précise
* sinon nous renvoyons uniquement les erreurs utilisateur en production mais pas de message si c'est une erreur serveur
*/
if(process.env.NODE_ENV === 'development'){
    app.use(errorHandler());
} else {
    app.use((err, req, res, next) => {
        const code = err.code || 500;
        res.status(code).json({
            code: code,
            message: code === 500 ? null : err.message
        });
    });
}

app.listen(port);