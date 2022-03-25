import React, {useState, useContext, useEffect} from 'react'
import { View, Text } from 'react-native'
import tw from 'twrnc'
import UserContext from '../../context/userContext'
import ChatContext from '../../context/chatContext'
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
	limit,
	get,
	getDocs,
	getDoc,
	doc,
} from "@firebase/firestore"
import { db } from '../../firebase';
import ChatUser from './ChatUser';


function RecentChats({navigation}) {
    const { currentUser, currentGroup, combineGroupsUsers } = useContext(UserContext)
	const { currentChat, setCurrentChat } = useContext(ChatContext)

	const [users, setUsers] = useState([])

	// Get all users who are in the currentUser's currentGroup
	// And get latest message from them if there is one
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, "users"),
				where("uid", "in", [
					...combineGroupsUsers(currentGroup, currentUser),
				])
			),
			(usersSnapshot) => {
				// Get messages
				setUsers([])
				usersSnapshot.docs.forEach((userSnap) => {
					getDocs(
						query(
							collection(db, "users", userSnap.data().uid, 'messages'),
							where("to", "==", currentUser.uid),
							orderBy("timestamp", "desc"),
							limit(1)
							)
							).then((message) => {
						setUsers((prevUsers) => [
							...prevUsers,
							{
								uid: userSnap.data().uid,
								profilePic: userSnap.data().profilePic,
								username: userSnap.data().username,
								latestMessage: {
									timestamp: message.size > 0 ? message.docs[0].data().timestamp : null,
									text: message.size > 0 ? message.docs[0].data().text : null,
								}
							},
						])
					})
				})
			}
		)
		return () => unsubscribe()
	}, [db, currentGroup])

  return (
      <View>
        <View style={tw`flex-row justify-between mx-3 py-2`}>
            <Text>Messages</Text>
            <Text style={tw`text-blue-500`}>2 requests</Text>
        </View>
        {users.map((user, i) => (
            <ChatUser key={i} navigation={navigation} user={user} />
        ))}
        </View>

  )
}

export default RecentChats