// Creation d'une instance router de express
const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guard.config');

const plants = require('./plants.routes');
const users = require('./users.routes');
const auth = require('./auth.routes');
const dataset = require('./datasets.routes');

router.use('/plants', ensureAuthenticated, plants);
router.use('/users', users);
router.use('/auth', auth);
router.use('/datasets', dataset);

router.get('/', (req, res) => {
  res.redirect('/plants');
})

module.exports = router;