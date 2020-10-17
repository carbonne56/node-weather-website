
const request = require('request');



const geocode = (address, callback) => {
  //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGFuaWVsc291c2EiLCJhIjoiY2tnNDE3dDc1MGcxZjJzcjJ3NG84OGE3MyJ9.FgeXEfVMJj1K2VmRvjyvuA'
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGFuaWVsc291c2EiLCJhIjoiY2tnNDE3dDc1MGcxZjJzcjJ3NG84OGE3MyJ9.FgeXEfVMJj1K2VmRvjyvuA'

  request({url, json: true}, (error, {body}) => {
    if (error){
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0){
      console.log("body: " + body)
      for (obj in body){
        console.log("obj: " + obj)
      }

      callback('Unable to find your location', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location:  body.features[0].place_name
      })
    }
  })
}

module.exports = geocode;
