const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setupt static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Daniel Sousa'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Daniel Sousa'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Daniel Sousa',
    description: 'This is the help page'
  })
})
// this method receives a route (in this case, empty means root address)
// and a callback with the request and the response
// app.get('', (req, res) => {
//   res.send('<h1>Weather</h1>')
// })
//danielsousahome.com       -> this is the root address
//danielsousahome.com/help  -> these are routes
//danielsousahome.com/about -> these are routes

app.get('/weather', (req, res) => {

  if (!req.query.address){
    return res.send({
      error: 'You must provide an address.'
    })
  }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if (error){
        return res.send({error})
      }

      forecast(latitude, longitude, (error, forecastData) => {
          if (error){
            return res.send({error})
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          })
      })
    })
})




app.get('/products', (req, res) => {
  if (!req.query.search){
    return res.send({
      error: 'You must provide a search term.'
    })
  }
  console.log(req.query)
  console.log(req.query.search)
  res.send(
  {
    products: []
  })
})

app.get('/help/*', (req, res) => {
    res.render('help404', {
      title: '404',
      name: 'Daniel Sousa',
      errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
      title: '404',
      name: 'Daniel Sousa',
      errorMessage: 'Page not found'
    })
})

// This starts the server- takes a port. Port 3000 is a commun dev port
app.listen(3000, () => {
  console.log('Server is up on port 3000');
})
