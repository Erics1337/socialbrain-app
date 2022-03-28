import React, { useContext, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import UserContext from '../context/userContext'
import DropDownPicker from 'react-native-dropdown-picker'


function GroupsTabs() {
    const { groups, currentUser, setCurrentGroup, currentGroup, combineGroupsUsers } = useContext(UserContext)

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(currentGroup)
    const [items, setItems] = useState(
        [{label: 'All', value: 'all'}, ...Object.keys(groups).map(key => ({label: key.charAt(0).toUpperCase() + key.slice(1), value: key}))])
    
  
    return (
        <DropDownPicker
        style={tw`mx-auto`}
          itemKey={'value'}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onSelectItem={(value) => setCurrentGroup(value.value)}
        />
    )

}

export default GroupsTabs