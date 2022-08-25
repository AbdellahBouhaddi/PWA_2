const UserModel = require('../models/user.models')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password ')

  res.status(200).json(users)
}

user: String

module.exports.userInfo = async (req, res) => {
  // console.log(req.params)
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID Unknown : ' + req.params.id)
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs)
    else console.log('ID unknown ' + err)
  }).select('-password')
}

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID Unknown : ' + req.params.id)
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs)
        if (err) return res.status(500).send({ message: err })
      }
    ).clone()
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID Unknown : ' + req.params.id)
  try {
    await UserModel.remove({ _id: req.params.id }).exec()
    res.status(200).json({ message: 'seccesfully deleted. ' })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.send(docs)
        else return res.status(500).json(err)
      }
    ).clone()
    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs)
        if (err) return res.status(500).json(err)
      }
    ).clone()
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idTounFollow)
  )
    return res.status(400).send('ID Unknown : ' + req.params.id)
  try {
    // remove from the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idTounFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.send(docs)
        else return res.status(500).jsos(err)
      }
    ).clone()
    // remove from following list
    await UserModel.findByIdAndUpdate(
      req.body.idTounFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs)
        if (err) return res.status(500).jsos(err)
      }
    ).clone()
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}
