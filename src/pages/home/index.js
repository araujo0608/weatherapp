import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import api from '../../../infos';

import { 
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
 } from 'expo-location';

export default function Home(){

    // == States == 
    const [location, setLocation] = useState(null);
    const [hasGranted, setHasGranted] = useState(null); // user has granted permission? true or false

    const [currentInformation, setCurrentInformation] = useState(null);

    // == Functions == 
    async function getUserPermissionAndLocation(){
        const { granted } =  await requestForegroundPermissionsAsync();
        if (granted){
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
            setHasGranted(true);
            const [currentURL, forecastFiveDaysURL] = createURL(
                location.coords.latitude, location.coords.longitude, api.key
            );
            getCurrent(currentURL);
            /* Display Object Information
            const valuesLocation = Array(location).map((element) => {
                return element
            })
            console.log(element);
            */
        }
        else{
            setHasGranted(false);
        }
    }

    function createURL(lat, long, apikey){
        // index 0: current, index 1: forecastFiveDays
        return [
            `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${lat},${long}&aqi=yes`,
            `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${lat},${long}&days=5&aqi=yes&alerts=no`
        ]
    }

    async function getCurrent(url){
        try{
            const response = await fetch(url);
            const datas = await response.json();
            
            const splitted = String(datas.location.localtime).split(' ');

            console.log(`City: ${datas.location.name}`);
            console.log(`Temp: ${datas.current.temp_c}º`);
            console.log(`${datas.current.condition.text}`);
            console.log(splitted[1].split(':').join('h'));
            
            setCurrentInformation({
                city: `${datas.location.name}`.toUpperCase(),
                temp: `${datas.current.temp_c}º`,
                condition :{
                    text: `${datas.current.condition.text}`
                },
                localtime: String(splitted[1].split(':').join('h'))
            })
        } catch(err){
            console.warn(err.msg);
        }
    }



    // == Effects == 
    useEffect(() => {
        getUserPermissionAndLocation();
    }, [])


    return(
      <>
        {
            hasGranted ?
            <View>
                <Text>Latitude: {location.coords.latitude}</Text>
                <Text>Longitude: {location.coords.longitude}</Text>
                <Text>Cidade: {currentInformation.city}</Text>
                <Text>Temperatura: {currentInformation.temp}</Text>
                <Text>Condição: {currentInformation.condition.text}</Text>
                <Text>Horário: {currentInformation.localtime}</Text>
            </View>      
            :
            <Text>Por favor, nos dê permissão para acessar sua localização!</Text>
        }
        
      </>
    )
}