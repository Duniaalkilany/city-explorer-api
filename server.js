const express = require('express') // require the express package
//
const app = express() // initialize your express app instance
require('dotenv').config();//before const PORT

const PORT = process.env.PORT ||8000;//this is so it does not break in heroku build out
const cors = require('cors');
app.use(cors()) 



// a server endpoint 

app.get('/', (req, res) =>{
   res.send('Hello World')});

app.get('/weather', (req, res) =>{ 

let lat =req.query.lat
let lon = req.query.lon
let searchQuery=req.query.searchQuery


let findData=()=>{

  let city =weather.find((city,idx)=>{
    return city.city_name.toLowerCase()===searchQuery.toLocaleLowerCase() && city.lat===Number(lat) && city.lon===Number(lon) })



return city.data.map(item=>{
  return new ForeCast(item)
})}

res.json(findData());



});











class ForeCast {
  constructor(weatherData){
    this.date=weatherData.valid_date;
    this.description=weatherData.weather.description
    this.city_name=weatherData.city_name
  }
}




app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));