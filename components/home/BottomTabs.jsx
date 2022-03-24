import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import tw from 'twrnc';
import { auth } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faUserGroup, faSearch, faDoorClosed, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

  
const BottomTabs = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Home')

    const handleSignout = async () => {
      try {
          await auth.signOut()
          console.log('Signed Out Successfully')
      } catch (error){
          console.log(error)
      }
  }

  

    return (
      <View style={tw`w-full bottom-[1%] z-10`}>
        <Divider width={1} orientation='vertical' />
          <View style={tw`flex-row justify-evenly pt-4`}>
            <TouchableOpacity onPress={() => navigation.push('SearchScreen')}>
              <FontAwesomeIcon icon={ faSearch } style={tw`w-7 h-7 ml-2 my-1`} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('groups')}>
              <FontAwesomeIcon icon={ faUserGroup } style={tw`w-7 h-7 ml-2 my-1`} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', {uid: auth.currentUser.uid})}>
              <FontAwesomeIcon icon={ faUser } style={tw`w-7 h-7 ml-2 my-1`} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSignout()}>
              <FontAwesomeIcon icon={ faArrowRightFromBracket } style={tw`w-7 h-7 ml-2 my-1`} />
            </TouchableOpacity>
          </View>
      </View>
    )
}

export default BottomTabs
