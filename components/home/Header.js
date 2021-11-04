import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import tw from 'twrnc';


const Header = () => {
    return (
        <View style={tw`flex-row justify-between mx-2`}>
            {/* TouchableOpacity makes it clickable */}
            <TouchableOpacity>
                <Image style={tw`w-30 h-10 objectContain`} source={require('../../assets/images/logo.png')} />
            </TouchableOpacity>

            <View style={tw`flex-row`}>
                <TouchableOpacity>
                    <Image source={{uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png'}} 
                            style={tw`w-8 h-8 ml-2 objectContain`} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={{uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'}} 
                            style={tw`w-8 h-8 ml-2 objectContain`} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={tw`absolute z-10 text-white text-base font-sans -top-0 -right-1 w-5 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse`}>
                        3
                    </View>
                    <Image source={{uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png'}} 
                            style={tw`w-8 h-8 ml-2 objectContain`} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header
