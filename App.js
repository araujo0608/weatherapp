import React, { useEffect, useState, useCallback } from "react";
import { 
  TextInput, Text, StyleSheet, Button, View, Pressable, Keyboard 
} from "react-native";
import API from "./api";
import moment from "moment";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Current from "./src/components/Current";
import Forecast from "./src/components/Forecast";

SplashScreen.preventAutoHideAsync();

export default function App(){

  // == Effects ==
  useEffect(() => {
    findLocation(query);
  }, [])

  // == States ==
  const [query, setQuery] = useState('Miami');
  const [currents, setCurrents] = useState({
    city: 'Miami',
    temp: 25,
    cond: 'Ensolarado',
    timezone: '12h00'
  });
  const [weatherForecast, setWeatherForecast] = useState([]);

  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./src/assets/fonts/Inter/static/Inter-Regular.ttf'),
    'Inter-Medium': require('./src/assets/fonts/Inter/static/Inter-Medium.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
 
  // == Functions == 
  async function findLocation(local){
    const city = getFormattedInputText(local);
    Keyboard.dismiss();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&appid=${API.openweather.key}&units=metric`
    
    try { //request Open API
      const response = await fetch(url);
      const datas = await response.json();
      const coords = {
        long: datas.coord.lon,
        lat: datas.coord.lat
      }
      
      try { // request weatherapi
        const weatherapi_url = `http://api.weatherapi.com/v1/current.json?key=${API.weatherapi.key}&q=${coords.lat},${coords.long}&aqi=no`
        const weatherapi_response = await fetch(weatherapi_url);
        const weatherapi_datas = await weatherapi_response.json();
        let formatted_timezone = formatLocalTime(weatherapi_datas.location.localtime);

        setCurrents({
          city: datas.name,
          temp: datas.main.temp,
          cond: datas.weather[0].description,
          timezone: formatted_timezone
        });

        forecastFrom(datas.name);

      } catch (error) {
        console.debug(`WEATHER API ERROR -> ${error}`);
      }

     
    } catch (error) {
      console.debug(`OPENWEATHER API ERROR -> ${error}`);
    }
  }

  async function forecastFrom(city){
    const url = `http://api.weatherapi.com/v1/forecast.json?key=d0a34f1fdda74dce95a141845231904&q=${city}&days=4&aqi=no&alerts=no`;
        
    try {
        const response = await fetch(url);
        const datas = await response.json();

        const forecastData = datas.forecast.forecastday.map((day) => {
          return {
            dayOfWeek: dayOfTheWeekPortuguese(day.date),
            temp: day.day.avgtemp_c,
          };
        });
        
        setWeatherForecast(forecastData);

    } catch (error) {
        console.debug(`WEATHER API FORECAST ERROR -> ${error}`);
    }
  }

  function formatLocalTime(unformatted){
    const splitted = String(unformatted).split(' '); 
    const formatted = splitted[1].split(':').join('h');
    return String(formatted);
  }

  function dayOfTheWeekPortuguese(date){
    const portuguese_weekdays = new Array(
      'Domingo', 
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado'
    );
    const api_date = moment(date, "YYYY-MM-DD", "pt", true);
    return String(portuguese_weekdays[api_date.get('day')]);
  }
  
  function getFormattedInputText(text){
    text = String(text).trim();
    text = text.replace(/^[^a-zA-ZÀ-Üà-ü]|[^a-zA-ZÀ-Üà-ü ]/g, '');
    return text;
  }


  return(

      <Pressable style={styles.container} onPress={Keyboard.dismiss} onLayout={onLayoutRootView}>
        
        <TextInput style={styles.search}
          placeholder='Miami'
          value={query}
          onChangeText={text => setQuery(text)}
        />
        <Button title="procurar" onPress={() =>  
          findLocation(query)}
          />

        <Current cur={currents}/>

        <View style={styles.forecast}>
          <Forecast fore={weatherForecast}/>
        </View>
      
      </Pressable>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
    gap: 2,
  },
  search:{
    backgroundColor: '#fff',
    textAlign: 'center',
    width: 200,
    borderWidth: 3, 
    borderRadius: 5
  },
  forecast:{
    backgroundColor: 'red',
    marginTop: 5,
    width: 300,
    height: 300
  }
})

