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
        forecastThreeDays: `http://api.weatherapi.com/v1/forecast.json?key=d0a34f1fdda74dce95a141845231904&q=London&days=3&aqi=no&alerts=no
`
    }
   
}


export default API;

/**
 *  const portuguese_weekdays = new Array(
    'Domingo', 
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  );

  const api_date = moment('2023-09-06', "YYYY-MM-DD", "pt", true);
  console.log(portuguese_weekdays[api_date.get('day')]);
 */