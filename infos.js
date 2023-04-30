const API = {

    openweather: {
        key: `c09a27e9c4aa9a7b40bca0d5825ae254`
    },
    
    weatherapi: {
        key: `d0a34f1fdda74dce95a141845231904`
    },

    request:{
        search: `https://api.openweathermap.org/data/2.5/weather?q=Miami&lang=pt_br&appid=c09a27e9c4aa9a7b40bca0d5825ae254&units=metric`,
        getLocation: `https://api.openweathermap.org/data/2.5/forecast?q=mogi%20guacu&appid=c09a27e9c4aa9a7b40bca0d5825ae254`,
        forecastFiveDays: `https://api.weatherapi.com/v1/forecast.json?key=d0a34f1fdda74dce95a141845231904&q=-22.35,-46.92&days=5&aqi=yes&alerts=no`
    }
   
}

export default API;