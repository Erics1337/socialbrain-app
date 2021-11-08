import React from "react"
import { View, Text, TextInput, Pressable, TouchableOpacity } from "react-native"
import tw from "twrnc"

const LoginForm = () => {
  return (
    <View style={tw`mt-10 px-2`}>
      <View style={tw`border bg-gray-100 rounded-md p-4 mb-2`}>
        <TextInput
          placeholderTextColor="#444"
          placeholder="Phone number, username or email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
        />
      </View>

      <View style={tw`border bg-gray-100 rounded-md p-4 mb-2`}>
        <TextInput
          placeholderTextColor="#444"
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="emailAddress"
        />
      </View>

      <View style={tw`items-end mb-10`}>
        <Text style={tw`text-blue-400`}>Forgot password?</Text>
      </View>
      <Pressable
        titleSize={20}
        style={tw`bg-blue-500 items-center justify-center rounded-md min-h-[12]`}
        onPress={() => console.log('You clicked me')}
      >
        <Text style={tw`text-white font-semibold`}>Log In</Text>
      </Pressable>

      <View style={tw`flex-row w-100 justify-center mt-10`}>
        <Text style={tw`text-gray-600`}>Don't have an account?{" "}</Text>
        <TouchableOpacity>
            <Text style={tw`text-blue-400`}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginForm
