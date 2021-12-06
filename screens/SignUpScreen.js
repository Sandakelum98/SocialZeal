import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ActivityIndicator,
    ImageBackground,
    KeyboardAvoidingView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '623961699993-kmtg0vc22u5cqqf0vksvp0q3dl306d96.apps.googleusercontent.com',
  });

const SignUpScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        passwordRe: '',
        check_textInputChange: false,
        secureTextEntry: true,
        secureTextEntryRe: true,
        isValidUser: true,
        isValidPassword: true,
        isValidPasswordRe: true,
    });

    const { colors } = useTheme();

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const handlePasswordChangeRe = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                passwordRe: val,
                isValidPasswordRe: true
            });
        } else {
            setData({
                ...data,
                passwordRe: val,
                isValidPasswordRe: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const updateSecureTextEntryRe = () => {
        setData({
            ...data,
            secureTextEntryRe: !data.secureTextEntryRe
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    // EMAIL/PASSWORD SIGNIN
    const registerUser = () => {
        auth()
            .createUserWithEmailAndPassword(data.username, data.password)
            .then((user) => {
                console.log('User account created & signed in!');
                storeData(user.user.uid);
                navigation.replace('DashboardScreen');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert(
                        'Signup failed!',
                        'Email address is already in use',
                      );
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert(
                        'Signup failed!',
                        'Email address is invalid!',
                      );
                }

                if (error.code === 'auth/weak-password') {
                    Alert.alert(
                        'Signup failed!',
                        'Weak password!',
                      );
                }
                throw error;
                // console.error(error);
            });
    }

    // GOOGLE SIGNIN
    const onGoogleButtonPress = async () => {

        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        const user =  auth().signInWithCredential(googleCredential);

        storeData((await user).user.uid); 
        navigation.replace('CreateProfileScreen');     
    }

    //save user in async storage
    const storeData = (value) => {
        // const data = {
        //     "userId":"1",
        //     "user":"ssd",
        //     "email":"ssd@gmail.com"
        // }

        try {

            // const jsonValue = JSON.stringify(value);
            AsyncStorage.setItem('loggedUser', value);
            console.log('Save data in async storage');

        } catch (e) {
          alert('user not save in async storage !')
        }
    }

    return (
        <KeyboardAvoidingView 
        style={styles.container}
        // behavior="padding"
        >

            {/* <StatusBar backgroundColor='#009387' barStyle="light-content"/> */}

            <View style={styles.header}>
                <ImageBackground
                    source={require("../assets/geometric-design-7.jpg")}
                    style={styles.bgImg}
                >

                    <Animatable.Text
                        style={styles.mainTitle}
                        animation="slideInDown"
                        delay={200}
                    >
                        Create an account!
                    </Animatable.Text>

                </ImageBackground>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                delay={400}
                style={styles.footer}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Email</Text>

                <View style={styles.action}>

                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />

                </View>

                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 10
                }]}>Password</Text>

                <View style={styles.action}>

                    <TextInput
                        placeholder="Enter Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>




                {/* <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 10
                }]}>Password</Text>

                <View style={styles.action}>

                    <TextInput
                        placeholder="Re-enter Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntryRe ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChangeRe(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntryRe}
                    >
                        {data.secureTextEntryRe ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View> */}


                {/* <TouchableOpacity>
                    <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity> */}

                <View style={styles.button}>

                <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { 
                            // console.log(data.username, data.password, data.passwordRe) 
                            registerUser()
                            // navigation.navigate('DashboardScreen')
                        }}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity> 

                    <Text
                        style={{
                            marginBottom: 10,
                            textTransform: 'uppercase',
                            fontSize: 11,
                            fontWeight: 'bold',
                            color: 'rgba(0, 0, 0, 0.30)',
                            marginTop:20
                        }}
                    >
                        Or Continue with</Text>

                    <View style={styles.logoContainer}>
                        <TouchableOpacity
                            style={{
                                marginRight: 20
                            }}
                            onPress={() => { 
                                console.log('Google working') 
                                onGoogleButtonPress()
                            }}
                        >
                            <Animatable.Image
                                animation="slideInUp"
                                delay={900}
                                duraton="1500"
                                source={require('../assets/search.png')}
                                style={styles.logo}
                                resizeMode="stretch"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginRight: 20
                            }}
                            onPress={() => { console.log('Facebook working') }}
                            >
                            <Animatable.Image
                                animation="slideInUp"
                                delay={900}
                                duraton="1500"
                                source={require('../assets/facebook.png')}
                                style={styles.logo}
                                resizeMode="stretch"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { console.log('Twitter working') }}
                        >
                            <Animatable.Image
                                animation="slideInUp"
                                delay={900}
                                duraton="1500"
                                source={require('../assets/twitter.png')}
                                style={styles.logo}
                                resizeMode="stretch"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={()=>navigation.replace('SignInScreen')}
                        style={{
                            marginTop: 70,
                        }}
                    >
                        <Animatable.Text 
                        animation="slideInUp"
                        delay={900}
                        style={{
                            color: '#009387',
                            fontWeight:"normal"
                        }}>Have an account? Sign In
                        </Animatable.Text>
                    </TouchableOpacity>

                </View>

            </Animatable.View>
        </KeyboardAvoidingView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
    },
    footer: {
        flex: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.90)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        opacity: 0.1,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.10)',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        paddingRight: 5,
    },
    textInput: {
        flex: 1,
        color: '#666666',
        height: 40
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    bgImg: {
        flex: 1,
        justifyContent: "center",
        width: '100%',
        height: '350%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    mainTitle: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 10,
        // marginLeft: 20,
    },
    logo: {
        width: 40,
        height: 40,
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
    }
});