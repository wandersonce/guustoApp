import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/pages/main'
import Merchants from './src/pages/merchants'
const Stack = createStackNavigator();

//Here I use routes to navigate between the pages
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" headerMode='none'>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Merchants" component={Merchants} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


/*
                Wanderson Castro
          wandersoncastro@wandersonoc.com
              React-Native  - 2020
*/