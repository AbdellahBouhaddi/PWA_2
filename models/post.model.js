const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    prixAp: {
      type: String,
    },
    prixAv: {
      type: String,
    },
    localisation: {
      type: String,
    },
    numero: {
      type: String,
    },
    TypeProduit: {
      type: String,
    },
    dateexpiration: {
      type: String,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('post', PostSchema)
