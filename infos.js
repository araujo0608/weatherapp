const api = {
    key: `d0a34f1fdda74dce95a141845231904`,
    lat: -22.354840,
    long: -46.929440,
    request:{
        current: `http://api.weatherapi.com/v1/current.json?key=d0a34f1fdda74dce95a141845231904&q=-22.35,-46.92&aqi=yes`,
        forecastFiveDays: `https://api.weatherapi.com/v1/forecast.json?key=d0a34f1fdda74dce95a141845231904&q=-22.35,-46.92&days=5&aqi=yes&alerts=no`
    }
   
}

export default api;