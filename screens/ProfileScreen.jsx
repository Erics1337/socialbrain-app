import React, {useEffect, useContext, useState} from 'react'
import Loader from '../components/Loader';
import UserContext from '../context/userContext';
import { Text, Image } from 'react-native';
import SafeAreaView from "react-native-safe-area-view"
import ProfileNavbar from '../components/profile/ProfileNavbar';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePost from '../components/profile/ProfilePost';
import { db, auth } from '../firebase';
import tw from "twrnc"
import {
	onSnapshot,
	query,
	collection,
	where,
	getDocs,
	doc,
	limit,
} from "@firebase/firestore"

function ProfileScreen({ navigation, route }) {
    const { currentUser, loginUser } = useContext(UserContext)
    const [userData, setUserData] = useState({})
    const [postsData, setPostsData] = useState([])
    const [loading, setLoading] = useState(true)

	const uid = route.params.uid

    useEffect(() => {
		setLoading(true)
		// Get user data and posts from userSlug
		const unsubscribe = onSnapshot(
			query(
				collection(db, "users"),
				where("uid", "==", uid),
				limit(1)
			),
			(userSnapshot) => {
				if (userSnapshot.empty) {
					console.log("No matching documents.")
				} else {
					// Set user data
					setUserData(userSnapshot.docs[0].data())
					// Get user posts
					getDocs(
						query(
							collection(db, "posts"),
							where("uid", "==", userSnapshot.docs[0].data().uid)
						)
					).then((postsSnap) => {
						setPostsData(postsSnap.docs.map((post) => post.data()))
					})
				}
			}
		)
		setLoading(false)
		return () => unsubscribe()
	}, [db])
	
	if (loading) return <Loader />
	if (!userData.uid) return <Text>User not found</Text>
  return (
		<SafeAreaView style={tw`flex-1`}>
			<ProfileNavbar navigation={navigation} username={userData.username} />
			<ProfileHeader currentUser={currentUser} userData={userData} postCount={postsData.length} />
			<ProfilePost />
		</SafeAreaView>
  )
}

export default ProfileScreen