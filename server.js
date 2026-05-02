const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  // random string, used to generate and encrypt a unique session id
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))



const { populateDatabase } = require("./db/seed");
const { MediaItem, User, Purchase } = require("./db/models");


app.get("/", async function (req, res) {

  const session = req.session;
  const featuredMovies = await MediaItem.find({ isMovie: true, isFeatured: true });
  const featuredTvShows = await MediaItem.find({ isMovie: false, isFeatured: true });
  const topRatedMedia = await MediaItem.find().sort({ rating: -1 }).limit(7);

  return res.render("home.ejs", { featuredMovies, featuredTvShows, topRatedMedia, session });
});

app.get("/movies", async function (req, res) {

  const session = req.session;
  const movies = await MediaItem.find({ isMovie: true });

  return res.render("movie-listing.ejs", { movies, session });
});

app.get("/tv-shows", async function (req, res) {

  const session = req.session;
  const tvShows = await MediaItem.find({ isMovie: false });

  return res.render("tvshow-listing.ejs", { tvShows, session });
});

//----------------Media Detail------------------//

app.get("/media/:idMediaItem", async function (req, res) {

  const session = req.session;
  const mediaItem = await MediaItem.findById(req.params.idMediaItem);

  if (req.session.currUser === undefined) {
    return res.send("you don't have Authorization");
  }

  if (mediaItem === null) {
    return res.redirect("/");
  }
  return res.render("media-details.ejs", { mediaItem, session });
});

//--------------------Creat----------------------//
app.get("/create-media", function (req, res) {

  const session = req.session;

  if (session.currUser !== undefined && session.currUser.isAdmin === true) {
    return res.render("create-media.ejs", { session });
  } else {
    return res.send("you don't have Authorization");
  }

});

app.post("/create-media", async function (req, res) {

  if (req.session.currUser === undefined || req.session.currUser.isAdmin === false) {
    return res.send("you don't have Authorization");
  }

  await MediaItem.create({
    title: req.body.title,
    synopsis: req.body.synopsis,
    category: req.body.category,
    rating: Number(req.body.rating),
    stars: Number(req.body.stars),
    smallPosterImage: req.body.smallPosterImage,
    largePosterImage: req.body.largePosterImage,
    rentalPrice: Number(req.body.rentalPrice),
    purchasePrice: Number(req.body.purchasePrice),
    youtubeTrailerLink: req.body.youtubeTrailerLink,
    isMovie: req.body.cbIsMovie === 'on',
    isFeatured: req.body.cbIsFeatured === 'on'
  });

  return res.redirect("/");
});
//-----------------------Edit and Delete------------------//

app.get("/media/edit/:idToEdit", async function (req, res) {

  const session = req.session;
  const mediaItem = await MediaItem.findById(req.params.idToEdit);

  if (mediaItem === null) {
    return res.redirect("/");
  }
  if (session.currUser !== undefined && session.currUser.isAdmin === true) {
    return res.render("edit-form.ejs", { mediaItem, session });
  } else {
    return res.send("you don't have Authorization");
  }
});

app.post("/media/edit/:idToEdit", async function (req, res) {

  if (req.session.currUser === undefined || req.session.currUser.isAdmin === false) {
    return res.send("you don't have Authorization");
  }

  await MediaItem.findByIdAndUpdate(req.params.idToEdit, {
    title: req.body.title,
    synopsis: req.body.synopsis,
    category: req.body.category,
    rating: Number(req.body.rating),
    stars: Number(req.body.stars),
    smallPosterImage: req.body.smallPosterImage,
    largePosterImage: req.body.largePosterImage,
    rentalPrice: Number(req.body.rentalPrice),
    purchasePrice: Number(req.body.purchasePrice),
    youtubeTrailerLink: req.body.youtubeTrailerLink,
    isMovie: req.body.cbIsMovie === 'on',
    isFeatured: req.body.cbIsFeatured === 'on'
  });

  return res.redirect(`/media/${req.params.idToEdit}`)
});

app.get("/media/delete/:idToDelete", async function (req, res) {

  const session = req.session;

  if (session.currUser !== undefined && session.currUser.isAdmin === true) {
    await MediaItem.findByIdAndDelete(req.params.idToDelete);
    return res.redirect("/");
  } else {
    return res.send("you don't have Authorization");
  }
});

// ----------------------- Endpoints for user accounts----------------------//

app.get("/users/login", function (req, res) {

  if (req.session.currUser !== undefined) {
    if (req.session.currUser.isAdmin === true) {
      return res.redirect("/users/admin/dashboard");
    } else {
      return res.redirect("/users/customer/dashboard");
    }
  } else {
    return res.render("login.ejs", { msg: "" })
  }
})

app.post("/users/login", async function (req, res) {

  const userFromDb = await User.findOne({ email: req.body.email, password: req.body.password })

  if (userFromDb === null) {
    return res.render("login.ejs", { msg: "Sorry, wrong username or password" })
  } else {

    req.session.currUser = userFromDb

    if (req.session.currUser.isAdmin === true) {
      return res.redirect("/users/admin/dashboard");
    } else {
      return res.redirect("/users/customer/dashboard");
    }
  }
})

app.get("/users/logout", function (req, res) {

  req.session.destroy();

  return res.redirect("/");
})


// ------------------------ Endpoints for customer dashboard

app.get("/users/customer/dashboard", function (req, res) {

  if (req.session.currUser === undefined) {

    return res.send(`You must be logged in to view this page! <a href="/users/login">Go Login</a>`)
  } else {
    if (req.session.currUser.isAdmin === true) {

      return res.send(`Sorry, only customers can view this page.  <a href="/users/logout">Logout and log back in as a customer</a>`)
    } else {
      return res.render("customer-dashboard.ejs", { session: req.session })
    }
  }
})
// ------------------------ Endpoints for admin functionality

app.get("/users/admin/dashboard", function (req, res) {

  if (req.session.currUser === undefined) {

    return res.send(`You must be logged in to view this page! <a href="/users/login">Go Login</a>`)
  } else {
    if (req.session.currUser.isAdmin === false) {
      return res.send(`Sorry, only admin can view this page.  <a href="/users/logout">Logout and log back in as a admin</a>`)
    } else {
      return res.render("admin-dashboard.ejs", { session: req.session })
    }
  }
})


//--------------Purchase---//

app.get("/purchase/:mediaId/:userId", async function (req, res) {
  
  if (req.session.currUser === undefined) {
    return res.send(" you don't have authorize")
  }

  const mediaItem = await MediaItem.findOne({_id: req.params.mediaId});
  const userFromDb = await User.findOne({_id: req.params.userId});

  await Purchase.insertMany([
    { price: mediaItem.purchasePrice, mediaId: req.params.mediaId, userId: req.params.userId }
  ])


  return res.redirect(`/media/${req.params.mediaId}`);

})



const PORT = 4000;
async function startServer() {
  try {
    // +++ 5a. Attempt to connect to the database using the database connection information you defined in step #2
    await mongoose.connect(process.env.MONGODB_URI);

    // +++ 5b. If tables do not exist in the db, then Mongo will automatically create them

    // +++ 5c. Prepopulate your collections with some data
    await populateDatabase();

    // +++ 5c.  If db connection successful, output success messages. If fail, go to 5d.
    console.log("SUCCESS connecting to MONGO database");
    console.log("STARTING Express web server");

    // +++ 5d.  At this point, db connection should be successful, so start the web server!
    app.listen(PORT, () => {
      console.log(`server listening on: http://localhost:${PORT}`);
    })
  }
  // +++ 5d. The catch block executes if the app fails to connect to the database     
  catch (err) {
    console.log("ERROR: connecting to MONGO database");
    // +++ 5e. Output the specific error message
    console.log(err);
    console.log("Please resolve these errors and try again.");
  }
}
// +++ 6. Execute the function
startServer();