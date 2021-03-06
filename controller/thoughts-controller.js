const {Thoughts, Users} = require('../models');

const thoughtsController = {
    createThoughts({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(Data => {
            if(!Data) {
                res.status(404).json({message: 'No thoughts with this ID!'});
                return;
            }
            res.json(Data)
        })
        .catch(err => res.json(err)); 
    },

    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .sort({_id: -1})
        .then(Data => res.json(Data))
        .catch(err => {
            console.error(err);
            res.send(500).json(err);
        });
    },

    getThoughtsById({params}, res) {
        Thoughts.findOne({_id: params.id})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(Data => {
            if(!Data) {
                res.status(404).json({message: 'No thoughts with this ID!'})
            }
            res.json(Data)
        })
        .catch(err => {
            console.error(err);
            res.status.json(err);
        });
    },

    updateThoughts({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(Data => {
            if (!Data) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
                res.json(Data);
        })
        .catch(err => res.json(err));
    },

    deleteThoughts({params}, res) {
        Thoughts.findOneAndDelete({_id: params.id})
        .then(Data => {
            if (!Data) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(Data);
            })
            .catch(err => res.status(400).json(err));
    },

    
    createReactions({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(Data => {
        if (!Data) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(Data);
        })
        .catch(err => res.status(400).json(err))

    },

    //test
    deleteReactions({params}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(Data => {
            if (!Data) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(Data);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports =thoughtsController;