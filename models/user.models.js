const mongoose = require('mongoose')
const { isEmail } = require('validator')
const userShema = new mongoose.Schema(
  {
    psuedo: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
      unique: true,
    },
    bio: {
      type: String,
      maxlength: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
    comments: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)

const UserModel = mongoose.model('user', userShema)
module.exports = UserModel
