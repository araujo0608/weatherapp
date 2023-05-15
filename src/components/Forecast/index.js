import React from 'react';
import { View, Text } from 'react-native';
import styles from '../Forecast/styles';

const Forecast = (props) => {
    const forecast = props.fore

    return(
      <>
        {
          forecast.map((day, index) => (
            <View key={index} style={{flexDirection: 'row'}}>
              <Text>{day.dayOfWeek} </Text>
              <Text>{day.temp}</Text>
            </View>
        ))}
      </>
    )
}

export default Forecast;