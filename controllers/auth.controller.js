const UserModel = require('../models/user.models')

module.exports.singUp = async (req, res) => {
  console.log(req.body)
  const { psuedo, email, password } = req.body

  try {
    const user = await UserModel.create({ psuedo, email, password })
    res.status(201).json({ user: user._id })
  } catch (err) {
    res.status(200).send({ err })
  }
}
