const {Schema, model, Types} = require('mongoose');
const time = require('moment'); 

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => time(createdAtValue).format('MMM dd, YYYY [at] hh:mm a')
        }
    }
    );

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength:280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => time(createdAtValue).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reaction: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
const Thoughts = model('Thoughts',ThoughtSchema );

module.exports = Thoughts

