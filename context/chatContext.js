import React from 'react'

import { createContext, useReducer } from "react"
import ChatReducer from "./chatReducer"
import {
	onSnapshot,
	collection,
	where,
	query,
	collectionGroup,
	querySnapshot,
	getDocs,
	updateDoc
} from "@firebase/firestore"
import { db } from "../firebase"


const ChatContext = createContext()
export const ChatProvider = ({ children }) => {
	/* ----------------------------- Attend to this ----------------------------- */
	const router = { pathname: '/' }

	const initialState = {
		currentChat: null,
		newMessageCount: 0,
	}
	const [state, dispatch] = useReducer(ChatReducer, initialState)

	const setCurrentChat = (payload = null) => {
		dispatch({ type: "SET_CURRENT_CHAT", payload })
	}

	// Listens to any messages to currentUser that are unseen and updates the newMessageCount state
	const getNewMessageCount = (currentUser) => {
		if (!currentUser.following) return
		if (router.pathname === '/messaging' && state.currentChat) {
			console.log('getting new message count')
			// Get all unseen messages to currentUser
			const unsubscribe = onSnapshot(
				query(
					collectionGroup(db, "messages"),
					where("to", "==", currentUser.uid),
					where("seen", "==", false),
					where('from', '!=', state.currentChat.uid)
				),
				(querySnapshot) => {
						// If any of the unseen messages are from the currentChat user, don't count them, then clear them
						querySnapshot.docs.forEach((doc) => {
							console.log('In router.pathname === /messaging && state.currentChat', doc.data())
						}) 
						dispatch({
							type: "SET_NEW_MESSAGE_COUNT",
							payload: querySnapshot.docs.length,
						})	
					},
					clearMessageCountFromUser(currentUser)
					)
					// return unsubscribe
		}
		else {
			const unsubscribe = onSnapshot(
				query(
					collectionGroup(db, "messages"),
					where("to", "==", currentUser.uid),
					where("seen", "==", false)
				),
				(querySnapshot) => {
					// If chat user convo is not open, update newMessageCount with every unread message
					console.log('not current chat')
					dispatch({
						type: "SET_NEW_MESSAGE_COUNT",
						payload: querySnapshot.docs.length,
					})			
				}
			)
			// return unsubscribe
		}
	}

	// Sets all messages from chatUser to currentUser to seen
	const clearMessageCountFromUser = async (cancel, currentUser) => {
		if (cancel) return
		console.log('clear Message Count of Messages From Chat User');
		if (!state.currentChat) return
		const gotDocs = await getDocs(
			query(
				collectionGroup(db, "messages"),
				where("to", "==", currentUser.uid),
				where("from", "==", state.currentChat.uid),
				where("seen", "==", false)
			))
		gotDocs.docs.forEach((doc) => {
			updateDoc(doc.ref, { seen: true })
		})
		// getNewMessageCount(currentUser)
	}

	return (
		<ChatContext.Provider
			value={{
				...state,
				setCurrentChat,
				getNewMessageCount,
				clearMessageCountFromUser,
			}}>
			{children}
		</ChatContext.Provider>
	)
}

export default ChatContext
