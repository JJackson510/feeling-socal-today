const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReactions,
    deleteReactions
} = require('../../controller/thoughts-controller');

router
.route('/')
.get(getAllThoughts);

router
.route('/:id')
.get(getThoughtsById)
.put(updateThoughts)
.delete(deleteThoughts);

router
.route('/:userId')
.post(createThoughts);

router
.route('/thoughtId/reactions')
.post(createReactions);

router
.route('/thoughtId/reactions/reactionId')
.delete(deleteReactions);

module.exports = router;