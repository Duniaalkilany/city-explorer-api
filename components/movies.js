require('dotenv').config()
const superagent = require('superagent');
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;

const controlMovie=(req,res)=>{
    
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${req.query.query}&limit=8`;

    superagent.get(movieUrl).then(movieData => {
      const movieArray = movieData.body.results.map(mov => new Movie(mov));
      res.send(movieArray);
    })
    .catch(console.error);
}


class Movie {
    constructor(mov) {
      this.title = mov.title;
      this.overview = mov.overview;
      this.average_votes = mov.vote_average;
      this.total_votes = mov.vote_count;
      this.image_url = `https://image.tmdb.org/t/p/w300/${mov.poster_path}`;
      this.popularity = mov.popularity;
      this.released_date = mov.release_date;
     
    }
  }

  module.exports=controlMovie
