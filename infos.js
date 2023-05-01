const API = {

    openweather: {
        key: `9d33ad3a54842e5c069da472d1db3091`
    },
    
    weatherapi: {
        key: `d0a34f1fdda74dce95a141845231904`
    },

    request:{
        search: `https://api.openweathermap.org/data/2.5/weather?q=Miami&lang=pt_br&appid=9d33ad3a54842e5c069da472d1db3091&units=metric`,
        getLocation: `https://api.openweathermap.org/data/2.5/forecast?q=mogi%20guacu&appid=c09a27e9c4aa9a7b40bca0d5825ae254`,
        forecastFiveDays: `https://api.weatherapi.com/v1/forecast.json?key=d0a34f1fdda74dce95a141845231904&q=-22.35,-46.92&days=5&aqi=yes&alerts=no`
    }
   
}

export default API;