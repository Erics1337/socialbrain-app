import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import { auth } from '../../firebase';


const handleSignout = async () => {
    try {
        await auth.signOut()
        console.log('Signed Out Successfully')
    } catch (error){
        console.log(error)
    }
}


const Header = ({ navigation }) => {
    return (
        <View style={tw`flex-row justify-between mx-2`}>
            <TouchableOpacity onPress={handleSignout}>
                <Image style={tw`w-30 h-10`} source={require('../../assets/images/logo.png')} />
            </TouchableOpacity>

            <View style={tw`flex-row`}>
                <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
                    <Image source={{uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png'}} 
                            style={tw`w-8 h-8 ml-2`} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={{uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'}} 
                            style={tw`w-8 h-8 ml-2`} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={tw`absolute z-10 text-white text-base font-sans -top-0 -right-1 w-5 h-4 bg-red-500 rounded-full flex items-center justify-center`}>
                        <Text>3</Text>
                    </View>
                    <Image source={{uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png'}} 
                            style={tw`w-8 h-8 ml-2`} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header
