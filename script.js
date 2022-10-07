
const doc = document.querySelector('body')
const loadText = document.querySelector('.loading')
const mainWeather = document.querySelector(".main-weather")
const weatherDesc = document.querySelector(".weather-description")
const mainTemp = document.querySelector(".main-temp")
const country = document.querySelector(".country p")
const wind = document.querySelector(".wind p")
const windText = document.querySelector(".wind label")
const weatherIcon = document.querySelector(".icon i")
const themeBtn = document.querySelector("button")

themeBtn.addEventListener('click', (e) => {
  doc.classList.toggle('dark-theme')
  if (e.target.textContent === "☀️") {
    themeBtn.textContent = "🌙"
  } else {
    themeBtn.textContent = "☀️"
  }
})

const success =(currentLocation) => {
  for(x in currentLocation) {
    if (x === 'coords') {
      var lat = currentLocation[x].latitude
      var lon = currentLocation[x].longitude
    }
  }
  
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0b2b956b697005a264c7c1a5b7e5ee26`;
  fetchData(api)
}

const error =(err) => {
  console.log(`Error: ${err.message}`)
  switch (err.code) {
    case err.PERMISSON_DENIED:
      doc.innerHTML = 
      `<h2 style="text-align: center; font-size: 2.5rem; margin-top: 20vh;">User denied the request for Geolocation</h2>`
      break;
  
    case err.POSITION_UNAVAILABLE:
      `<h2 style="text-align: center; font-size: 2.5rem; margin-top: 20vh;">Location information unavailable<br>Please turn on your device location</h2>`
      break;
  
    case err.TIMEOUT:
      `<h2 style="text-align: center; font-size: 2.5rem; margin-top: 20vh;">Request timeout</h2>`
      break;
  
    case err.UNKNOWN_ERROR:
      `<h2 style="text-align: center; font-size: 2.5rem; margin-top: 20vh;">An unknown error occured</h2>`
      break;
  
    default:
      break;
  }
}

const getInfo = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')
  } else {
    // console.log('Locating…')
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function fetchData(endpoint) {
  fetch(endpoint)
    .then(res => res.json())
    .then(data => useData(data))
    .catch(() => {
      doc.style.background = 'white'
      doc.style.color = '#111'
      doc.innerHTML = 
      `<h2 style="text-align: center; font-size: 2.5rem; margin-top: 20vh;">Something went wrong
      <br>Make sure your network is stable and try again!<h2>`
    })
}

const tempArr = []

const useData = (data) => {

  const mWth = data.weather[0].main;
  const dWth = data.weather[0].description;
  const temp = data.main.temp;
  tempArr.push(temp)
  let ctry = data.sys.country;
  const windSpeed = data.wind.speed;


  mainWeather.textContent = `${mWth}`
  weatherDesc.textContent = `${dWth}`
  mainTemp.textContent = `${temp} K`
  wind.textContent = `${windSpeed} m/s`
  // windText.textContent = `Wind speed:`
  loadText.remove()
  
  if (ctry === 'NG') {
    ctry = "Nigeria"
    country.textContent = `${ctry}`
  }

  switch (mWth) {

    case "Rain":
      Icon("rain")
      break;
  
    case "Clouds":
      Icon("cloud")
      break;
  
    case "Snow":
      Icon("snow")
      break;
    
    case "Sun":
      Icon("sun")
    break;
  
    default:
      break;
  }

}

function Icon(x) {
  const e = document.createElement('img');
  const path = "./media/"
  if (x === 'rain') {
    e.src = `${path}rain.gif`;
  } else if (x === 'cloud') {
    e.src = `${path}clouds.gif`;
  } else if (x === 'snow') {
    e.src = `${path}snow.gif`;
  } else if (x === 'sun') {
    e.src = `${path}sun.gif`;
  }
  
  weatherIcon.appendChild(e);
}

getInfo()




mainTemp.addEventListener('click', (e) => {
  let kelVal = tempArr[0]
  let degVal = (kelVal - 273.15).toFixed(2)
  let farVal = ((kelVal - 273.15) * 1.8 + 32).toFixed(2)

  if (mainTemp.textContent.includes("K")) {
    mainTemp.textContent = `${degVal} °C`
  } else if (mainTemp.textContent.includes("C")) {
    mainTemp.textContent = `${farVal} °F`
  } else if (mainTemp.textContent.includes("F")) {
    mainTemp.textContent = `${kelVal} K`
  }

})








