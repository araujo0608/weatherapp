import React, { useEffect, useState } from "react";
import { TextInput, Text, StyleSheet, SafeAreaView, Button, View } from "react-native";
import API from "./infos";

export default function App(){


  // == States ==
  const [query, setQuery] = useState('Miami');
  const [currents, setCurrents] = useState({
    city: 'Miami',
    temp: 25,
    cond: 'Ensolarado',
    timezone: '12h00'
  });
 
  // == Functions == 
  async function findLocation(city){
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
        let formatted_timezone = getFormattedLocalTime(weatherapi_datas.location.localtime);

        setCurrents({
          city: datas.name,
          temp: datas.main.temp,
          cond: datas.weather[0].description,
          timezone: formatted_timezone
        });
      } catch (error) {
        console.debug(`WEATHER API ERROR -> ${error}`);
      }

     
    } catch (error) {
      console.debug(`OPENWEATHER API ERROR -> ${error}`);
    }
  }

  function getFormattedLocalTime(unformatted){
    const splitted = String(unformatted).split(' '); 
    const formatted = splitted[1].split(':').join('h');
    return String(formatted);
  }


  // == Effects ==
  useEffect(() => {
    findLocation(query);
  }, [])

  return(
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.search}
        placeholder='Miami'
        value={query}
        onChangeText={text => setQuery(text)}
      />
      <Button title="procurar" onPress={() => findLocation(query)}/>

      <Text>Nome: {currents.city}</Text>
      <Text>Temperatura: {currents.temp}</Text>
      <Text>Condição: {currents.cond}</Text>
      <Text>Horario: {currents.timezone}</Text>

      <View style={styles.forecast}>
        <Text>Next days...</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
    gap: 2
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