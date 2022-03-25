import React from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { Divider } from "react-native-elements/dist/divider/Divider"
import tw from "twrnc"
import moment from 'moment'


function ChatUser({ navigation, user }) {

	return (
		<TouchableOpacity
			onPress={()=> navigation.navigate("ChatUserScreen", { uid: user.uid, username: user.username, profilePic: user.profilePic })}>
			<Divider style={tw`bg-black`} width={1} orientation='vertical' />
			<View style={tw`flex-row justify-between px-3 py-2 text-sm bg-gray-200`}>
                <View style={tw`flex flex-row`}>
				<Image
					source={{ uri: user.profilePic }}
					style={tw`h-10 w-10 rounded-full p-[1.5px] border-red-500 border-2`}
				/>
					<Text style={tw`ml-3 font-semibold my-auto`}>
						{user.username}
					</Text>
				</View>
                <View style={tw`my-auto`}>
                    <Text>
                    {user.latestMessage.text?.substring(0, 20)}
                            {user.latestMessage.text?.length > 20 && '...'}                    
                    </Text>
                    <Text>
                        {user.latestMessage.timestamp ? moment(user.latestMessage.timestamp?.toDate(), "YYYYMMDD").fromNow() : ''}                    
                    </Text>
                </View>
			</View>
		</TouchableOpacity>
	)
}

export default ChatUser
