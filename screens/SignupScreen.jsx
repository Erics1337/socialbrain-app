import React from 'react'
import { View, Image, Text } from 'react-native'
import logo from '../assets/logo.png'
import tw from 'twrnc';
import SignupForm from '../components/forms/SignupForm';

const LoginScreen = ({ navigation }) => (
    <View style={tw`flex-1 bg-white pt-10 py-2`}>
        <View style={tw`items-center mt-20`}>
            <Image source={logo} style={tw`w-20 h-20`} />
        </View>
        <SignupForm navigation={navigation}/>
    </View>
)


export default LoginScreen
