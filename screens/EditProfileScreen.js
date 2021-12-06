import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EditProfileScreen = () => {

    return (
        <View style={styles.container}>
            <Button
                title="Click Here"
                onPress = { () => alert*'Button Clicked!'}
            />
        </View>
    )

}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})