const router = require('express').Router();
const noteRoutes = require('../apiRoutes/noteRoutes');

router.use(noteRoutes);

module.exports = router;
