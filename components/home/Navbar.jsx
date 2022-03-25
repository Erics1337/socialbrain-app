import React, { useContext } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import tw from "twrnc"
import {
	ChatIcon,
	HeartIcon,
	PlusCircleIcon,
} from "react-native-heroicons/outline"
import ChatContext from "../../context/chatContext"

const Navbar = ({ navigation }) => {
	const { newMessageCount, getNewMessageCount, currentChat } =
		useContext(ChatContext)

	return (
		<View style={tw`flex-row justify-between mx-2 items-center`}>
			<TouchableOpacity onPress={() => navigation.push("HomeScreen")}>
				<Image
					style={tw`w-60 h-11 my-1`}
					source={require("../../assets/logoText.png")}
				/>
			</TouchableOpacity>

			<View style={tw`flex-row`}>
				<TouchableOpacity
					onPress={() => navigation.push("ActivityScreen")}>
					<HeartIcon color='black' style={tw`w-7 h-7 ml-2 my-1`} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.push("NewPostScreen")}>
					<PlusCircleIcon
						color='black'
						style={tw`w-7 h-7 ml-2 my-1`}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.push("MessagingScreen")}>
					{newMessageCount > 0 && (
						<View
							style={tw`absolute z-10 text-white text-base font-sans -top-0 -right-1 w-5 h-4 bg-red-500 rounded-full flex items-center justify-center`}>
							<Text>{newMessageCount}</Text>
						</View>
					)}
					<ChatIcon color='black' style={tw`w-7 h-7 ml-2 my-1`} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default Navbar
