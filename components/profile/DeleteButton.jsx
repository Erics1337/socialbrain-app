import React from "react"
import tw from 'twrnc'
import { auth } from "../../firebase"
import { TouchableOpacity, Text } from "react-native"

function DeleteButton() {
	const deleteUserAccount = () => {
		auth.currentUser
			.delete()
			.then(function () {
				console.log("User account deleted.")
			})
			.catch(function (error) {
				console.log("Error deleting user:", error)
			})
		Router.push("/")
	}

	return (
		<TouchableOpacity onPress={() => deleteUserAccount()}>
			<Text
				style={tw`bg-red-500 px-2 py-1 
        text-white font-semibold text-sm rounded text-center`}>
				Delete Account
			</Text>
		</TouchableOpacity>
	)
}

export default DeleteButton
