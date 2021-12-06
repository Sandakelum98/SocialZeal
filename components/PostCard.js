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

    return (
        <Card>
            <UserInfo>
                <UserImg source={{uri: item.userImg}} />
                <UserInfoText>
                    {/* <TouchableOpacity 
                        onPress={ 
                            // onPress
                            console.log('click profile')
                        }
                    > */}
                        <UserName>{item.userName}</UserName>
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