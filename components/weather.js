const weather=require('../data/weather.json')
require('dotenv').config()
const WEATHER_API_KEY=process.env.WEATHER_API_KEY;
const superagent = require('superagent');

const controlWeather=(req,res)=>{
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    
      
    superagent.get(weatherUrl).then(weatherData => {
      const arrOfData = weatherData.body.data.map(data => new Weather(data));
          res.send(arrOfData);
          if(arrOfData===0){res.status(500).send('Something went wrong')}
    }).catch(error=>res.send( error));
  
  
};


class Weather{
    constructor(weth){
      this.description=weth.weather.description,
      this.date=weth.valid_date
      
    }
  }
  module.exports=controlWeather