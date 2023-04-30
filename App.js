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
  async function findLocation(){
    const response = await fetch(API.request.search);
    const datas = await response.json();
    setCurrents({
      city: datas.name,
      temp: datas.main.temp,
      cond: datas.weather[0].description,
      timezone: datas.timezone
    });
  }


  // == Effects ==
  useEffect(() => {
    findLocation();
  })

  return(
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.search}
        placeholder='Tokyo'
        value={query}
        onChangeText={setQuery}
      />
      <Button title="procurar" onPress={findLocation}/>

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