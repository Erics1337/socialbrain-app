import React, { useState, useContext } from "react"
import { ScrollView, View, Text, TextInput, Button, Keyboard } from 'react-native';
import tw from 'twrnc';
import {
	addDoc,
	doc,
	setDoc,
	collection,
	serverTimestamp,
	updateDoc,
	increment
} from "firebase/firestore"
import { auth, db } from "../../firebase";

function ChatInput({uid}) {
    const [message, setMessage] = useState("")

	const uploadMessage = async () => {
		try{
            const docRef = await addDoc(
                collection(db, "users", auth.currentUser.uid, "messages"),
                {
                    to: uid,
                    from: auth.currentUser.uid,
                    text: message,
                    timestamp: serverTimestamp(),
                    seen: false,
                }
            )
            console.log("New doc added with ID", docRef.id)
        } catch(error){
            console.log("Error adding document: ", error)
        }

	}

	// handle submit message
	const handleSubmit = () => {
		message != '' && uploadMessage()
		setMessage('')
        Keyboard.dismiss()
	}
  return (
    <View style={tw`flex-row justify-between bg-white`}>
        <TextInput
            style={tw`p-3`}
            onChangeText={(text) => setMessage(text)}
            value={message}
            placeholder="Type a message"
            onSubmitEditing={handleSubmit}
        />
        <Button
            style={tw`rounded-md bg-blue-500 text-white p-2 w-10`}
            onPress={handleSubmit}
            title="Send"
            color="blue"
            accessibilityLabel="Send Message"
        />
    </View>
  )
}

export default ChatInput