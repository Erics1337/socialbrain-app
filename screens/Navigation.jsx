import React from 'react'
import { createNativeStackNavigator  } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './HomeScreen'
import NewPostScreen from './NewPostScreen'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import Messaging from './Messaging'
import SearchScreen from './SearchScreen'
import ProfileScreen from './ProfileScreen'
import PostsScrollScreen from './PostsScrollScreen'

const Stack = createNativeStackNavigator()

const screenOptions = {
    headerShown: false
}

// Named Export
export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={screenOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="Messaging" component={Messaging} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="PostsScrollScreen" component={PostsScrollScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

// Named Export
export const SignedOutStack = () => (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='LoginScreen' screenOptions={screenOptions}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
</NavigationContainer>
)