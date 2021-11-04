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
                            style={tw`w-10 h-10 ml-2 objectContain`} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={{uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'}} 
                            style={tw`w-10 h-10 ml-2 objectContain`} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={{uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png'}} 
                            style={tw`w-10 h-10 ml-2 objectContain`} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        // Need to give containers a row because by default everything is column-based
        flexDirection: 'row',
        marginHorizontal: 20
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    }
})

export default Header
