const mongoose = require("mongoose");

const postSchema  = new mongoose.Schema({
    title: { String, required: true}
    description: String,
    keywords: String,
    pic: String, //  required: true}
    comments: [Object]
});

module.exports = mongoose.model("posts", postSchema);
