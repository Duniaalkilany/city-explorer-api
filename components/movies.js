require('dotenv').config()
const superagent = require('superagent');
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;
const Cache =require('./cache')
let cache=new Cache();
cache['data']=[]

const controlMovie=(req,res)=>{
  let query =req.query.query
  
  let movieArray=[]

  if (query){
    if (cache.data.length >0){
      movieArray =cache.data.map(data=>new Movie(data))
      console.log('data come from cache');
      res.send(movieArray)
    }else{ const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${query}&limit=8`;

    superagent.get(movieUrl).then(movieData => {
  movieArray = movieData.body.results.map(mov => new Movie(mov));
     
cache['data']=movieData.body.results
console.log('data come from api');
      res.send(movieArray);
    })
    .catch(console.error);}
    
   
}};


class Movie {
    constructor(mov) {
      this.title = mov.title;
      this.overview = mov.overview;
      this.average_votes = mov.vote_average;
      this.image_url = `https://image.tmdb.org/t/p/w300/${mov.poster_path}`;
      this.popularity = mov.popularity;
      this.released_date = mov.release_date
  
     
    }
  }

  module.exports=controlMovie









// require('dotenv').config()
// const superagent = require('superagent');
// const MOVIE_API_KEY=process.env.MOVIE_API_KEY;
// const inMemory={};
// //  inMemory[timestamp] = Date.now();
// //  console.log( '------------'+inMemory[timestamp] );
// const controlMovie=(req,res)=>{
//   const query=req.query.query
//   const queryParms={
//     api_key:MOVIE_API_KEY,
//     query:query
//   }
    
//     const movieUrl = `https://api.themoviedb.org/3/search/movie?limit=8`;

//     superagent.get(movieUrl).query(queryParms).then(movieBitData => {
//       if (inMemory[query]!==undefined ) {
//         console.log('cache hit movie') 
//         res.send(inMemory[query])      
//       } else {
//         const movieArray = movieBitData.body.results.map(mov => new Movie(mov));
//         console.log(`cache miss mmovie`);
//         inMemory[query]=movieArray
//         res.send(movieArray);
//       }
//     }).catch(console.error);
// }
// class Movie {
//     constructor(mov) {
//       this.title = mov.title;
//       this.poster = mov.poster_path;
//       this.overview = mov.overview;
//       this.vote_count = mov.vote_count;
//       this.release_date = mov.release_date;
//     }
//   }
//   module.exports=controlMovie
