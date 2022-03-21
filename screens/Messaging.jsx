import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../components/home/Navbar';
import Loader from '../components/Loader';
import UserContext from "../context/userContext"
import tw from "twrnc"
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';

import { auth } from "../firebase"
import GroupsTabs from '../components/GroupsTabs';



function Messaging({ navigation }) {
	const { loading, loginUser, checkLoggedIn, currentUser, currentGroup, combineGroupUsers } = useContext(UserContext)

    useEffect(() => {
		if (!auth.currentUser) loginUser()
		// else navigation.push('LoginScreen')
    }, [])

	if (loading) return <Loader />
	return (
		<>
				<SafeAreaView className={tw`bg-grey-50`}>
					<View className={tw`mx-auto mb-8`}>
						<Text className={tw`text-2xl text-center text-grey-900`}>Messaging</Text>
                        <GroupsTabs />
					</View>
				</SafeAreaView>
		</>
	)
}

export default Messaging
