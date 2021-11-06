import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import tw from 'twrnc';

export const bottomTabIcons = [
    {
      name: 'Home',
      active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
      inactive:
        'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png',
    },
    {
      name: 'Search',
      active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
      inactive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png',
    },
    {
      name: 'Reels',
      active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
      inactive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png',
    },
    {
      name: 'Shop',
      active:
        'https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png',
      inactive:
        'https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png',
    },
    {
      name: 'Profile',
      active:
        'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
      inactive:
        'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
    },
  ]
  
  
  const BottomTabs = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('Home')
    
    const Icon = ({ icon }) => (

        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
          <Image source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
          // Array of styles
            style={[tw`w-10 h-10`,
            // Conditional style for borderRadius on profilePic
                    icon.name === 'Profile' ? tw`rounded-full` : null,
            // Conditional style for larger border
                    activeTab === 'Profile' && icon.name === activeTab ? tw`border-2 border-white` : null]}
                />
        </TouchableOpacity>
    )

    return (
      <View style={tw`w-full bottom-[1%] z-10 bg-black`}>
        <Divider width={1} orientation='vertical' />
          <View style={tw`flex-row justify-evenly pt-4`}>
                  {icons.map((icon, i) => (
                    <Icon key={i} icon={icon} />
                  ))}
          </View>
      </View>
    )
}

export default BottomTabs
