import React, { useEffect, useState } from 'react' 
import { View, Text, ScrollView, Image, useColorScheme } from 'react-native'
import tw from 'twrnc'
import faker from 'faker'
import { USERS } from '../../data/users'


const Stories = () => {
    // const [USERS, setUsers] = useState([])

    // useEffect(() => {
    //     // Populates an array with 20 contextualCard objects
    //     const USERS = [...Array(20)].map((_, i) => ({
    //         ...faker.helpers.contextualCard(),
    //         id: i,
    //     }))

    //     setUsers(USERS)
    // },[])

    

    return (
        <View style={tw`mb-3`}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {USERS.map((story, index) => (
                    <View key={index} style={tw`px-1`}>
                        <Image source={{ uri: story.avatar }} style={tw`h-15 w-15 rounded-full p-[1.5px] border-red-500 border-2`} />
                        <Text style={tw`text-white text-xs w-15 text-center`}>
                            {!!story.username.length > 9 ? story.username.slice(0, 7).toLowerCase() + '...' 
                            :
                             story.username.toLowerCase()}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Stories
