import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Current from './current'
import Search from './search';

const Tab = createBottomTabNavigator();

export default function Routes(){
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
          }} 
        >
          <Tab.Screen name="Current" component={Current}/>
          <Tab.Screen name="Search" component={Search}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
}
  