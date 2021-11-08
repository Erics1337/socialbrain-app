import { yupToFormErrors } from "formik"
import React, { useState } from "react"
import { Button, View, Text, Image, TextInput } from "react-native"
import tw from "twrnc"
import * as Yup from "yup"
import { Formik } from "formik"
import * as PLACEHOLDER_IMG from "../../assets/images/photo_camera.png"
import { Divider } from 'react-native-elements/dist/divider/Divider';

// Formik validation schema
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption is too long"),
})

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = React.useState(PLACEHOLDER_IMG)

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={values => {
        console.log(values)
        console.log('Your Post was submitted successfully')
        navigation.goBack()
      }
      }
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {/* Destructure Formik properties */}
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View style={tw`m-10 justify-between flex-row`}>
            <Image source={{ uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG }} style={tw`w-20 h-20 mr-5`}/>
              <View style={tw`flex-1`}>
              <TextInput
                  style={tw`text-white font-semibold`}
                  placeholderTextColor="gray"
                  placeholder="Write a caption..."
                  multiline={true}
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                  />
              </View>
            </View>
            <Divider width={0.2} orientation='vertical'/>
          <TextInput
            onChange={e => setThumbnailUrl(e.nativeEvent.text)}
            style={tw`text-white`}
            placeholderTextColor="gray"
            placeholder="Enter Image Url"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
            />
            {/* Formik Error Alerts */}
            {errors.imageUrl && (
              <Text style={tw`text-red-500 font-semibold`}>{errors.imageUrl}</Text>
            )}
            {/* Formik handles validation with isValid */}
            <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
        </>
      )}
    </Formik>
  )
}

export default FormikPostUploader
