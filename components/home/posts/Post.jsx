import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import tw from 'twrnc';
import { auth, db } from '../../../firebase';
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	getDoc,
	doc,
    setDoc,
    deleteDoc
} from "@firebase/firestore"
import { HeartIcon as HeartIconFilled } from "react-native-heroicons/solid";
import { 	
    BookmarkIcon,
	ChatIcon,
	DotsHorizontalIcon,
	EmojiHappyIcon,
	HeartIcon,
	PaperAirplaneIcon, } from "react-native-heroicons/outline";


const Post = ({ id, username, userImg, image, caption, currentUser }) => {

    // const handleLike = post => {
    //     // Search for the current user in the likes_by_users array and assign inverted truthy value to variable
    //     const currentLikeStatus = !post.likes.includes(
    //         auth.currentUser.uid
    //     )  // true or false

    //     console.log(currentLikeStatus)

    //     // Update likes array with current user's uid inversely on currentLikeStatus
    //     const postRef = doc(db, 'posts', post.id, 'posts', 'likes')
    //     updateDoc(postRef, {
    //         likes: currentLikeStatus ? arrayUnion(auth.currentUser.uid) : arrayRemove(auth.currentUser.uid),
    //     })
    //     // .then(() => console.log('Document successfully updated'))
    //     // .catch((error) => console.log('Error updating document: ', error))
    // }

	const [comment, setComment] = useState("")
	const [comments, setComments] = useState([])
	const [likes, setLikes] = useState([])
	const [hasLiked, setHasLiked] = useState(false)
	const [openComments, setOpenComments] = useState(false)

    	// Get comments and combine user data
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, "posts", id, "comments"),
				orderBy("timestamp", "desc")
			),
			// set Profile Pic and username from userId for each comment
			(snapshot) => {
				setComments([])
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
			}
		)
		return () => unsubscribe()
	}, [db, id])

	//  Get likes
	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, "posts", id, "likes"),
			(snapshot) => setLikes(snapshot.docs)
		)
		return () => unsubscribe()
	}, [db, id])

	//   Searches likes array in state if user is in there, and if not (findIndex returns -1) setHasLiked to false
	useEffect(() =>
			setHasLiked(
				likes.findIndex((like) => like.id === currentUser.uid) !== -1
			),
		[likes]
	)

	//   Toggles like
	const likePost = async () => {
		if (hasLiked) {
			await deleteDoc(doc(db, "posts", id, "likes", currentUser.uid))
		} else {
			await setDoc(doc(db, "posts", id, "likes", currentUser.uid), {
				uid: currentUser.uid,
			})
		}
	}

	//   Send comment to db
	const sendComment = async (e) => {
		// Disable default action of form submit to page refresh
		e.preventDefault()

		// Create copy of comment from local store and clear state for snappy action
		const commentToSend = comment
		setComment("")

		await addDoc(collection(db, "posts", id, "comments"), {
			comment: commentToSend,
			uid: currentUser.uid,
			timestamp: serverTimestamp(),
		})
	}
    
    return (
        <View style={tw`mb-5`}>
            <Divider style={tw`bg-black`} width={1} orientation='vertical' />
            <PostHeader username={username} userImg={userImg} />
            <PostImage image={image} />
            <View style={tw`mx-1 mt-1`}>
                <PostFooter hasLiked={hasLiked} likePost={likePost} openComments={openComments} setOpenComments={setOpenComments} />
                <Likes likes={likes} />
                <Caption caption={caption} username={username} />
                <CommentsSection comments={comments} />
                <Comments comments={comments} />
            </View>
        </View>
    )
}


const PostHeader = ({username, userImg}) => (
    <View style={tw`flex-row justify-between m-5`}>
        <View style={tw`flex-row items-center`}>
            <Image source={{ uri: userImg }} style={tw`h-8 w-8 rounded-full p-[1.5px] border-red-500 border-2`}/>
            <Text style={tw`ml-3 font-semibold`}>{username}</Text>
        </View>
        <DotsHorizontalIcon style={tw`h-5 text-black`} />
    </View>
)


const PostImage = ({image}) => (
    <View style={tw`w-full h-110`}>
        <Image source={{ uri: image }} style={tw`h-full`} />
    </View>
)


const PostFooter = ({likePost, hasLiked, openComments, setOpenComments}) => (
    <View style={tw`flex-row justify-between`}>
        <View style={tw`flex-row w-1/3 justify-between`}>
            <TouchableOpacity onPress={() => likePost()}>
                {hasLiked ? <HeartIconFilled style={tw`text-red-500`} /> : <HeartIcon style={tw`text-black`} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenComments(!openComments)}>
                <ChatIcon style={tw`text-black`} />
            </TouchableOpacity>
            <TouchableOpacity>
                <PaperAirplaneIcon style={tw`text-black`} />
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity>
                <BookmarkIcon style={tw`text-black`} />
            </TouchableOpacity>
        </View>
    </View>
)

const Likes = ({ likes }) => (
    <View style={tw`flex-row mt-1 justify-between`}>
        <Text style={tw`text-black font-semibold`}>
            {likes.length} likes
        </Text>
    </View>
)

const Caption = ({ caption, username }) => (
    <View style={tw`mt-1`}>
        <Text style={tw`text-black`}>
            <Text style={tw`font-bold`}>{username}</Text>
            <Text> {caption}</Text>
        </Text>
    </View>
)


const CommentsSection = ({ comments }) => (
    <View style={tw`mt-1`}>
        {/* using !! double negations will make output 'true' or 'false' instead of '1' or '0' to expose truthy value */}
        {!!comments.length && (
        <Text style={tw`text-gray-500`}>
            View
            {comments.length > 1 ? ` all ${comments.length} comments` : ' 1 comment'}
        </Text>
        )}
    </View>
)

const Comments = ({ comments }) => (
    <View>
        {comments.map((comment, i) => (
            <View key={i} style={tw`flex-row mt-1`}>
                <Text style={tw`text-black`}>
                    <Text style={tw`font-semibold`}>{comment.username}</Text>
                    {' '}{comment.comment}
                </Text>

            </View>
        ))}
    </View>
)


export default Post