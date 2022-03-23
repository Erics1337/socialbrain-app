import React, { useState, useEffect, useContext } from "react"
import { auth, db } from "../firebase"
import { FlatList, Text, View, TouchableOpacity } from "react-native"
import UserContext from "../context/userContext"
import tw from "twrnc"
import SafeAreaView from "react-native-safe-area-view"
import { ChevronLeftIcon } from "react-native-heroicons/solid"
import {
	collection,
	orderBy,
	query,
	where,
	limit,
	getDocs,
	getDoc,
	doc,
	startAfter,
    startAt
} from "@firebase/firestore"
import Loader from "../components/Loader"
import Post from "../components/home/posts/Post"

function ProfilePostsScroll({ navigation, route }) {
	const uid = route.params.uid
	const username = route.params.username
	const startAtTimestamp = route.params.startAtTimestamp

	const { currentUser, currentGroup } =
		useContext(UserContext)
	const [posts, setPosts] = useState([])
	const [lastKey, setLastKey] = useState(null)
	const [hasMorePosts, setHasMorePosts] = useState(true)
	const [loading, setLoading] = useState(false)

	function handleLoadMore() {
		// if (!loading)
		fetchPosts(lastKey)
	}

	/* ------------------------ Fetch Posts w/ key and batchSize ----------------------- */
	const fetchPosts = async (key = null, batchSize = 2) => {
		try {
			setLoading(true)
			// Query to fetch first batch of posts
			let q = query(
				collection(db, "posts"),
				where("uid", "==", uid),
				orderBy("timestamp", "desc"),
				limit(batchSize),
                startAt(startAtTimestamp)
			)
			if (key) {
				console.log("fetching posts")
				// If key is passed, create query to fetch next batch of posts
				q = query(
					collection(db, "posts"),
					where("uid", "==", uid),
					orderBy("timestamp", "desc"),
					limit(batchSize),
					startAfter(key || new Date(253402300799999))
				)
			}
			const postsSnap = await getDocs(q)
			postsSnap.forEach((postDoc) => {
				getDoc(doc(db, "users", postDoc.data().uid))
					.then((userDoc) => {
						setPosts((prevPosts) => [
							...prevPosts,
							{
								id: postDoc.id,
								...postDoc.data(),
								user: userDoc.data(),
							},
						])
					})
					.catch((e) => console.log(e))
				setLastKey(postDoc.data().timestamp)
			})
			if (postsSnap.docs.length < batchSize) setHasMorePosts(false)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (!loading) setHasMorePosts(true)
		setPosts([])
		fetchPosts()
	}, [currentGroup])


    const ITEM_HEIGHT = 10
	return (
		<SafeAreaView>
			<ProfilePostsScrollNav
				navigation={navigation}
				username={username}
			/>
			<FlatList
            // First 2 props are to set screen position to where the image that was clicked is
            //   getItemLayout={(data, index) => (
            //     {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
            //   )}
            //     initialScrollIndex={index}
				keyExtractor={(item) => item.id}
				contentContainerSyle={tw`flex-1`}
				data={posts}
				renderItem={(post) => (
					<Post
                        uid={uid}
                        navigation={navigation}
						currentUser={currentUser}
						key={post.item.id}
						id={post.item.id}
						image={post.item.image}
						likes={post.item.likes}
						caption={post.item.caption}
						username={post.item.user.username}
						userImg={post.item.user.profilePic}
					/>
				)}
				ListFooterComponent={() => hasMorePosts && <Loader />}
				onEndReachedThreshold={0.2}
				onEndReached={handleLoadMore}
				refreshing={loading}
				onRefresh={() => {
					setPosts([])
					fetchPosts()
				}}
			/>
		</SafeAreaView>
	)
}

const ProfilePostsScrollNav = ({ navigation, username }) => {
	return (
		<View style={tw`flex-row justify-between mx-2`}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<ChevronLeftIcon style={tw`h-10 w-10 text-black`} />
			</TouchableOpacity>
			<Text style={tw`text-2xl text-gray-600`}>{username}</Text>
			<View></View>
		</View>
	)
}

export default ProfilePostsScroll
