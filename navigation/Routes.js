import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';


import RootStackScreen from '../screens/RootStackScreen';

const Routes = () => {

  return (
    <NavigationContainer>
      <RootStackScreen/>
    </NavigationContainer>
  );
};

export default Routes;