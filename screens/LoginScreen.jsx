import React from 'react'
import { View, Image, Text } from 'react-native'
import logo from '../assets/logo.png'
import tw from 'twrnc';
import LoginForm from '../components/forms/LoginForm';

const LoginScreen = ({ navigation }) => (
    <View style={tw`flex-1 bg-white pt-10 py-2`}>
        <View style={tw`items-center mt-20`}>
            <Image source={logo} style={tw`w-20 h-20`} />
        </View>
        <LoginForm navigation={navigation}/>
    </View>
)


export default LoginScreen
