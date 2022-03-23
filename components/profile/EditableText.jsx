import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useRef, useEffect, useContext } from "react"
import { db } from "../../firebase";
import tw from 'twrnc';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView } from 'react-native';

const EditableText = ({currentUser, inputText, type, username}) => {
	const [inputVisible, setInputVisible] = useState(false)
	const [text, setText] = useState(inputText)


	const editSubmit = () => {
        updateDoc(doc(db, 'users', currentUser.uid), {
            [type]: text
        })
		console.log('updated text', text);
		setInputVisible(false) // Disable text input
	}

	return (
		<View>
			{inputVisible ? (
					<TextInput
						autoCorrect={false}
						style={tw`border-2 rounded p-1 border-blue-500 ${
							type == "subName"
								? "text-gray-800 font-semibold"
								: "text-gray-600 w-full"
						}`}
						onSubmitEditing={() => editSubmit()}
						value={text} // Now input value uses local state
						onChangeText={(text) => {
							setText(text)
						}}
						onBlur={() => setInputVisible(false)}
						// onPressOut={() => Keyboard.dismiss()}
					/>
			) : (
				<Text
                style={tw`${
                    type == "subName"
                        ? "text-gray-800 font-semibold"
                        : "text-gray-600"
                }`}
                // Make input visible if profile belongs to logged in user
                onPress={() => currentUser.username == username && setInputVisible(true)}>
					{text}
				</Text>
			)}
		</View>
	)
}

export default EditableText // We got our component!
