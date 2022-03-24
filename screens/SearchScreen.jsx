import React, { useState, useRef } from "react"
import tw from "twrnc"
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native"
import SafeAreaView from "react-native-safe-area-view"
import { collection, where, query, limit, getDocs, getDoc, doc } from "@firebase/firestore"
import { db } from "../firebase"
import SearchBar from "react-native-searchbar"

function SearchScreen({ navigation }) {
	const [searchResults, setSearchResults] = useState([])
	const [searchTerm, setSearchTerm] = useState("")

	const loadOptions = async (inputValue) => {
		const searchTerm = inputValue.toLowerCase()
		setSearchTerm(searchTerm)
		const strlength = searchTerm.length
		const strFrontCode = searchTerm.slice(0, strlength - 1)
		const strEndCode = searchTerm.slice(strlength - 1, searchTerm.length)
		// This mumbo jumbo allows dynamic searching in firebase
		const endCode =
			strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1)
		if (query.length > 0) {
			const snapshot = await getDocs(
				query(
					collection(db, "users"),
					where("username", ">=", searchTerm),
					where("username", "<=", endCode),
					limit(5)
				)
			)
			setSearchResults(snapshot.docs.map((doc) => doc.data()))
		}
	}

	const handleSubmitSearch = async () => {
		try {
			const snapshot = await getDocs(
				query(
					collection(db, "users"),
					where("username", "==", searchTerm),
					limit(1)
				)
			)
			snapshot.docs[0].data().uid != undefined &&
			navigation.navigate('ProfileScreen', {uid: snapshot.docs[0].data().uid})
		} catch {
			alert("User not found")
		}

	}

	return (
		<SafeAreaView style={tw`flex-1`}>
			<View style={tw`h-20`}>
				<SearchBar
					handleChangeText={(text) => loadOptions(text)}
					onBack={() => navigation.goBack()}
                    onSubmitEditing={() => handleSubmitSearch()}
					placeholder='Search'
					showOnLoad
				/>
			</View>
			<View style={tw`flex-1`}>
				{searchResults.map((user, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate('ProfileScreen', {uid: user.uid})}>
					    <UserCard user={user} />
                    </TouchableOpacity>
				))}
			</View>
		</SafeAreaView>
	)
}

const UserCard = ({ user }) => (
		<View style={tw`flex flex-row mx-3 text-black py-2`}>
			<Image source={{ uri: user.profilePic }} style={tw`h-full`} />
			<Image
				source={{ uri: user.profilePic }}
				style={tw`w-15 h-15 rounded-full border p-[2px]`}
			/>
			<Text style={tw`my-auto pl-2 font-semibold`}>{user.username}</Text>
		</View>
)

export default SearchScreen
