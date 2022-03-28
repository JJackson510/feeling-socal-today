const {Users} = require('../models');


const userControllers = {
    getAllUsers(req, res) {
        Users.find({})
        .populate({
            path:'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.error(err)
            res.status(400).json(err);
        });
    },

    getUsersById(req, res) {
        Users.findOne({params}, res)
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user if found with this ID!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.error(err)
            res.status(400).json(err);
        });
    },

    createUser({body}, res) {
        Users.create(body)
        .then(dbUserData => res.josn(dbUserData))
        .catch(err => res.status(400).json(err));
    },

updateUser({params, body}, res) {
    Users.findByIdAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'No user is found with this ID!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
    },

    deleteUser({params}, res) {
        User.findByIdAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user is found with this ID!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
        res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },

    deleteFriend({params}, res) {
        Users.findByIdAndDelete({_id: params.id},)
        .then(dbUsersData =>{
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this particular ID!'})
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    }

};

module.exports =userControllers;


