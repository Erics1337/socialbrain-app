import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSquarePlus, faMessage, faHeart } from '@fortawesome/free-regular-svg-icons'

const Navbar = ({ navigation }) => {
    return (
        <View style={tw`flex-row justify-between mx-2`}>
            <TouchableOpacity onPress={() => navigation.push('HomeScreen')} >
                <Image style={tw`w-60 h-11 my-1`} source={require('../../assets/logoText.png')} />
            </TouchableOpacity>

            <View style={tw`flex-row`}>
                <TouchableOpacity onPress={() => navigation.push('ActivityScreen')}>
                    <FontAwesomeIcon icon={faHeart} style={tw`w-7 h-7 ml-2 my-1`} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
                    <FontAwesomeIcon icon={faSquarePlus} style={tw`w-7 h-7 ml-2 my-1`} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.push('Messaging')}>
                <View style={tw`absolute z-10 text-white text-base font-sans -top-0 -right-1 w-5 h-4 bg-red-500 rounded-full flex items-center justify-center`}>
                        <Text>3</Text>
                    </View>
                    <FontAwesomeIcon icon={faMessage} style={tw`w-7 h-7 ml-2 my-1`} />
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

export default Navbar
