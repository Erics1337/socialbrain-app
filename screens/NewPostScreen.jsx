import React from 'react'
import { View, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

import tw from 'twrnc';

import AddNewPost from '../components/home/posts/newPost/AddNewPost';

const NewPostScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={tw`flex-1`}>
            <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    )
}

export default NewPostScreen
