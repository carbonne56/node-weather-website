
const request = require('request')


const forecast = (latitude, longitude, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=99fdabd505c6d40d4086dc6308a70f7f&query=' + latitude + ',' + longitude

  request({url, json: true}, (error, {body}) => {
    if (error){
      callback("unable to connect to weather services", undefined)
    } else if (body.error) {
      callback("Unable to find location", undefined)
    } else {
      callback(undefined, body.current.weather_descriptions[0] + '. Its currently ' + body.current.temperature + ' out. It feels like ' +
        body.current.feelslike
      )
    }
  })
}

module.exports = forecast;
