import React, { useState, useEffect, useContext } from "react"
import Post from "./Post"
import { auth, db } from "../../../firebase"
import { FlatList, Text } from "react-native"
import UserContext from "../../../context/userContext"
import tw from "twrnc"
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
	startAfter,
} from "@firebase/firestore"
import Loader from "../../Loader"

function Posts({ navigation }) {
	const { currentUser, currentGroup, combineGroupsUsers } =
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
				where("uid", "in", [
					...combineGroupsUsers(currentGroup, currentUser),
					currentUser.uid,
				]),
				orderBy("timestamp", "desc"),
				limit(batchSize)
			)
			if (key) {
				console.log("fetching posts")
				// If key is passed, create query to fetch next batch of posts
				q = query(
					collection(db, "posts"),
					where("uid", "in", [
						...combineGroupsUsers(currentGroup, currentUser),
						currentUser.uid,
					]),
					orderBy("timestamp", "desc"),
					limit(batchSize),
					startAfter(key || new Date(253402300799999))
				)
			}
			const postsSnap = await getDocs(q)
			postsSnap.forEach((postDoc) => {
				getDoc(doc(db, "users", postDoc.data().uid))
					.then((userDoc) => {
						// if (cancel) return
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
		// let cancel = false
		if (!loading) setHasMorePosts(true)
		setPosts([])
		fetchPosts()

		// cleanup to prevent memory leaks
		// return () => (cancel = true)
	}, [currentGroup])

	return (
		<FlatList
			keyExtractor={(item) => item.id}
			contentContainerSyle={tw`flex-1`}
			data={posts}
			renderItem={(post) => (
				<Post
					uid={post.item.user.uid}
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
				setPosts([]);
				fetchPosts()
			}}
		/>
	)
}

export default Posts
