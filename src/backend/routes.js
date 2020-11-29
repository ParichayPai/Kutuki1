const mongoose = require("mongoose");

const {url} = require("./config/keys");
const Post = require("./models/post");

mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true }, { useFindAndModify: false });

module.exports = (app) => {

    app.post("/api/v1/assets", (req, res) => {
        let IncomingPost = new Post({
            title: req.body["title"],
            description: req.body["description"],
            keywords: req.body["keywords"],
            pic: req.body["pic"],
            comments: req.body["comments"],
        });
        IncomingPost.save().then(data => {
            console.log("post Added");
            res.send(data);
        }).catch(err => {
            throw err;
        });
    })
    // Post.find(id).then((post) => res.send(post)).catch(
    //     res.status(404).send("id is invalid")
    // );

    app.put("/api/v1/assets/:id", (req, res) => {
        let id = req.params.id;
        Post.findOne({_id : id})
            .then(post => Post.updateOne({new: true}, { _id: post._id }, {
                title: req.body["title"],
                description: req.body["description"],
                keywords: req.body["keywords"],
                pic: req.body["pic"],
                comments: req.body["comments"],
            }))
            .then(console.log("post Edited"))
            .catch(err => {
                throw err;
            });    
    });

    app.put("/api/v1/assets/comments/:id", (req, res) => {
        let id = req.params.id;
        let comment = {id:req.body.commentData}

        Post.findOneAndUpdate({_id: id}, {
            $push:{comments: comment}
        },{new: true})
        .then(console.log("comment posted"))
            .catch(err => {
                throw err;
            }); 

        // Post.findOne({_id : id})
        //     .then(post => Post.updateOne({new: true}, { _id: post._id }, {
        //         // title: req.body["title"],
        //         // description: req.body["description"],
        //         // keywords: req.body["keywords"],
        //         // pic: req.body["pic"],
        //         comments: req.body["commentData"],
        //     }))
        //     .then(console.log("comment posted"))
        //     .catch(err => {
        //         throw err;
        //     });    
    });

    app.get('/api/v1/comments/:id', (req, res) => {
        let id = req.params.id;
        Post.find({_id: id}).then((post) => res.send(post.comments))
        .catch(err => console.log(err));
    });

    app.get('/api/v1/assets', (req, res) => {
        Post.find().then((post) => res.send(post));
    });

    app.get('/api/v1/assets/:id', (req, res) => {
        let id = req.params.id;
        Post.find({_id: id}).then((post) => res.send(post)).catch(
            res.status(404).send("id is invalid")
        );
    });

    app.delete("/api/v1/assets/:id", (req, res) => {
        let id = req.params.id;
        Post.deleteOne({_id: id}).then(
            res.send(`Post with id ${id} deleted`)
        );
    });
}
