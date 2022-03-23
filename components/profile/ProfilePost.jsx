import React, { useState, useEffect, useContext } from "react"
import { View, Text, Image } from 'react-native'
import tw from 'twrnc'
import { db } from "../../firebase"
import {
	onSnapshot,
	collection,
	query,
	orderBy,
	getDoc,
	doc,
} from "@firebase/firestore"


function ProfilePost({ postData, userData }) {
	const [comments, setComments] = useState([])
	const [likes, setLikes] = useState([])

	const { postId, image } = postData
  	//  Get likes
	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, "posts", postId, "likes"),
			(snapshot) => setLikes(snapshot.docs)
		)
		return () => unsubscribe()
	}, [db])

	// Get comments and combine user data
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, "posts", postId, "comments"),
				orderBy("timestamp", "desc")
			),
			// set Profile Pic and username from userId for each comment
			(snapshot) =>
				snapshot.forEach((comment) => {
					getDoc(doc(db, "users", comment.data().uid)).then(
						(docSnap) => {
							setComments((prevComments) => [
								...prevComments,
								{
									id: comment.id,
									comment: comment.data().comment,
									timestamp: comment.data().timestamp,
									username: docSnap.data().username,
									userImg: docSnap.data().profilePic,
								},
							])
						}
					)
				})
		)
		return () => unsubscribe()
	}, [db])

  return (
    <View style={tw`w-1/3 h-35 p-px`}>
        <Image source={{ uri: image }} style={tw`h-full w-full`} />
    </View>
  )
}

export default ProfilePost