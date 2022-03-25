import React, { useState } from "react"

import { View, Text, TouchableOpacity } from "react-native"
import tw from "twrnc"
import { auth } from "../../firebase"
import moment from "moment"

function ChatMessages({ messages }) {
	return (
		<View style={tw`flex-1`}>
			{messages.map((message, i) => (
				<ChatBubble key={i} message={message} />
			))}
		</View>
	)
}

const ChatBubble = ({ message }) => {
	const amSender = message.to == auth.currentUser.uid
	const [showDate, setShowDate] = useState(false)
	const handleShowDate = () => setShowDate(!showDate)
	return (
		<View style={tw`px-2`}>
			<View
				style={tw`flex flex-row p-1 ${
					amSender ? "justify-start" : "justify-end"
				}`}>
				<TouchableOpacity
					onPress={() => setShowDate(!showDate)}
					style={tw`relative px-4 py-2 text-black rounded shadow 
                ${amSender ? "bg-gray-100" : "bg-gray-300"}`}>
					<Text style={tw``}>{message.text}</Text>
				</TouchableOpacity>
			</View>
			{showDate && (
				<View
					style={tw`flex flex-row ${
						amSender ? "justify-start" : "justify-end"
					}`}>
					<Text style={tw`pr-5 text-xs`}>
						{moment(
							message.timestamp.toDate(),
							"YYYYMMDD"
						).fromNow()}
					</Text>
				</View>
			)}
		</View>
	)
}

export default ChatMessages
