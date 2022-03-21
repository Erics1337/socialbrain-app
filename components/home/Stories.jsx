import React, { useEffect, useState, useContext } from 'react' 
import { View, Text, ScrollView, Image, useColorScheme } from 'react-native'
import tw from 'twrnc'
import { db } from '../../firebase';
import UserContext from '../../context/userContext';
import {
	onSnapshot,
	getDoc,
	doc,
	query,
	collection,
	where,
	updateDoc,
	arrayUnion,
} from "@firebase/firestore"


const Stories = () => {
    const [stories, setStories] = useState([])
	const {
		currentUser,
		currentGroup,
		combineGroupsUsers,
		groupNumber,
		setCurrentUser,
		usersInGroup,
	} = useContext(UserContext)

    	// Get user's following from all groups w/ snapshot
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, "users"),
				where("uid", "in", [
                    ...combineGroupsUsers(currentGroup, currentUser),
                    currentUser.uid,
                ]),
				where("uid", "!=", currentUser.uid)
			),
			(snapshot) => {
				setStories(snapshot.docs.map((user) => user.data()))
			}
		)
		return () => unsubscribe()
	}, [db])

    return (
        <View style={tw`my-3`}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {stories.map((story, index) => (
                    <View key={index} style={tw`px-1`}>
                        <Image source={{ uri: story.profilePic }} style={tw`h-15 w-15 rounded-full p-[1.5px] border-red-500 border-2`} />
                        <Text style={tw`text-xs w-15 text-center`}>
                            {!!story.username.length > 9 ? story.username.slice(0, 7).toLowerCase() + '...' 
                            :
                             story.username.toLowerCase()}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Stories
