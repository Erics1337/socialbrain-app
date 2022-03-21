import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import FormikPostUploader from './FormikPostUploader'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const AddNewPost = ({ navigation }) => (
    <View style={tw`mx-4`}>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation}/>
    </View>
)

    const Header = ({ navigation }) => (
    <View style={tw`flex-row items-center justify-between`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={ faAngleLeft } style={tw`w-7 h-7 ml-2 my-1`} />
        </TouchableOpacity>
            <Text style={tw`font-semibold`}>Add New Post</Text>
            <Text></Text>
    </View>
)



export default AddNewPost
