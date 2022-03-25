import React from "react"
import {
	ChevronLeftIcon,
	DotsHorizontalIcon,
} from "react-native-heroicons/solid"
import { View, TouchableOpacity, Text, Image } from "react-native"
import tw from "twrnc"

function ChatHeader({ navigation, username, profilePic }) {
	return (
		<View style={tw`flex-row justify-between mx-2`}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<ChevronLeftIcon style={tw`h-10 w-10 text-black`} />
			</TouchableOpacity>
			<View style={tw`flex flex-row`}>
				<Image
					source={{ uri: profilePic }}
					style={tw`h-10 w-10 rounded-full p-[1.5px] border-red-500 border-2`}
				/>
				<Text style={tw`ml-3 font-semibold my-auto`}>
					{username}
				</Text>
			</View>
			<TouchableOpacity
				onPress={() => navigation.navigate("ProfileSettings")}>
				<DotsHorizontalIcon style={tw`h-10 w-10 text-black`} />
			</TouchableOpacity>
		</View>
	)
}

export default ChatHeader
