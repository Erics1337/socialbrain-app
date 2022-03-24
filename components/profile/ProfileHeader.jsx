import React, { useContext } from "react"
import tw from "twrnc"
import { View, Text, Image } from "react-native"
import UnfollowButton from "./UnfollowButton"
import FollowButton from "./FollowButton"
import DeleteButton from "./DeleteButton"
import EditableText from "./EditableText"

function ProfileHeader({ currentUser, userData, postCount }) {
	const { username, uid, profilePic } = userData

	return (
		<View style={tw`flex-row justify-around mx-2`}>
			<ProfilePicture profilePic={profilePic} username={username} />
			<View style={tw`flex m-3`}>
				<ActionButton
					currentUserUid={currentUser.uid}
					userDataUid={userData.uid}
					currentUser={currentUser}
				/>
				<UserStats
					postCount={postCount}
					followers={userData.followers}
					following={userData.following}
				/>
				<EditableTextArea
					currentUser={currentUser}
					userDataSubName={userData.subName}
					userDataBio={userData.bio}
					userDataUsername={userData.username}
				/>
			</View>
		</View>
	)
}

const ProfilePicture = ({ profilePic, username }) => (
	<View style={tw`flex m-3`}>
		<Image
			source={{ uri: profilePic }}
			style={tw`h-20 w-20 rounded-full p-[1.5px] border-red-500 border-2`}
		/>
		<Text style={tw`text-xl font-semibold w-15 text-center mx-auto`}>
			{username}
		</Text>
	</View>
)

const ActionButton = ({ currentUserUid, userDataUid, currentUser }) => {
	const userIsCurrentUser = () => currentUserUid === userDataUid
	const userIsLoggedIn = () => currentUserUid != undefined
	// Check if user whose page it is is being followed by currentUser in any of their groups
	const userIsFollowed = () => {
		if (currentUser.following == undefined) return
		return Object.values(currentUser?.following).some((a) =>
			a.includes(userDataUid)
		)
	}
	return (
		<View style={tw`p-1 mx-auto`}>
			{userIsLoggedIn() && !userIsCurrentUser() ? (
				!userIsFollowed() ? (
					<FollowButton
						follower={currentUserUid}
						followee={userDataUid}
					/>
				) : (
					<UnfollowButton
						follower={currentUserUid}
						followee={userDataUid}
					/>
				)
			) : (
				<DeleteButton currentUser={currentUser} />
			)}
		</View>
	)
}

const UserStats = ({ postCount, followers, following }) => {
	// Assign value to followers w/gaurd clause to prevent error if no followers
	const followersCount = followers.length ? followers.length : 0

	// Get number of following
	const followingCount = Object.values(following)
		.map((element) => element.length)
		.reduce((a, b) => a + b, 0)

	return (
		<View style={tw`flex-row m-auto`}>
			<View style={tw`p-2`}>
				<Text style={tw`mx-auto font-semibold`}>{postCount}</Text>
				<Text>post{postCount != 1 && "s"}</Text>
			</View>
			<View style={tw`p-2`}>
				<Text style={tw`mx-auto font-semibold`}>{followersCount}</Text>
				<Text>follower{followersCount != 1 && "s"}</Text>
			</View>
			<View style={tw`p-2`}>
				<Text style={tw`mx-auto font-semibold`}>{followingCount}</Text>
				<Text>following</Text>
			</View>
		</View>
	)
}

const EditableTextArea = ({
	currentUser,
	userDataSubName,
	userDataBio,
	userDataUsername,
}) => (
	<View>
		<View style={tw`p-1`}>
			<EditableText
				currentUser={currentUser}
				inputText={userDataSubName}
				type={"subName"}
				username={userDataUsername}
			/>
		</View>
		<View style={tw`p-1`}>
			<EditableText
				currentUser={currentUser}
				inputText={userDataBio}
				type={"bio"}
				username={userDataUsername}
			/>
		</View>
	</View>
)

export default ProfileHeader
