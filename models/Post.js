const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    responses: [{
        type: Schema.Types.ObjectId,
        ref: "Response"
    }],
    flag_author_type: [student, teacher],
    isPublic: Boolean,
    data: String
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;