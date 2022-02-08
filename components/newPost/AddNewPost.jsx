import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import FormikPostUploader from './FormikPostUploader';

const AddNewPost = ({ navigation }) => (
    <View style={tw`mx-4`}>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation}/>
    </View>
)

    const Header = ({ navigation }) => (
    <View style={tw`flex-row items-center justify-between`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={{uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png'}} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
            <Text style={tw`text-white font-semibold`}>Add New Post</Text>
            <Text></Text>
    </View>
)



export default AddNewPost
