import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/pages/home';
import Search from './src/pages/search';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false
          }} 
        >
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="Search" component={Search}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}
