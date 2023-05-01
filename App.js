import React, { useEffect, useState } from "react";
import { TextInput, Text, StyleSheet, SafeAreaView, Button } from "react-native";
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
    
    try {
      const response = await fetch(url);
      const datas = await response.json();
      setCurrents({
        city: datas.name,
        temp: datas.main.temp,
        cond: datas.weather[0].description,
        timezone: convertTimezone(datas.timezone)
      });
    } catch (error) {
      console.debug(`API ERROR -> ${error}`);
    }
  }

  function convertTimezone(timezone){
    const dateUTC = new Date('2023-05-01T12:00:00Z');
    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000; // miliseconds
    const offset = timezone - 1000;
    const dateLocal = new Date(dateUTC.getTime() + timezoneOffset + offset);
    return String(dateLocal);
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
  }
})