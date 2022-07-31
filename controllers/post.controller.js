const postModel = require('../models/post.model')
const PostModel = require('../models/post.model')
const UserModel = require('../models/user.models')

const ObjectID = require('mongoose').Types.ObjectID

module.exports.readPost = (req, res) => {
  postModel.find((err, docs) => {
    if (!err) res.send(docs)
    else console.log('error to find data' + err)
  })
}
module.exports.createPost = async (req, res) => {
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  })

  try {
    const post = await newPost.save()
    return res.status(201).json(post)
  } catch (err) {
    return res.status(400).send(err)
  }
}
module.exports.updatePost = (req, res) => {}
module.exports.deletePost = (req, res) => {}
