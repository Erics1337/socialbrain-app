import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
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
	useEffect(
		() =>
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
                <PostFooter likes={likes} likePost={likePost} currentUser={currentUser} />
                <Likes likes={likes} />
                <Caption post={caption} username={username} />
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
        <Text style={tw`font-semibold`}>...</Text>
    </View>
)


const PostImage = ({image}) => (
    <View style={tw`w-full h-110`}>
        <Image source={{ uri: image }} style={tw`h-full`} />
    </View>
)


const PostFooter = ({likePost, likes, currentUser}) => (
    <View style={tw`flex-row justify-between`}>
        <View style={tw`flex-row w-1/3 justify-between`}>
            <TouchableOpacity onPress={() => likePost()}>
                <Image style={tw`h-8 w-8`} source={{uri: likes.includes(currentUser.uid) ? 'https://img.icons8.com/nolan/64/filled-like.png' : 'https://img.icons8.com/nolan/64/like.png'}} />
            </TouchableOpacity>
            <Icon imgUrl={'https://img.icons8.com/nolan/64/topic.png'} />
            <Icon imgUrl={'https://img.icons8.com/nolan/64/sent.png'} altStyle={styles.shareIcon}/>
        </View>
        <View>
            <Icon imgUrl={'https://img.icons8.com/nolan/64/bookmark.png'} />
        </View>
    </View>
)


const Icon = ({imgUrl, altStyle}) => (
    <TouchableOpacity>
        <Image style={[tw`w-8 h-8`, altStyle]} source={{uri: imgUrl}} />
    </TouchableOpacity>
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


const styles = StyleSheet.create({
    shareIcon: {
        transform: [{ rotate: '320deg' }],
        marginTop: -1,
    }
})


export default Post