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
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

import {
    Container,
    Card,
    UserInfo,
    UserImg,
    UserName,
    UserInfoText,
    PostTime,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divider,
} from '../styles/FeedStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';


const PostCard = ({ item, onPress }) => {
    const [userData, setUserData] = useState(null);

    var likeIcon = item.liked ? 'heart' : 'heart-outline';
    var likeIconColor = item.liked ? '#2e64e5' : '#333';
    var likeText='';
    var commentText='';

    if (item.likes == 1) {
        likeText = '1 Like';
    } else if (item.likes > 1) {
        likeText = item.likes + ' Likes';
    } else {
        likeText = 'Like';
    }

    if (item.comments == 1) {
        commentText = '1 Comment';
    } else if (item.comments > 1) {
        commentText = item.comments + ' Comments';
    } else {
        commentText = 'Comment';
    }

    //get user details
  const getUser = async() => {
    // console.log('start get user');
    // const userId = await getLoggedUser();
    // console.log('getLoggedUser ', userId);

    const subscriber = firestore()
    .collection('users')
    .onSnapshot(querySnapshot => {
      const customers = [];

      querySnapshot.forEach(documentSnapshot => {
        // console.log(documentSnapshot.data().userId);
        // console.log(userId);
        if(documentSnapshot.data().userId === item.userId) {
        //   console.log(documentSnapshot.data());
          setUserData(documentSnapshot.data());
          return;
        }
      });
    });
  }

  useEffect(() => {
    getUser();
  }, []);

    return (
        <Card>
            <UserInfo>
                <UserImg 
                    source={{
                        uri: userData
                          ? userData.userImg ||
                            'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                          : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                      }}
                />
                <UserInfoText>
                    {/* <TouchableOpacity 
                        onPress={ 
                            // onPress
                            console.log('click profile')
                        }
                    > */}
                        <UserName>
                            {userData ? userData.name || 'Test User' : 'Test User'}
                        </UserName>
                    {/* </TouchableOpacity> */}
                    
                    <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                </UserInfoText>
            </UserInfo>

            <PostText>{item.post}</PostText>
            {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />}


            <InteractionWrapper>
                <Interaction active={item.liked}>
                    <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                    <InteractionText active={item.liked}>{likeText}</InteractionText>
                </Interaction>
                <Interaction>
                    <Ionicons name="md-chatbubble-outline" size={25} />
                    <InteractionText>{commentText}</InteractionText>
                </Interaction>
            </InteractionWrapper>
        </Card>

    );
};

export default PostCard;