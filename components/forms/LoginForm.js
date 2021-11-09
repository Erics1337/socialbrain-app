import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native"
import tw from "twrnc"

import { Formik } from "formik"
import * as Yup from "yup"
import Validator from "email-validator"

const LoginForm = () => {
    
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Password must be at least 6 characters long"),
  })

  return (
    <View style={tw`mt-10 px-2`}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={values => console.log(values)}
            validationSchema={LoginFormSchema}
            validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
        }) => (
          <>
            <View style={[tw`border bg-gray-100 rounded-md p-4 mb-2`, values.email.length < 1 || Validator.validate(values.email) ? tw`border-current` : tw`border-red-500`]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number, username or email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            <View style={[tw`border bg-gray-100 rounded-md p-4 mb-2`, 1 > values.password.length || values.password.length >= 6 ? null : tw`border-red-500`]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                textContentType="password"
              />
            </View>

            <View style={tw`items-end mb-10`}>
              <Text style={tw`text-blue-400`}>Forgot password?</Text>
            </View>
            <Pressable
              titleSize={20}
              style={[tw`items-center justify-center rounded-md min-h-[12]`, isValid ? tw`bg-blue-500` : tw`bg-blue-100`]}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={tw`text-white font-semibold`}>Log In</Text>
            </Pressable>

            <View style={tw`flex-row w-100 justify-center mt-10`}>
              <Text style={tw`text-gray-600`}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={tw`text-blue-400`}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

export default LoginForm
