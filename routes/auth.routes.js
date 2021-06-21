const router = require('express').Router();
const { signinForm, signin, signout } = require('../controllers/auth.controller');

router.get('/signin/form', signinForm);
router.get('/signout', signout);

router.post('/signin', signin);

module.exports = router;