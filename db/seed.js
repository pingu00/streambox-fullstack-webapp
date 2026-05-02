const { MediaItem, User } = require("./models");

const populateDatabase = async () => {

  // create users
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    console.log("NOTE:  User collection is empty or does not exist")
    await User.insertMany([
      { email: "peter@gmail.com", password: "1111", isAdmin: true, firstName: "Peter", lastName: "Smith" },
      { email: "jane@gmail.com", password: "1111", isAdmin: false, firstName: "Jane", lastName: "Patel" },
    ])
    console.log("NOTE: User Collection created")
  } else {
    console.log("NOTE: User Collection already has data, so skipping")
  }

  // create media items

  const mediaItemsCount = await MediaItem.countDocuments()

  if (mediaItemsCount === 0) {
    console.log("NOTE: MediaItem collection is empty or does not exist");

    const initialMediaItems = [
      {
        title: "Inception",
        synopsis: "A master thief who extracts secrets from dreams is tasked with the impossible: planting an idea. As he descends into the subconscious, his own haunting past threatens to collapse the mission.",
        category: "Sci-Fi",
        rating: 8.8,
        stars: 5,
        smallPosterImage: "https://image.tmdb.org/t/p/w300/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        rentalPrice: 4.99,
        purchasePrice: 14.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        isMovie: true,
        isFeatured: true
      },
      {
        title: "Interstellar",
        synopsis: "With Earth on the brink of extinction, a team of explorers travels through a wormhole to find a new home for humanity, testing the limits of time, space, and a father's love.",
        category: "Sci-Fi",
        rating: 8.6,
        stars: 5,
        smallPosterImage: "https://www.themoviedb.org/t/p/w1280/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/ln2Gre4IYRhpjuGVybbtaF4CLo5.jpg",
        rentalPrice: 4.99,
        purchasePrice: 16.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        isMovie: true,
        isFeatured: true
      },
      {
        title: "The Dark Knight",
        synopsis: "Gotham’s silent guardian faces his greatest test when the Joker, a mastermind of chaos, pushes the city toward total anarchy, forcing Batman to choose between justice and survival.",
        category: "Action",
        rating: 9.0,
        stars: 5,
        smallPosterImage: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/gCXqGU0TpsLr6NJrCPU5J3rmxRs.jpg",
        rentalPrice: 3.99,
        purchasePrice: 12.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
        isMovie: true,
        isFeatured: true
      },
      {
        title: "Avengers: Endgame",
        synopsis: "In the wake of a universal catastrophe, the remaining Avengers assemble for one final stand to undo Thanos's actions and restore balance to the universe, whatever it takes.",
        category: "Action",
        rating: 8.4,
        stars: 4,
        smallPosterImage: "https://image.tmdb.org/t/p/w300/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
        rentalPrice: 4.99,
        purchasePrice: 18.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        isMovie: true,
        isFeatured: true
      },
      {
        title: "Black Panther",
        synopsis: "Following his father's death, T'Challa returns to the hidden, high-tech nation of Wakanda to claim the throne, only to face a powerful enemy that threatens the entire world.",
        category: "Action",
        rating: 7.3,
        stars: 4,
        smallPosterImage: "https://image.tmdb.org/t/p/w300/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
        rentalPrice: 3.99,
        purchasePrice: 14.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=xjDjIWPwcPU",
        isMovie: true,
        isFeatured: true
      },
      {
        title: "Breaking Bad",
        synopsis: "A mild-mannered chemistry teacher diagnosed with terminal cancer transforms into a ruthless kingpin of the methamphetamine trade to secure his family's financial future.",
        category: "Drama",
        rating: 9.5,
        stars: 5,
        smallPosterImage: "https://image.tmdb.org/t/p/w300/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/yXSzo0VU1Q1QaB7Xg5Hqe4tXXA3.jpg",
        rentalPrice: 2.99,
        purchasePrice: 29.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=HhesaQXLuRY",
        isMovie: false,
        isFeatured: true
      },
      {
        title: "Attack on Titan",
        synopsis: "In a world where humanity is caged behind walls to escape man-eating giants, a young soldier vows to reclaim the world after a catastrophic breach shatters a century of peace.",
        category: "Anime",
        rating: 9.1,
        stars: 5,
        smallPosterImage: "https://www.themoviedb.org/t/p/w1280/6oKXmDiGhbCfaZKPjWCpMSfG9SH.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/yvKrycViRMQcIgdnjsM5JGNWU4Q.jpg",
        rentalPrice: 2.99,
        purchasePrice: 24.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=MGRm4IzK1SQ",
        isMovie: false,
        isFeatured: false
      },
      {
        title: "Crash Landing on You",
        synopsis: "A paragliding mishap drops a South Korean billionaire heiress into the North Korean DMZ, where she finds unexpected protection and love in the arms of an elite army officer.",
        category: "Romance",
        rating: 8.7,
        stars: 5,
        smallPosterImage: "https://www.themoviedb.org/t/p/w1280/fgBNLPr6mC8pxuR79ENAJY4nBmj.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/o3Htmlg6BfNs8Ew7yjsRzVnYSEs.jpg",
        rentalPrice: 2.99,
        purchasePrice: 21.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=GVQGWgeVc4k",
        isMovie: false,
        isFeatured: true
      },
      {
        title: "The Simpsons",
        synopsis: "A sharp, satirical look at the chaotic lives of a dysfunctional working-class family navigating the absurdities of modern American culture in the town of Springfield.",
        category: "Comedy",
        rating: 8.6,
        stars: 4,
        smallPosterImage: "https://image.tmdb.org/t/p/w300/zLudbPueg8CxGhMS2tyDh3p0TdK.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/8HHJUncPJ30rmYAuSRYjHpz2B3R.jpg",
        rentalPrice: 1.99,
        purchasePrice: 19.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=HRV6tMR-SSs",
        isMovie: false,
        isFeatured: true
      },
      {
        title: "Jaws",
        synopsis: "When a predatory great white shark begins terrorizing a seaside resort town, a police chief, a scientist, and a grizzled hunter embark on a perilous mission to kill the beast.",
        category: "Thriller",
        rating: 8.1,
        stars: 4,
        smallPosterImage: "https://media.themoviedb.org/t/p/w188_and_h282_face/tjbLSFwi0I3phZwh8zoHWNfbsEp.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/xHC2eth7sIV18XFPdSiDCzPCYst.jpg",
        rentalPrice: 3.99,
        purchasePrice: 11.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=U1fu_sA7XhE",
        isMovie: true,
        isFeatured: false
      },
      {
        title: "Squid Game",
        synopsis: "Desperate, debt-ridden individuals are lured into a mysterious survival tournament where childhood games turn into a lethal struggle for a massive cash prize.",
        category: "Thriller",
        rating: 8.0,
        stars: 4,
        smallPosterImage: "https://image.tmdb.org/t/p/w300/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/87mebbBtoWzHV0kILgV6M7yIfun.jpg",
        rentalPrice: 2.99,
        purchasePrice: 22.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=oqxAJKy0ii4",
        isMovie: false,
        isFeatured: true
      },
      {
        title: "Black Mirror",
        synopsis: "A haunting anthology series that peels back the curtain on the dark, unintended consequences of advanced technology and its unsettling impact on human nature.",
        category: "Sci-Fi",
        rating: 8.8,
        stars: 5,
        smallPosterImage: "https://www.themoviedb.org/t/p/w1280/seN6rRfN0I6n8iDXjlSMk1QjNcq.jpg",
        largePosterImage: "https://image.tmdb.org/t/p/original/sd6NuPEHQxa7rd8NRx6DlgYthCw.jpg",
        rentalPrice: 2.99,
        purchasePrice: 24.99,
        youtubeTrailerLink: "https://www.youtube.com/watch?v=jDiYGjp5iFg",
        isMovie: false,
        isFeatured: true
      }
    ]

    await MediaItem.insertMany(initialMediaItems);
    console.log("NOTE: MediaItem collection created");
  } else {
    console.log("NOTE: MediaItem collection already has data, so skipping");
  }
}

module.exports = {
  populateDatabase
};