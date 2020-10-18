
const request = require('request')


const forecast = (latitude, longitude, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=99fdabd505c6d40d4086dc6308a70f7f&query=' + latitude + ',' + longitude

  request({url, json: true}, (error, {body}) => {
    if (error){
      callback("unable to connect to weather services", undefined)
    } else if (body.error) {
      callback("Unable to find location", undefined)
    } else {
      callback(undefined, body.current.weather_descriptions[0] + '. Its currently ' + body.current.temperature + ' degrees out and it feels like ' +
        body.current.feelslike + ' degrees. The wind is blowing from ' + getWindDirection(body.current.wind_dir) + ' at a speed of ' + body.current.wind_speed + ' km/h'
      )
    }
  })
}
const getWindDirection = windDirection => {
  switch (windDirection) {
    case 'S': return 'South'
    case 'N': return 'North'
    case 'E': return 'East'
    case 'W': return 'West'
    default: return windDirection
  }
}
module.exports = forecast;
