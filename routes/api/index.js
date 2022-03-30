const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./thoughts-route');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;