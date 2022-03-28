import React, {useContext, useEffect} from 'react'
import { Text, ScrollView, View } from 'react-native'
import Loader from '../components/Loader'
import ScreenNav from '../components/ScreenNav'
import UserContext from '../context/userContext'
import tw from 'twrnc'
import { auth } from '../firebase'
import SafeAreaView from 'react-native-safe-area-view'
import BottomTabs from '../components/home/BottomTabs'
import GroupsTabs from '../components/GroupsTabs'
import Stories from '../components/home/Stories'


function GroupsScreen({navigation}) {
    const {loading, checkLoggedIn} = useContext(UserContext)

	// useEffect(() => {
	// 	if (auth.currentUser) checkLoggedIn()
	// }, [])

    if (loading) return <Loader />
  return (
        <SafeAreaView style={tw`flex-1`}>
            <ScreenNav navigation={navigation}>
                <Text style={tw`text-2xl text-gray-600`}>Groups</Text>
            </ScreenNav>
            <View style={tw`flex items-center mx-5`}>
                <Text style={tw`text-center py-2`}>Edit who belongs to which broadcast group</Text>
            </View>
            <ScrollView>
                <Text style={tw`mx-auto pt-3`} >Loved</Text>
                <Stories group={'loved'} navigation={navigation} />
                <Text style={tw`mx-auto pt-3`} >Family</Text>
                <Stories group={'family'} navigation={navigation} />
                <Text style={tw`mx-auto pt-3`} >Friends</Text>
                <Stories group={'friends'} navigation={navigation} />
                <Text style={tw`mx-auto pt-3`} >Connections</Text>
                <Stories group={'connections'} navigation={navigation} />
                <Text style={tw`mx-auto pt-3`} >Acquaintances</Text>
                <Stories group={'acquaintances'} navigation={navigation} />
                <Text style={tw`mx-auto pt-3`} >Recognizable</Text>
                <Stories group={'recognizable'} navigation={navigation} />
            </ScrollView>
            {/* <BottomTabs /> */}
        </SafeAreaView>
  )
}

export default GroupsScreen