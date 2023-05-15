import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Current = (props) => {
  
  const currents = props.cur;

    return(
      <>
        <Text>Nome: {currents.city}</Text>
        <Text>Temperatura: {currents.temp}</Text>
        <Text>Condição: {currents.cond}</Text>
        <Text>Horario: {currents.timezone}</Text>
      </>
    )
}

export default Current;