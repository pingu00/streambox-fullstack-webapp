const mongoose = require('mongoose')

// Model for a media item
const mediaItemSchema = new mongoose.Schema({
  title: String,
  synopsis: String,
  category: String,
  rating: Number,
  stars: Number,
  smallPosterImage: String,
  largePosterImage: String,
  rentalPrice: Number,
  purchasePrice: Number,
  youtubeTrailerLink: String,
  isMovie: Boolean,
  isFeatured: Boolean
})

const MediaItem = mongoose.model("mediaItems", mediaItemSchema)

// Model for a user
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: Boolean,
  firstName: String,
  lastName: String,
})
const User = new mongoose.model("users", userSchema)




const purchaseSchema = new mongoose.Schema({
  price: Number,
  mediaId: String,
  userId: String
})
const Purchase = new mongoose.model("purchases", purchaseSchema)

module.exports = { MediaItem, User, Purchase }