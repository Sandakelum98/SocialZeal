import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ImageBackground} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../node_modules/react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          {/* <StatusBar backgroundColor='#009387' barStyle="light-content"/> */}
          
        <View style={styles.header}>

            <ImageBackground 
                source={require("../assets/geometric-design-7.jpg")} 
                style={styles.bgImg}
                >

                    <Animatable.Text 
                    style={styles.mainTitle}
                    animation="slideInDown"
                    delay={500}
                    duraton="1500"
                    >
                        SocialZeal
                    </Animatable.Text>
                    
            </ImageBackground>

        </View>

        <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
            delay={900}
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Stay connected with everyone!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>

            <TouchableOpacity onPress={()=>navigation.replace('SignInScreen')}>
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <Icon 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>

            </View>
        </Animatable.View>
        
      </View>
    );
};

export default SplashScreen;

//const {height} = Dimensions.get("screen");
//const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  bgImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    height: '180%'
    
  },
  mainTitle:{
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textShadowColor: 'black', 
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10
  },
  footer: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.90)',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'center',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});