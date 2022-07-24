const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
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
    picture: {
      type: String,
      default: './uploads/profil/randomn-user.png',
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
//play function befor save into display : block

userShema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
const UserModel = mongoose.model('user', userShema)
module.exports = UserModel
