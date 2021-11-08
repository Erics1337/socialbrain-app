import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import tw from 'twrnc';

import AddNewPost from '../components/newPost/AddNewPost';

const NewPostScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={tw`bg-black flex-1`}>
            <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    )
}

export default NewPostScreen
