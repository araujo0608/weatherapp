import React, { useEffect, useState } from 'react';
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';
//import { getCurrentPositionAsync } from 'expo-location';
import Geolocation from '@react-native-community/geolocation';

import api from '../../../infos';

export default function Current(){
    // == States ==
    const [location, setLocation] = useState(null);
    const [currentDatas, setCurrentDatas] = useState({});
    
    
    // == Functions ==
    async function getLocation(){
        Geolocation.getCurrentPosition(info => console.log(info));
    }

    function createURL(lat, long, apikey){
        // index 0: current, index 1: forecastFiveDays
        return [
            `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${lat},${long}&aqi=yes`,
            `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${lat},${long}&days=4&aqi=yes&alerts=no`
        ]
    }

    async function mountCurrentObj(url){
        try {
            const response = await fetch(url);
            const datas = response.json();

            const splitted = String(datas.location.localtime).split(' ');

            console.log(`City: ${datas.location.name}`);
            console.log(`Temp: ${datas.current.temp_c}º`);
            console.log(`${datas.current.condition.text}`);
            console.log(splitted[1].split(':').join('h'));
        } catch (error) {
            console.debug(`[ERROR MOUNTING CURRENT]: ${error.msg}`);
            // maybe set all obj attrb to null ?
        }
    }


    // == Effects ==
    useEffect(() => {
        getLocation();
    }, [])

    return(
        <>
            <Text>City: </Text>
            <Text>Temp: </Text>
            <Text>Condition: </Text>
            <Text>Timezone: </Text>
        </>
    );
}
