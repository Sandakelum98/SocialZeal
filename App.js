import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RootStackScreen from './screens/RootStackScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
  
        <RootStackScreen/>

    </NavigationContainer>
    
  //   <View>
  //     <Text>Hello</Text>
  // </View>
  );

}

export default App;