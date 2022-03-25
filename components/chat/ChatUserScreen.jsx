import React, { useEffect, useContext, useState } from "react"
import { View, ScrollView, Text, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native"
import tw from "twrnc"
import SafeAreaView from "react-native-safe-area-view"
import UserContext from "../../context/userContext"
import ChatContext from "../../context/chatContext"
import { db, auth } from "../../firebase"
import { collection, onSnapshot, query, where } from "@firebase/firestore"
import ChatHeader from "./ChatHeader"
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"

function ChatUserScreen({ navigation, route }) {
	const { clearMessageCountFromUser } = useContext(ChatContext)
	const { currentUser, currentGroup } = useContext(UserContext)
	const [messages, setMessages] = useState([])

	const uid = route.params.uid
	const username = route.params.username
	const profilePic = route.params.profilePic

	// Get messages
	useEffect(() => {
    let cancel = false
		// Get currentUser's messages t user
		const unsubscribe = onSnapshot(
			query(
				collection(db, "users", auth.currentUser.uid, "messages"),
				where("to", "==", uid)
			),
			(userMessagesSnap) => {
				var userMessages = []
				userMessagesSnap.forEach((message) => {
					userMessages.push(message.data())
				})
				// Get other user's messages to user
				onSnapshot(
					query(
						collection(db, "users", uid, "messages"),
						where("to", "==", auth.currentUser.uid)
					),
					(otherUserMessagesSnap) => {
            if (cancel) return
						var otherUserMessages = []
						otherUserMessagesSnap.forEach((message) => {
							otherUserMessages.push(message.data())
						})
						// Combine messages from other user and user
						const combinedMessages = [
							...otherUserMessages,
							...userMessages,
						]
						// Sort messages by timestamp
						const sortedMessages = combinedMessages.sort((a, b) => {
							return a.timestamp - b.timestamp
						})
						setMessages(sortedMessages)
						clearMessageCountFromUser(cancel, currentUser)
					}
				)
			}
		)
		return () => {unsubscribe(); cancel = true}
	}, [db])

	return (
		<SafeAreaView style={tw`flex-1`}>
      <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={tw`flex-1`}>
          <ChatHeader
            navigation={navigation}
            username={username}
            profilePic={profilePic}
            />
            <ScrollView onPress={() => Keyboard.dismiss()}>
              <ChatMessages messages={messages} />
            </ScrollView>
          <ChatInput uid={uid} />
        </View>
      </KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default ChatUserScreen
