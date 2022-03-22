import React from "react"
import tw from 'twrnc'
import { db } from "../../firebase"
import { TouchableOpacity, Text } from "react-native"
import { collection, doc, arrayUnion, updateDoc } from "@firebase/firestore"

function FollowButton({ follower, followee }) {
	const followUser = async () => {
		console.log("following user", followee)
		await updateDoc(doc(collection(db, "users"), followee), {
			followers: arrayUnion(follower),
		})

		await updateDoc(doc(collection(db, "users"), follower), {
			"following.recognizable": arrayUnion(followee),
		})
		// currentUser following list state updated by live listener, just need to reload suggestions component to re-render which will fire a re-query
	}
	return (
		<TouchableOpacity onPress={() => followUser()}>
			<Text
				style={tw`bg-blue-500 px-2 py-1 
            text-white font-semibold text-sm rounded text-center`}>
				Follow
			</Text>
		</TouchableOpacity>
	)
}

export default FollowButton
