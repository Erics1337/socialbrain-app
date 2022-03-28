import React from 'react'
import { ChevronLeftIcon, DotsHorizontalIcon } from "react-native-heroicons/solid"
import { View, TouchableOpacity, Text } from 'react-native';
import tw from "twrnc"

function ScreenNav({ navigation, children }) {
  return (
      <View style={tw`flex-row justify-between mx-2`}>
        <TouchableOpacity onPress={()=> navigation.goBack()} >
          <ChevronLeftIcon style={tw`h-10 w-10 text-black`} />
        </TouchableOpacity >
        {children}
        <TouchableOpacity onPress={()=> navigation.navigate('ProfileSettings')} >
          <DotsHorizontalIcon style={tw`h-10 w-10 text-black`} />
        </TouchableOpacity >
      </View>
  )
}

export default ScreenNav