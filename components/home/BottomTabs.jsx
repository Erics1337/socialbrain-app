import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { Divider } from "react-native-elements/dist/divider/Divider"
import tw from "twrnc"
import { auth } from "../../firebase"
import {
	SearchIcon,
	UserGroupIcon,
	UserIcon,
	LogoutIcon,
} from "react-native-heroicons/outline"
import {
	SearchIcon as SearchIconSolid,
	UserGroupIcon as UserGroupIconSolid,
	UserIcon as UserIconSolid,
} from "react-native-heroicons/solid"

const BottomTabs = ({ navigation }) => {
	const [activeTab, setActiveTab] = useState("HomeScreen")

	const handleSignout = async () => {
		try {
			await auth.signOut()
			console.log("Signed Out Successfully")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={tw`w-full bottom-[1%] z-10 pt-4`}>
			<View style={tw`flex-row justify-evenly`}>
				<TouchableOpacity
					onPress={() => navigation.navigate("SearchScreen")}>
					<SearchIcon color='black' style={tw`w-7 h-7 ml-2 my-1`} />
				</TouchableOpacity>
				<Divider width={1} orientation='vertical' />
				<TouchableOpacity
					onPress={() => navigation.navigate("GroupsScreen")}>
					<UserGroupIcon
						color='black'
						style={tw`w-7 h-7 ml-2 my-1`}
					/>
				</TouchableOpacity>
				<Divider width={1} orientation='vertical' />
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("ProfileScreen", {
							uid: auth.currentUser.uid,
						})
					}>
					<UserIcon color='black' style={tw`w-7 h-7 ml-2 my-1`} />
				</TouchableOpacity>
				<Divider width={1} orientation='vertical' />
				<TouchableOpacity onPress={() => handleSignout()}>
					<LogoutIcon color='black' style={tw`w-7 h-7 ml-2 my-1`} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const IconTabs = (handleSignout) => {
	const handlePress = (linkTo) => {
		// setActiveTab(linkTo)
		navigation.navigate(linkTo, { uid: auth.currentUser.uid })
	}
	return (
		<View>
			{activeTab == "SearchScreen" ? (
				<SearchIconSolid color='black' style={tw`w-7 h-7 ml-2 my-1`} />
			) : (
				<TouchableOpacity onPress={() => handlePress("SearchScreen")}>
					<SearchIcon color='black' style={tw`w-7 h-7 ml-2 my-1`} />
				</TouchableOpacity>
			)}
			<Divider width={1} orientation='vertical' />
			{activeTab == "GroupsScreen" ? (
				<UserGroupIconSolid
					color='black'
					style={tw`w-7 h-7 ml-2 my-1`}
				/>
			) : (
				<TouchableOpacity onPress={() => handlePress("GroupsScreen")}>
					<UserGroupIcon
						color='black'
						style={tw`w-7 h-7 ml-2 my-1`}
					/>
				</TouchableOpacity>
			)}
			<Divider width={1} orientation='vertical' />
			{activeTab == "ProfileScreen" ? (
				<UserIconSolid color='black' style={tw`w-7 h-7 ml-2 my-1`} />
			) : (
				<TouchableOpacity onPress={() => handlePress("ProfileScreen")}>
					<UserIcon color='black' style={tw`w-7 h-7 ml-2 my-1`} />
				</TouchableOpacity>
			)}
			<Divider width={1} orientation='vertical' />
			<TouchableOpacity onPress={() => handleSignout()}>
				<LogoutIcon color='black' style={tw`w-7 h-7 ml-2 my-1`} />
			</TouchableOpacity>
		</View>
	)
}

export default BottomTabs
