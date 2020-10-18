console.log('Client side javascript loaded')

// fetch API      - fetch
// promisses API  - then



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value

messageOne.textContent = "Loading..."
messageTwo.textContent = ""

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {

      if (data.error){
        console.log(data.error)
        messageOne.textContent = data.error

      }
      else {
        const {forecast, location, address} = data
        console.log(location)
        console.log(forecast)
        messageOne.textContent = location
        messageTwo.textContent = forecast
      }

    })
  })

  console.log(location);
})
