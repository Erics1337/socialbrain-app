import React, { useState, useEffect, useContext } from 'react'
import Post from './Post';
import UserContext from "../../../context/userContext"
import { auth, db } from '../../../firebase'
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
	getDoc,
	doc
} from "@firebase/firestore"

function Posts() {
	const { currentUser, currentGroup, combineGroupsUsers } = useContext(UserContext)

	const [posts, setPosts] = useState([])
	
	// Here we need to get all the posts where username is in currentUser.following and
	// attach the associated post's username's profilePic to the post object
	useEffect(() => {
    if (!currentUser) return
			const unsubscribe = onSnapshot(
				query(
					collection(db, "posts"),
					where("uid", 'in', [...combineGroupsUsers(currentGroup, currentUser.uid), currentUser.uid]),
					orderBy("timestamp", "desc")
				),
				(postsSnapshot) => {
					setPosts([])
						postsSnapshot.docs.forEach((postSnap) => {
							getDoc(doc(db, "users", postSnap.data().uid))
							.then((userSnap) => {
								setPosts((prevPosts) => [
									...prevPosts,
									{
										id: postSnap.id,
										...postSnap.data(),
										username: userSnap.data().username,
										userImg: userSnap.data().profilePic,
									},
								])
							})
						})
				}
			)
			return () => unsubscribe()
	}, [db, currentGroup])



  return (
		<div>
			{posts.map((post) => (
				<Post
					currentUser={auth}
					key={post.id}
					id={post.id}
					username={post.username}
					userImg={post.userImg}
					image={post.image}
					caption={post.caption}
				/>
			))}
		</div>
  )
}

export default Posts