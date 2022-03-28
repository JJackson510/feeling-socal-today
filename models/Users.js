const {Schema, model} = require('mongoose');

const UserShema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        },
        email: {
            type: String,
            required: true,
            unique: true,
            required: true,
            match: [/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts:[{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }]
    },
    {
        toJSON:{
            virtuals: true,
            getters: true
        },
        id: false
    } 
);

UserShema.virtual('friendCount').get(function() {
    return this.friends.length;
})
const User = model('User', UserShema);

module.exports = User;