import React, { useEffect, useState } from 'react';
import Routes from './src/screens/routes';
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import { Modal, View, Text, Pressable } from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');


export default function App() {

  // == States ==
  const [showPages, setShowPages] = useState(true);
  const [ask, setAsk] = useState(false);


  // == Function ==

  function NotWorksModal(){
    return(
     <View>
      <Modal
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      animationType='slide'
      visbible={true}
      transparent={true}
      >
        <Pressable onPress={() => setAsk(!ask)} style={{backgroundColor: 'gray', padding: 1, flex: 1}}>
          <Text>
            Permission to access location was denied
          </Text>
        </Pressable>
      </Modal>
      </View>
    );
  }

  async function askPermission(){
    let { status } = await requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== 'granted'){ // user denied acess
      setShowPages(false);
      return;
    }
    setShowPages(true);
  }

  // == Effects ==
  useEffect(() => {
    askPermission();
  }, [ask])

  return (
    <>
      {showPages ? <Routes/> : <NotWorksModal />}
    </>
  );
}
