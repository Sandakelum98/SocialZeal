import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import FormButton from '../components/FormButton';
// import {AuthContext} from '../navigation/AuthProvider';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostCard from '../components/PostCard';

const ProfileScreen = ({navigation, route}) => {

  // const {user, logout} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchPosts = async () => {
    const userId = await getLoggedUser();
    //console.log(userId);
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .where('userId', "==", userId)
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {

          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              userId,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg:
              'https://firebasestorage.googleapis.com/v0/b/socialzeal-3f17b.appspot.com/o/photos%2Fuser-1.jpg?alt=media&token=87e4d328-06af-40e8-a035-67dd6359176a.jpg',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      //console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  //get user details
  const getUser = async() => {
    // console.log('start get user');
    const userId = await getLoggedUser();
    // console.log('getLoggedUser ', userId);

    const subscriber = firestore()
    .collection('users')
    .onSnapshot(querySnapshot => {
      const customers = [];

      querySnapshot.forEach(documentSnapshot => {
        console.log(documentSnapshot.data().userId);
        console.log(userId);
        if(documentSnapshot.data().userId === userId) {
          console.log(documentSnapshot.data());
          setUserData(documentSnapshot.data());
          return;
        }
      });
    });
  }

  useEffect(() => {
    console.log('useEffect working !');
    getUser();
    fetchPosts();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  const handleDelete = () => {};

  //GET USER FROM ASYNC STORAGE
  const getLoggedUser = async () => {
    try {
      return AsyncStorage.getItem('loggedUser');
    } catch (e) {
      console.log('Can not Get data from async ')
    }
  }

  //logout
  const logoutUser = async () => {
    auth()
    .signOut()
    .then(() => { 
      console.log('User signed out!');

       logout();
      // try {
      //   AsyncStorage.removeItem('loggedUser');
      //   console.log('deleted data from async');
      //   this.getLoggedUser().then(loggedUser=>{
      //     if(loggedUser != null) {
      //       alert('Not Logout !');
      //     } else {
      //       navigation.replace('SignInScreen');
      //     }
      //   });
      // } catch(e) {
      //   console.log('Can not delete data from async');
      // }

    });
  }

  //LOGOUT
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('loggedUser');
      console.log('deleted data from async');
      navigation.replace('SignInScreen');
    } catch(e) {
      console.log('Can not delete data from async');
    }
    //console.log('Done.');
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
          // source={require('../assets/users/user-8.jpg')}
        />
        <Text style={styles.userName}>{userData ? userData.name || 'Test User' : 'Test User'}</Text>
        {/* <Text style={styles.userName}>Jenny Deo</Text> */}

        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}

        <Text style={styles.aboutUser}>
        {userData ? userData.about || 'No details added.' : ''}
        {/* 1 new job in Kegalle District, Sabaragamuwa, Sri Lanka matches your preferences. */}
        </Text>

        <View style={styles.userBtnWrapper}>
          {/* {route.params ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Follow</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}>
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          )} */}

            <TouchableOpacity style={styles.userBtn} onPress={() => {
                // navigation.navigate('EditProfileScreen');
            }}>
                <Text style={styles.userBtnTxt}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtn} 
            onPress={() => { 
              console.log("logout workig");
              logoutUser();
            }}>
                <Text style={styles.userBtnTxt}>Logout</Text>
            </TouchableOpacity>

        </View>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            {/* <Text style={styles.userInfoTitle}>{posts.length}</Text> */}
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>

        {posts.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});