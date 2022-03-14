import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import tw from 'twrnc';
import { auth, db } from '../../../firebase';
import { updateDoc, doc, getDocs, arrayUnion, arrayRemove, collection } from '@firebase/firestore';


const Post = ({ post, id, username, userImg, img, currentUser }) => {

    const handleLike = post => {
        // Search for the current user in the likes_by_users array and assign inverted truthy value to variable
        const currentLikeStatus = !post.likes.includes(
            auth.currentUser.uid
        )  // true or false

        console.log(currentLikeStatus)

        // Update likes array with current user's uid inversely on currentLikeStatus
        const postRef = doc(db, 'posts', post.id, 'posts', 'likes')
        updateDoc(postRef, {
            likes: currentLikeStatus ? arrayUnion(auth.currentUser.uid) : arrayRemove(auth.currentUser.uid),
        })
        // .then(() => console.log('Document successfully updated'))
        // .catch((error) => console.log('Error updating document: ', error))
    }

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
            <Divider style={tw`bg-white`} width={1} orientation='vertical' />
            <PostHeader username={username} userImg={userImg} />
            <PostImage img={img} />
            <View style={tw`mx-1 mt-1`}>
                <PostFooter likes={likes} handleLike={likePost}/>
                <Likes post={post} />
                <Caption post={post} />
                <CommentsSection post={post} />
                <Comments post={post} />
            </View>
        </View>
    )
}


const PostHeader = (username, userImg) => (
    <View style={tw`flex-row justify-between m-5`}>
        <View style={tw`flex-row items-center`}>
            <Image source={{ uri: userImg }} style={tw`h-8 w-8 rounded-full p-[1.5px] border-red-500 border-2`}/>
            <Text style={tw`text-white ml-3 font-semibold`}>{username}</Text>
        </View>
        <Text style={tw`text-white font-semibold`}>...</Text>
    </View>
)


const PostImage = ( img ) => (
    <View style={tw`w-full h-110`}>
        <Image source={{ uri: img }} style={tw`h-full`} />
    </View>
)


const PostFooter = (handleLike, likes) => (
    <View style={tw`flex-row justify-between`}>
        <View style={tw`flex-row w-1/3 justify-between`}>
            <TouchableOpacity onPress={() => handleLike(post)}>
                <Image style={tw`h-8 w-8`} source={{uri: likes.includes(auth.currentUser.email) ? 'https://img.icons8.com/nolan/64/filled-like.png' : 'https://img.icons8.com/nolan/64/like.png'}} />
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

const Likes = ({ post }) => (
    <View style={tw`flex-row mt-1 justify-between`}>
        <Text style={tw`text-white font-semibold`}>
            {post.likes_by_users.length} likes
        </Text>
    </View>
)

const Caption = ({ post }) => (
    <View style={tw`mt-1`}>
        <Text style={tw`text-white`}>
            <Text style={tw`font-bold`}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)


const CommentsSection = ({ post }) => (
    <View style={tw`mt-1`}>
        {/* using !! double negations will make output 'true' or 'false' instead of '1' or '0' to expose truthy value */}
        {!!post.comments.length && (
        <Text style={tw`text-gray-500`}>
            View
            {post.comments.length > 1 ? ` all ${post.comments.length} comments` : ' 1 comment'}
        </Text>
        )}
    </View>
)

const Comments = ({ post }) => (
    <>
        {post.comments.map((comment, i) => (
            <View key={i} style={tw`flex-row mt-1`}>
                <Text style={tw`text-white`}>
                    <Text style={tw`font-semibold`}>{comment.user}</Text>
                    {' '}{comment.comment}
                </Text>

            </View>
        ))}
    </>
)


const styles = StyleSheet.create({
    shareIcon: {
        transform: [{ rotate: '320deg' }],
        marginTop: -1,
    }
})


export default Post