import React from 'react'
import { View, Image, StyleSheet } from 'react-native';
import tw from "twrnc"


function Loader() {
    return (  
    <View style={tw`flex justify-center items-center h-screen`}>
            <Image
            style={tw`h-10 w-10`}
        source={require('../assets/Spinner.gif')}
      />
    </View>
    )
}

export default Loader;
