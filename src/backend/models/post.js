const mongoose = require("mongoose");

const postSchema  = new mongoose.Schema({
    title: String,
    description: String,
    keywords: String,
    pic: String,
    comments: [Object]
});

module.exports = mongoose.model("posts", postSchema);