import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from '../components/PostCard';
import {Container,} from '../styles/FeedStyles';
import { useIsFocused } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const Posts = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/users/user-3.jpg'),
      postTime: '4 mins ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-3.jpg'),
      liked: true,
      likes: '14',
      comments: '5',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../assets/users/user-1.jpg'),
      postTime: '2 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '8',
      comments: '0',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../assets/users/user-4.jpg'),
      postTime: '1 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-2.jpg'),
      liked: true,
      likes: '1',
      comments: '0',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../assets/users/user-6.jpg'),
      postTime: '1 day ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-4.jpg'),
      liked: true,
      likes: '22',
      comments: '4',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../assets/users/user-7.jpg'),
      postTime: '2 days ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
  ];


const HomeScreen = ({navigation, route}) => {

  const [posts, setPosts] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  const fetchPosts = async (navigation) => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {userId,post,postImg,postTime,likes,comments,} = doc.data();
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

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

    return (
        <Container>
            <FlatList
                data={posts}
                renderItem={ ({item}) => (
                  <PostCard 
                  item={item}
                  // onPress={() => 
                  //   navigation.navigate('HomeScreen', {userId: item.userId})
                  // }
                  /> 
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
};

export default HomeScreen;