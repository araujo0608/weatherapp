import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Current = (props) => {
  
  const currents = props.cur;

    return(
      <>
        <Text style={styles.txtCity}>Nome: {currents.city}</Text>
        <Text style={styles.txtTemp}>Temperatura: {currents.temp} ºC</Text>
        <Text style={styles.txtCondition}>Condição: {currents.cond}</Text>
        <Text style={styles.txtTimezone}>Horario: {currents.timezone}</Text>
      </>
    )
}

export default Current;