import React, { useEffect, useState, useContext } from 'react'
import Loader from '../components/Loader';
import UserContext from "../context/userContext"
import tw from "twrnc"
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';

import { auth } from "../firebase"
import GroupsTabs from '../components/GroupsTabs';
import ChatNavbar from '../components/chat/ChatNavbar';
import Stories from '../components/home/Stories';
import RecentChats from '../components/chat/RecentChats';



function MessagingScreen({ navigation }) {
	const { loading, loginUser, checkLoggedIn, currentUser, currentGroup, combineGroupUsers } = useContext(UserContext)

    useEffect(() => {
		if (!auth.currentUser) loginUser()
		// else navigation.push('LoginScreen')
    }, [])

	if (loading) return <Loader />
	return (
			<SafeAreaView className={tw`flex-1`}>
				<ChatNavbar navigation={navigation} username={currentUser.username}/>
				<GroupsTabs />
				{/* <Stories navigation={navigation} linksTo={'ChatScreen'} /> */}
				<RecentChats navigation={navigation} />
			</SafeAreaView>
	)
}

export default MessagingScreen
