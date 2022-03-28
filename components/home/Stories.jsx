import React, { useEffect, useState, useContext } from "react"
import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	StyleSheet,
} from "react-native"
import tw from "twrnc"
import { db } from "../../firebase"
import UserContext from "../../context/userContext"
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
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from "react-native-popup-menu"

const Stories = ({ group = null, navigation, linksTo='ProfileScreen' }) => {
	const [stories, setStories] = useState([])
	const {
		currentUser,
		currentGroup,
		combineGroupsUsers,
		groupNumber,
		setCurrentUser,
		usersInGroup,
	} = useContext(UserContext)
	const [menuOpened, setMenuOpened] = useState(false)

	// allows group to be passed in as a prop or not to use currentGroup
	if (!group) group = currentGroup


	// Switch user from one group to another
	const moveToGroup = async (uid, fromGroup, toGroup) => {
		// Guard against invalid input
		if (!uid || !fromGroup || !toGroup) return

		// Guard against max number of users in group already
		if (usersInGroup(toGroup).exclusive >= groupNumber(toGroup).exclusive)
			return
		// Guard against total users
		if (usersInGroup(toGroup).inclusive >= groupNumber(toGroup).inclusive)
			return

		// Create new following array
		var newFollowingArray = currentUser.following
		newFollowingArray[`${fromGroup}`] = currentUser.following[
			`${fromGroup}`
		].filter((item) => item !== uid)
		newFollowingArray[`${toGroup}`] =
			currentUser.following[`${toGroup}`].concat(uid)

		// Update user's following array
		await updateDoc(doc(db, `users/${currentUser.uid}`), {
			following: newFollowingArray,
		})
		// Update user's followers array in state
		setCurrentUser({ ...currentUser, following: newFollowingArray })
	}

	const navigateToProfile = (uid) => {
		navigation.navigate(linksTo, { uid: uid })
		setMenuOpened(false)
	}

		// Get user's following from all groups w/ snapshot
		useEffect(() => {
			const unsubscribe = onSnapshot(
				query(
					collection(db, "users"),
					where("uid", "in", [
						...combineGroupsUsers(group, currentUser),
						currentUser.uid,
					]),
					where("uid", "!=", currentUser.uid)
				),
				(snapshot) => {
					setStories(snapshot.docs.map((user) => user.data()))
				}
			)
			return () => unsubscribe()
		}, [db, currentGroup, stories])

		
	return (
		<View style={tw`flex-row m-3 bg-gray-200 p-3`}>
			<View style={tw`w-10`}>
				<Text>Group</Text>
				<Text>
					{usersInGroup(group).exclusive +
						"/" +
						groupNumber(group).exclusive}
				</Text>
			</View>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}>
				{stories.map((story, i) => (
					<TouchableOpacity
						key={i}
						onPress={() => setMenuOpened(!menuOpened)}>
						<View style={tw`px-1`}>
							<Image
								source={{ uri: story.profilePic }}
								style={tw`h-15 w-15 rounded-full p-[1.5px] border-red-500 border-2`}
							/>
							<Text style={tw`text-xs w-15 text-center`}>
								{!!story.username.length > 9
									? story.username.slice(0, 7).toLowerCase() +
									  "..."
									: story.username.toLowerCase()}
							</Text>
						</View>
						{/* Menu */}
						<Menu
							opened={menuOpened}
							onBackdropPress={() => setMenuOpened(!menuOpened)}>
							<MenuTrigger />
							<MenuOptions>
								<MenuOption
									onSelect={() =>
										navigateToProfile(story.uid)
									}>
									<Text style={{ color: "red" }}>
										Profile
									</Text>
								</MenuOption>
								<MenuOption
									onSelect={() => moveToGroup(story.uid, group, "loved")}
									text='Move to "loved"'
								/>
								<MenuOption
									onSelect={() => moveToGroup(story.uid, group, "family")}
									text='Move to "Family"'
								/>
								<MenuOption
									onSelect={() => moveToGroup(story.uid, group, "friends")}
									text='Move to "Friends"'
								/>
								<MenuOption
									onSelect={() => moveToGroup(story.uid, group, "connections")}
									text='Move to "Connections"'
								/>
								<MenuOption
									onSelect={() =>
										moveToGroup(story.uid, group, "acquaintances")
									}
									text='Move to "Acquaintances"'
								/>
								<MenuOption
									onSelect={() => moveToGroup(story.uid, group, "recognizable")}
									text='Move to "Recognizable"'
								/>
							</MenuOptions>

						</Menu>
					</TouchableOpacity>
				))}
			</ScrollView>
			<View style={tw`w-10`}>
				<Text>Total</Text>
				<Text>
					{usersInGroup(group).inclusive +
						"/" +
						groupNumber(group).inclusive}
				</Text>
			</View>
		</View>
	)
}

export default Stories
