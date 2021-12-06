import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

import HomeScreen from './HomeScreen';
import FriendsScreen from './FriendsScreen';
import AddPostScreen from './AddPostScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';


const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();


const DashboardScreen = ({ tabNavigation}) => (
    <Tab.Navigator 
    screenOptions={{ 
      headerShown: false, 
      tabBarHideOnKeyboard: true
    }}
    >

      <Tab.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
            // headerStyle: {
            //     shadowColor: '#fff',
            //     elevation: 0,
            //   },
            //   headerRight: () => (
            //     <View style={{marginRight: 10}}>
            //       <FontAwesome5.Button
            //         name="plus"
            //         size={22}
            //         backgroundColor="#fff"
            //         color="#2e64e5"
            //         onPress={() => console.log('Add Post')}
            //       />
            //     </View>
            //   ),
          }}
      
      />
      <Tab.Screen 
        name="Friends" 
        component={FriendsScreen} 
        options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="people-outline" color={color} size={size} />
            ),
          }}
        />
      <Tab.Screen 
        name="AddPost" 
        component={AddPostScreen} 
        options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="add-outline" color={color} size={size} />
            ),
            tabBarLabel:() => {return null},  
            // headerStyle: {
            //     shadowColor: '#fff',
            //     elevation: 0,
            //   },
            //   headerRight: () => (
            //     <View style={{marginRight: 10}}>
            //       <FontAwesome5.Button
            //         name="plus"
            //         size={22}
            //         backgroundColor="#fff"
            //         color="#2e64e5"
            //         onPress={() => console.log('Add Post')}
            //       />
            //     </View>
            //   ),
          }}
      />
      <Tab.Screen 
        name="Notification" 
        component={NotificationScreen} 
        options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="notifications-outline" color={color} size={size} />
            ),
          }}
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />

    </Tab.Navigator>

    // <View>
    //   <Text>Root Stack Screen</Text>
    // </View>
);

export default DashboardScreen;
