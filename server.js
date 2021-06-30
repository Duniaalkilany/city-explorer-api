const express = require('express') // require the express package
const weather=require('./data/weather.json')
const app = express() // initialize your express app instance
require('dotenv').config();//before const PORT

const PORT = process.env.PORT ;//this is so it does not break in heroku build out
const cors = require('cors');
app.use(cors()) 



// a server endpoint 

app.get('/', (req, res) =>{
   res.send('Hello World')});

app.get('/weather', (req, res) =>{ 

let lat =req.query.lat
 let lon = req.query.lon
let searchQuery=req.query.searchQuery
console.log(lat);
console.log(lon);
console.log(searchQuery);
try{
 let findData=()=>{

  let city =weather.find((city,idx)=>{
    return city.city_name.toLowerCase()===searchQuery.toLowerCase() && city.lat===Number(lat) && city.lon==Number(lon)})

 return city.data.map(item=>{
   return new ForeCast(item)
 })}

 res.json( findData())
   
}catch(err){

res.status(500)
res.send('Error :something went wrong !!')



}

 });











 class ForeCast {
   constructor(weathInfo){
    this.date=weathInfo.valid_date;
    this.description=weathInfo.weather.description
    // this.city_name=weathInfo.city_name
  }
};




app.listen(PORT, () => 
{console.log(`server is listening on port ${PORT}`)
console.log(PORT);})

// && city.lat===Number(lat) && city.lon===Number(lon) 