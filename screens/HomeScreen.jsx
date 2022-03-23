import React, { useEffect, useState, useContext } from 'react'
import SafeAreaView from 'react-native-safe-area-view';

import Navbar from '../components/home/Navbar';
import Stories from '../components/home/Stories';
import Posts from '../components/home/posts/Posts';
import BottomTabs from '../components/home/BottomTabs';
import UserContext from '../context/userContext';
import Loader from '../components/Loader';
import tw from "twrnc"
import { auth } from "../firebase"
import GroupsTabs from '../components/GroupsTabs';



const HomeScreen = ({ navigation }) => {
    const {loginUser, loading} = useContext(UserContext);

    useEffect(() => {
		if (auth.currentUser) loginUser()
		// else navigation.push('LoginScreen')
    }, [])

	if (loading) return <Loader />
    return (
        <SafeAreaView style={tw`flex-1`}>
            <Navbar navigation={navigation} />
            <GroupsTabs />
            <Stories navigation={navigation}/>
            <Posts navigation={navigation}/>
            <BottomTabs navigation={navigation} />
        </SafeAreaView>
    )
}


export default HomeScreen
