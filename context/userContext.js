import React from 'react'

import { createContext, useReducer } from "react"
import UserReducer, {
	setCurrentUser,
	setLoading,
	setModal,
	setGroup,
} from "./userReducer"
import { db, auth } from "../firebase"
import {
	getDoc,
	doc,
	onSnapshot,
	query,
	collection,
	where,
	limit,
} from "@firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"


const UserContext = createContext()
export const UserProvider = ({ children }) => {
	const groups = {
		loved: [],
		family: [],
		friends: [],
		connections: [],
		acquaintances: [],
		recognizable: [],
	}

	const initialState = {
		currentUser: {
			uid: "",
			username: "",
			profilePic: "",
			email: "",
			following: groups,
			followers: [],
		},
		currentGroup: "all",
		loading: true,
	}
	// const initialState = null
	const [state, dispatch] = useReducer(UserReducer, initialState)

	// const checkLoggedIn = () => {
	// 	const auth = getAuth()
	// 	onAuthStateChanged(auth, (user) => {
	// 		if (user) {
	// 			loginUser(auth)
	// 		} else {
	// 			dispatch(setCurrentUser(initialState))
	// 		}
	// 	})
	// }

	// On page load, queries db for user obj based on currentlyLoggedInUser and sets profilePic to state
	const loginUser = () => {
		if (!auth.currentUser) return
		dispatch(setLoading(true))
			onSnapshot(
				doc(
					collection(db, "users"), auth.currentUser.uid
				),
				(docSnap) => {
					if (!docSnap.exists || !docSnap.data() || !auth.currentUser) return
					dispatch(
						setCurrentUser({
							uid: auth.currentUser.uid,
							username: docSnap.data().username,
							profilePic: docSnap.data().profilePic,
							email: docSnap.data().email,
							following: docSnap.data().following,
							followers: docSnap.data().followers,
						})
					)

				}
			)
		dispatch(setLoading(false))
	}

	
	// Returns a list of all users in the current Group
	const combineGroupsUsers = (currentGroup, currentUser) => {
		switch (currentGroup) {
			case "all":
				return Object.values(currentUser.following).flat().length == 0 ? [""] 
				: Object.values(currentUser.following).flat()
			case "loved":
				return [
					...(currentUser.following.loved.length > 0
						? currentUser.following.loved
						: [""]),
				]
			case "acquaintances":
				return [
					...(currentUser.following.acquaintances.length > 0
						? currentUser.following.acquaintances
						: [""]),
				]
			case "connections":
				return [
					...(currentUser.following.connections.length > 0
						? currentUser.following.connections
						: [""]),
				]
			case "family":
				return [
					...(currentUser.following.family.length > 0
						? currentUser.following.family
						: [""]),
				]
			case "friends":
				return [
					...(currentUser.following.friends.length > 0
						? currentUser.following.friends
						: [""]),
				]
			case "recognizable":
				return [
					...(currentUser.following.recognizable.length > 0
						? currentUser.following.recognizable
						: [""]),
				]
			default:
				return [""]
		}
	}

	// Returns number of max users allowed in each group
	const groupNumber = (currentGroup) => {
		switch (currentGroup) {
			case "loved":
				return {inclusive: 7, exclusive: 7}
			case "family":
				return {inclusive: 15, exclusive: 8}
			case "friends":
				return {inclusive: 50, exclusive: 28}
			case "connections":
				return {inclusive: 150, exclusive: 78}
			case "acquaintances":
				return {inclusive: 500, exclusive: 278}
			case "recognizable":
				return {inclusive: 1500, exclusive: 778}
			case "all":
				return {inclusive: 1500, exclusive: 1500}
			default:
				return {inclusive: 0, exclusive: 0}
		}
	}


	// Returns the number of inclusive users in the current group
	const usersInGroup = (currentGroup) => {
		var inclusive = 0
		switch (currentGroup) {
			case "all":
				var num = Object.values(state.currentUser.following).flat().length
				return {inclusive: num, exclusive: num}
			case "recognizable":
				inclusive += state.currentUser.following.recognizable.length
			case "acquaintances":
				inclusive += state.currentUser.following.acquaintances.length 
			case "connections":
				inclusive += state.currentUser.following.connections.length
			case "friends":
				inclusive += state.currentUser.following.friends.length
			case "family":
				inclusive += state.currentUser.following.family.length 
			case "loved":
				inclusive += state.currentUser.following.loved.length 
			return {inclusive: inclusive, exclusive: state.currentUser.following[currentGroup].length}
			default:
				return 0
		}
	}

	// set currrentGroup
	const setCurrentGroup = (group) => {
		dispatch(setGroup(group))
	}

	return (
		<UserContext.Provider
			value={{
				...state,
				dispatch,
				loginUser,
				setCurrentGroup,
				combineGroupsUsers,
				groupNumber,
				setCurrentUser,
				usersInGroup
			}}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
