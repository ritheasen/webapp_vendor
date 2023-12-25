const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({

    comment: {
        type: String,
    },
    replyComment:{
        type: String,
    },

})

module.exports = mongoose.model("Comment", commentSchema);

