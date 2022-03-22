import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import FormikPostUploader from './FormikPostUploader'
import { ChevronLeftIcon } from "react-native-heroicons/solid";

const AddNewPost = ({ navigation }) => (
    <View style={tw`mx-4`}>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation}/>
    </View>
)

    const Header = ({ navigation }) => (
    <View style={tw`flex-row items-center justify-between`}>
            <TouchableOpacity onPress={()=> navigation.goBack()} >
              <ChevronLeftIcon style={tw`h-10 w-10`} />
            </TouchableOpacity >
            <Text style={tw`font-semibold`}>Add New Post</Text>
    </View>
)



export default AddNewPost
