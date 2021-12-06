import React, {useEffect} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import CreateProfileScreen from './CreateProfileScreen';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';

import DashboardScreen from './DashboardScreen';
import Routes from '../navigation/Routes';

import AuthDetails from '../navigation/AuthDetails';

const RootStack = createStackNavigator();

// const user = global.userId;
var user = "";



const RootStackScreen = ({ navigation }) => {

    useEffect(() => {
        console.log('useEffect Working ! - start');

        //getLoggedUser();

        try {
            AsyncStorage.getItem('loggedUser').then((auth) => {
                // console.log('user details ' + auth);
                // global.authDetails = auth;
                // console.log('user id ' + auth.additionalUserInfo);

                if(auth != null) {

                    // const freshUser = JSON.parse(auth);
                    // console.log('user details ' + freshUser.user);

                    // const jsonObj = new JSONObject(auth);
                    // const user = jsonObj.getJSONObject("user");
                    console.log('xxxxxxx ' + auth);
                    user = auth;
                    console.log('variable ' + user);
                    console.log('variable length ' + user.length);
                }
            })
        } catch (e) {
            console.log('Can not Get data from async ')
        }
        
          

        console.log('useEffect Working ! - end ');
    }, [RootStackScreen])

    //GET USER FROM ASYNC STORAGE
    const getLoggedUser = async () => {
        try {
            AsyncStorage.getItem('loggedUser').then((user) => {
                console.log('user details ' + user);
            })
        } catch (e) {
            console.log('Can not Get data from async')
        }
    }

    return (
    <RootStack.Navigator
        screenOptions = {{
            headerShown: false
        }}
    >
        
        {user.length <= 0 ? <RootStack.Screen name="SplashScreen" component={SplashScreen}/> : <RootStack.Screen name="DashboardScreen1" component={DashboardScreen}/>}
        {/* <RootStack.Screen name="SplashScreen" component={SplashScreen}/> */}
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="DashboardScreen" component={DashboardScreen}/>
        <RootStack.Screen name="CreateProfileScreen" component={CreateProfileScreen}/>
    </RootStack.Navigator>

    // <View>
    //   <Text>Root Stack Screen</Text>
    // </View>
    );
}

export default RootStackScreen;
