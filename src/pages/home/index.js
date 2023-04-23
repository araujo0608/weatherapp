import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import api from '../../../infos'

import { 
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
 } from 'expo-location';

export default function Home(){

    const [location, setLocation] = useState(null);
    const [hasGranted, setHasGranted] = useState(null); // user has granted permission? true or false

    async function getUserPermissionAndLocation(){
        const { granted } =  await requestForegroundPermissionsAsync();
        if (granted){
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
            setHasGranted(true);

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
            </View>      
            :
            <Text>Por favor, nos dê permissão para acessar sua localização!</Text>
        }
        
      </>
    )
}